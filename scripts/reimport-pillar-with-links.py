#!/usr/bin/env python3
"""
Re-import the pillar article with proper internal links to supporting articles.
"""

import json
import zipfile
import xml.etree.ElementTree as ET
import urllib.request
import urllib.error
import re

CMS_URL = 'http://localhost:3000/api'
TENANT_ID = 2
PILLAR_ID = 1

# Map of article title patterns to their slugs
# Note: Use .?s to match any apostrophe variant (straight, curly, etc.)
LINK_MAP = [
    (r"Overseas Property Buyer.?s Guide", "/posts/overseas-property-buyers-guide"),
    (r"Understanding Foreign Real Estate Risks", "/posts/understanding-foreign-real-estate-risks"),
    (r"Foreign Ownership Rules by Country", "/posts/foreign-ownership-rules-by-country"),
    (r"Step[- ]?by[- ]?Step Overseas (Property )?Buying Process", "/posts/step-by-step-overseas-buying-process"),
    (r"Tax Planning for International Property Buyers", "/posts/tax-planning-international-property-buyers"),
    (r"International Property Financing Options", "/posts/international-property-financing-options"),
    (r"Overseas Location Comparison Guide", "/posts/overseas-location-comparison-guide"),
    (r"Lifestyle[- ]?Based Property Selection Guide", "/posts/lifestyle-based-property-selection-guide"),
    (r"Overseas Property Risk(?! Checklist)", "/posts/overseas-property-risk-checklist"),
    (r"Guided Overseas Property Buying Process", "/posts/guided-overseas-property-buying-process"),
    (r"Overseas Real Estate Value (Guide|Checklist)", "/posts/overseas-real-estate-value-guide"),
]


def docx_to_paragraphs(path):
    """Extract paragraphs from a Word document."""
    with zipfile.ZipFile(path) as z:
        xml_content = z.read('word/document.xml')
    tree = ET.fromstring(xml_content)

    paragraphs = []
    for para in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
        para_text = ''
        for t in para.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
            if t.text:
                para_text += t.text
        if para_text.strip():
            paragraphs.append(para_text.strip())

    return paragraphs


def find_link_url(text):
    """Find if text matches any known article title and return its URL."""
    for pattern, url in LINK_MAP:
        if re.search(pattern, text, re.IGNORECASE):
            return url
    return None


def text_to_children_with_links(text):
    """Convert text to Lexical children, converting link references to actual links."""
    # Simple pattern: find anything followed by (link...)
    link_pattern = r'([^(]+)\s*\(links?\s*(?:to\s+(?:other\s+)?article)?\)'

    children = []
    last_end = 0
    links_found = 0

    for match in re.finditer(link_pattern, text, re.IGNORECASE):
        captured = match.group(1).strip()

        # Try to find a known article title in the captured text
        found_title = None
        found_url = None
        for pattern, url in LINK_MAP:
            title_match = re.search(pattern, captured, re.IGNORECASE)
            if title_match:
                found_title = title_match.group(0)
                found_url = url
                break

        if found_url:
            # Find where the title starts in the captured text
            title_start = captured.lower().find(found_title.lower())
            intro_text = captured[:title_start] if title_start > 0 else ""

            # Add text before the entire match
            if match.start() > last_end:
                before_text = text[last_end:match.start()]
                if before_text:
                    children.append({"type": "text", "text": before_text, "version": 1})

            # Add intro text if present
            if intro_text:
                children.append({"type": "text", "text": intro_text, "version": 1})

            links_found += 1
            # Create a link node
            children.append({
                "type": "link",
                "version": 1,
                "url": found_url,
                "children": [{"type": "text", "text": found_title, "version": 1}],
                "direction": "ltr",
                "fields": {"url": found_url}
            })

            last_end = match.end()
        else:
            # No matching URL found - skip this match (it's not a known article)
            continue

    # Add remaining text
    if last_end < len(text):
        remaining = text[last_end:]
        if remaining:
            children.append({"type": "text", "text": remaining, "version": 1})

    # If no links found, return simple text
    if not children:
        children = [{"type": "text", "text": text, "version": 1}]

    return children, links_found


def paragraphs_to_lexical_with_links(paragraphs):
    """Convert paragraphs to Lexical JSON format with proper links."""
    children = []
    i = 0
    total_links = 0

    while i < len(paragraphs):
        text = paragraphs[i].strip()
        if not text:
            i += 1
            continue

        # Title (first paragraph with colon)
        if i == 0 and ':' in text and len(text) < 150:
            children.append({
                "type": "heading",
                "tag": "h1",
                "version": 1,
                "children": [{"type": "text", "text": text, "version": 1}],
                "direction": "ltr"
            })
            i += 1
            continue

        # H2 headings
        is_h2 = (
            any(text.startswith(f"{n}. ") for n in range(1, 10)) or
            text in ["Executive Summary", "Key Points at a Glance"] or
            text.startswith(("Understanding the Basics", "Detailed Guidance", "Supporting International",
                           "Various Needs", "The Complex", "The Legal", "The Taxes",
                           "Choose the Right", "Select the Type", "Prepare for", "Navigate the",
                           "Find Value", "A Structured", "Overseas Real Estate Value Checklist")) or
            (len(text) < 90 and not text.endswith('.') and text[0].isupper() and
             not any(x in text.lower() for x in ['key ', 'what ', 'things ', 'factors ', 'mini-', 'market ',
                                                  'common ', 'how to ', 'why ', 'ideal ', 'considerations',
                                                  'see ', 'learn ', 'for ', 'full ', 'more ']))
        )

        if is_h2 and children:
            children.append({
                "type": "heading",
                "tag": "h2",
                "version": 1,
                "children": [{"type": "text", "text": text, "version": 1}],
                "direction": "ltr"
            })
            i += 1
            continue

        # H3 headings
        is_h3 = (
            text.startswith(("Key ", "What ", "Things ", "Factors ", "Mini-Checklist", "Market Research",
                           "Benefits:", "Risks:", "Financing Options", "Currency ", "Tax Planning Tips",
                           "Property Taxes", "Ideal Locations", "Considerations:", "Incorporating ",
                           "Checklist", "Tips", "Common Risks", "How Do Pricing", "Why Negotiation",
                           "What Market", "How Do Incentives", "Why \"Value\"", "Pricing context",
                           "Time on market", "Negotiation levers", "Market inefficiencies",
                           "Legal and tax", "Incentives and benefits", "Long-term fit"))
            and len(text) < 120
        )

        if is_h3:
            children.append({
                "type": "heading",
                "tag": "h3",
                "version": 1,
                "children": [{"type": "text", "text": text, "version": 1}],
                "direction": "ltr"
            })
            i += 1
            continue

        # Bullet list items
        if text.startswith(('• ', '- ', '– ', '— ')):
            list_items = []
            while i < len(paragraphs):
                t = paragraphs[i].strip()
                if t.startswith(('• ', '- ', '– ', '— ')):
                    item_text = t.lstrip('•-–— ').strip()
                    item_children, links = text_to_children_with_links(item_text)
                    total_links += links
                    list_items.append({
                        "type": "listitem",
                        "version": 1,
                        "children": item_children
                    })
                    i += 1
                else:
                    break

            if list_items:
                children.append({
                    "type": "list",
                    "listType": "bullet",
                    "version": 1,
                    "children": list_items,
                    "direction": "ltr"
                })
            continue

        # Regular paragraph - check for links
        para_children, links = text_to_children_with_links(text)
        total_links += links
        children.append({
            "type": "paragraph",
            "version": 1,
            "children": para_children,
            "direction": "ltr"
        })
        i += 1

    return {
        "root": {
            "type": "root",
            "format": "",
            "indent": 0,
            "version": 1,
            "children": children,
            "direction": "ltr"
        }
    }, total_links


def api_request(path, method='GET', data=None, token=None):
    """Make an API request to the CMS."""
    url = f"{CMS_URL}{path}"
    headers = {'Content-Type': 'application/json'}
    if token:
        headers['Authorization'] = f'JWT {token}'

    req = urllib.request.Request(url, method=method, headers=headers)
    if data:
        req.data = json.dumps(data).encode('utf-8')

    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        print(f"HTTP Error {e.code}: {error_body}")
        return None


def login():
    """Login to CMS and get token."""
    result = api_request('/users/login', 'POST', {
        'email': 'wilgil3@gmail.com',
        'password': 'admin123'
    })
    return result.get('token') if result else None


def main():
    import os
    os.chdir('/Users/trucupei/Projects/freehome/flow/frontend-home')

    print("Processing pillar article with internal links...")

    # Read the document
    paragraphs = docx_to_paragraphs('pillar-article.docx')
    print(f"Read {len(paragraphs)} paragraphs")

    # Convert to Lexical with links
    content, links_count = paragraphs_to_lexical_with_links(paragraphs)
    print(f"Created {len(content['root']['children'])} Lexical nodes with {links_count} internal links")

    # Login
    print("\nLogging in to CMS...")
    token = login()
    if not token:
        print("Failed to login!")
        return
    print("✓ Logged in")

    # Update the pillar article
    print("\nUpdating pillar article...")
    result = api_request(f'/posts/{PILLAR_ID}', 'PATCH', {
        'content': content
    }, token)

    if result:
        print("✓ Pillar article updated with internal links!")
    else:
        print("✗ Failed to update pillar article")


if __name__ == '__main__':
    main()
