#!/usr/bin/env python3
"""
Import CMS articles from ticket #145 into Payload CMS.
Converts Word documents to Lexical JSON format.
"""

import json
import zipfile
import xml.etree.ElementTree as ET
import urllib.request
import urllib.error

CMS_URL = 'http://localhost:3000/api'
TENANT_ID = 2  # freehome tenant
PILLAR_ID = 1  # How to Buy Real Estate Overseas

# Article definitions for ticket #145
ARTICLES = [
    {
        'file': 'location-comparison.docx',
        'title': 'Overseas Location Comparison Guide',
        'slug': 'overseas-location-comparison-guide',
        'meta_description': 'A comprehensive guide to comparing overseas locations for property investment, covering climate, lifestyle, infrastructure, and market factors.',
    },
    {
        'file': 'financing-options.docx',
        'title': 'International Property Financing Options',
        'slug': 'international-property-financing-options',
        'meta_description': 'Explore financing options for international property buyers, including local mortgages, cross-border lending, and currency considerations.',
    },
    {
        'file': 'step-by-step-process.docx',
        'title': 'Step-by-Step Overseas Property Buying Process',
        'slug': 'step-by-step-overseas-buying-process',
        'meta_description': 'A detailed step-by-step guide to the overseas property buying process, from initial research to closing the deal.',
    },
    {
        'file': 'foreign-ownership-rules.docx',
        'title': 'Foreign Ownership Rules by Country',
        'slug': 'foreign-ownership-rules-by-country',
        'meta_description': 'Understand foreign property ownership rules and restrictions in popular investment destinations around the world.',
    },
    {
        'file': 'foreign-real-estate-risks.docx',
        'title': 'Understanding Foreign Real Estate Risks',
        'slug': 'understanding-foreign-real-estate-risks',
        'meta_description': 'Learn about the key risks involved in foreign real estate investment and strategies to mitigate them.',
    },
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


def paragraphs_to_lexical(paragraphs):
    """Convert paragraphs to Lexical JSON format."""
    children = []
    i = 0

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

        # H2 headings - numbered sections or specific keywords
        is_h2 = (
            any(text.startswith(f"{n}. ") for n in range(1, 10)) or
            text in ["Executive Summary", "Key Points at a Glance", "Intro", "Intro Paragraph", "Introduction"] or
            text.startswith(("Understanding the Basics", "Detailed Guidance", "Supporting International",
                           "Understand the Basics", "The Key Tax", "Key Lifestyle", "Key Considerations",
                           "Understanding Overseas", "Common Factors", "Overview", "Conclusion")) or
            (len(text) < 90 and not text.endswith('.') and text[0].isupper() and
             not any(x in text.lower() for x in ['key ', 'what ', 'things ', 'factors ', 'mini-', 'market ',
                                                  'common ', 'how to ', 'why ', 'ideal ', 'considerations']))
        )

        if is_h2 and children:  # Don't make first para H2
            children.append({
                "type": "heading",
                "tag": "h2",
                "version": 1,
                "children": [{"type": "text", "text": text, "version": 1}],
                "direction": "ltr"
            })
            i += 1
            continue

        # H3 headings - Key X, What X, etc.
        is_h3 = (
            text.startswith(("Key ", "What ", "Things ", "Factors ", "Mini-Checklist", "Market Research",
                           "How to ", "Why ", "Benefits:", "Risks:", "Financing Options",
                           "Currency ", "Tax Planning Tips", "Property Taxes", "Ideal Locations",
                           "Considerations:", "Incorporating ", "Checklist", "Tips", "Example:",
                           "Important ", "Note:", "Warning:"))
            and len(text) < 100
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

        # Bullet list items - collect consecutive items
        if text.startswith(('• ', '- ', '– ', '— ')):
            list_items = []
            while i < len(paragraphs):
                t = paragraphs[i].strip()
                if t.startswith(('• ', '- ', '– ', '— ')):
                    item_text = t.lstrip('•-–— ').strip()
                    list_items.append({
                        "type": "listitem",
                        "version": 1,
                        "children": [{"type": "text", "text": item_text, "version": 1}]
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

        # Colon-prefixed items that look like definitions
        if ':' in text and text.index(':') < 35 and len(text) < 200:
            label, rest = text.split(':', 1)
            if rest.strip() and label[0].isupper() and len(label.split()) <= 4:
                children.append({
                    "type": "paragraph",
                    "version": 1,
                    "children": [
                        {"type": "text", "text": label + ": ", "format": 1, "version": 1},  # bold
                        {"type": "text", "text": rest.strip(), "version": 1}
                    ],
                    "direction": "ltr"
                })
                i += 1
                continue

        # Regular paragraph
        children.append({
            "type": "paragraph",
            "version": 1,
            "children": [{"type": "text", "text": text, "version": 1}],
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
    }


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


def create_post(token, article, content):
    """Create a new post."""
    post_data = {
        'tenant': TENANT_ID,
        'title': article['title'],
        'slug': article['slug'],
        'content': content,
        'meta': {
            'title': f"{article['title']} | FreeHome.world",
            'description': article['meta_description']
        },
        'publishedAt': '2026-02-01T12:00:00.000Z',
        '_status': 'published'
        # relatedPosts will be linked after creation
    }

    result = api_request('/posts', 'POST', post_data, token)

    if result:
        doc = result.get('doc', result)
        print(f"✓ Created: {article['title']} (ID: {doc.get('id')})")
        return doc.get('id')
    else:
        print(f"✗ Failed to create: {article['title']}")
        return None


def main():
    import os
    os.chdir('/Users/trucupei/Projects/freehome/flow/frontend-home')

    print("Logging in to CMS...")
    token = login()
    if not token:
        print("Failed to login!")
        return
    print("✓ Logged in\n")

    created_ids = []

    for article in ARTICLES:
        print(f"\nProcessing: {article['title']}")

        # Read and convert document
        try:
            paragraphs = docx_to_paragraphs(article['file'])
            content = paragraphs_to_lexical(paragraphs)
            print(f"  → {len(paragraphs)} paragraphs → {len(content['root']['children'])} Lexical nodes")
        except FileNotFoundError:
            print(f"  ✗ File not found: {article['file']}")
            continue
        except Exception as e:
            print(f"  ✗ Error processing file: {e}")
            continue

        # Create post in CMS
        post_id = create_post(token, article, content)
        if post_id:
            created_ids.append(post_id)

    print(f"\n{'='*60}")
    print(f"Created {len(created_ids)} new posts")

    # Link new posts to pillar article
    if created_ids:
        print("\nLinking new posts to pillar article...")

        for post_id in created_ids:
            result = api_request(f'/posts/{post_id}', 'PATCH', {
                'relatedPosts': [PILLAR_ID]
            }, token)
            if result:
                print(f"  ✓ Linked post {post_id} → pillar")

        # Update pillar article to link to all new posts
        print("\nUpdating pillar article with new related posts...")

        # Get current pillar article related posts
        pillar = api_request(f'/posts/{PILLAR_ID}?depth=0', token=token)
        if pillar:
            current_related = [p if isinstance(p, int) else p.get('id') for p in pillar.get('relatedPosts', [])]
            all_related = list(set(current_related + created_ids))

            result = api_request(f'/posts/{PILLAR_ID}', 'PATCH', {
                'relatedPosts': all_related
            }, token)

            if result:
                print(f"✓ Pillar article now links to {len(all_related)} related posts")

    print("\n✓ Done!")


if __name__ == '__main__':
    main()
