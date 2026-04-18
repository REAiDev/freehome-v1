#!/usr/bin/env python3
"""
Update the 'How FreeHome Works' page with content from ticket #146.
"""

import json
import zipfile
import xml.etree.ElementTree as ET
import urllib.request
import urllib.error

CMS_URL = 'http://localhost:3000/api'
PAGE_ID = 1  # How FreeHome Works page


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
    """Convert paragraphs to Lexical JSON format for pages."""
    children = []
    i = 0

    while i < len(paragraphs):
        text = paragraphs[i].strip()
        if not text:
            i += 1
            continue

        # Main title (H1)
        if i == 0:
            children.append({
                "type": "heading",
                "tag": "h1",
                "version": 1,
                "children": [{"type": "text", "text": text, "version": 1}],
                "direction": "ltr"
            })
            i += 1
            continue

        # Subtitle (paragraph after main title)
        if i == 1 and text.startswith("Locate and buy"):
            children.append({
                "type": "paragraph",
                "version": 1,
                "children": [{"type": "text", "text": text, "format": 2, "version": 1}],  # italic
                "direction": "ltr"
            })
            i += 1
            continue

        # Step headers (H2) - numbered with emojis
        if text.startswith(('1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟')):
            children.append({
                "type": "heading",
                "tag": "h2",
                "version": 1,
                "children": [{"type": "text", "text": text, "version": 1}],
                "direction": "ltr"
            })
            i += 1
            continue

        # Section headers (H2)
        if text in ["Step-by-Step: How to Use FreeHome.world",
                    "Why FreeHome.world Is The Service for Your Overseas Home Needs"]:
            children.append({
                "type": "heading",
                "tag": "h2",
                "version": 1,
                "children": [{"type": "text", "text": text, "version": 1}],
                "direction": "ltr"
            })
            i += 1
            continue

        # Sub-section headers (H3)
        if text.startswith("🔹"):
            children.append({
                "type": "heading",
                "tag": "h3",
                "version": 1,
                "children": [{"type": "text", "text": text, "version": 1}],
                "direction": "ltr"
            })
            i += 1
            continue

        # Benefits list items (emoji bullets)
        if text.startswith(('🌍', '🧠', '🏡', '🤝')):
            # Collect consecutive emoji items
            list_items = []
            while i < len(paragraphs):
                t = paragraphs[i].strip()
                if t.startswith(('🌍', '🧠', '🏡', '🤝')):
                    list_items.append({
                        "type": "listitem",
                        "version": 1,
                        "children": [{"type": "text", "text": t, "version": 1}]
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

        # Short items that should be bullet points
        is_short_item = (
            len(text) < 60 and
            not text.endswith('.') and
            text[0].isupper() and
            i > 0 and
            any(paragraphs[i-1].strip().endswith(':') for _ in [1] if i > 0)
        )

        # Check if this starts a list of short items
        if is_short_item or (len(text) < 60 and text in [
            "Budget range", "Property type", "Number of bedrooms", "Property condition",
            "Ocean view, mountain view, countryside, or city living", "Lifestyle preferences",
            "Family structure", "Usage of the overseas home", "Google", "Microsoft",
            "X (Twitter)", "Or email and password"
        ]):
            # Collect consecutive short items
            list_items = []
            while i < len(paragraphs):
                t = paragraphs[i].strip()
                # Check if it's a short list item
                if (len(t) < 80 and
                    not t.endswith(':') and
                    not t.startswith(('1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🔹', '🌍', '🧠', '🏡', '🤝')) and
                    t not in ["Step-by-Step: How to Use FreeHome.world",
                              "Why FreeHome.world Is The Service for Your Overseas Home Needs"] and
                    (len(t) < 60 or t.startswith(('Modify', 'View', 'See', 'Explore', 'Dive', 'Proceed')))):
                    # Check if next paragraph continues the list pattern
                    list_items.append({
                        "type": "listitem",
                        "version": 1,
                        "children": [{"type": "text", "text": t, "version": 1}]
                    })
                    i += 1
                    # Stop if next item looks like a section header or paragraph
                    if i < len(paragraphs):
                        next_t = paragraphs[i].strip()
                        if (next_t.startswith(('1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🔹')) or
                            len(next_t) > 100 or
                            next_t.endswith(':') or
                            next_t in ["Step-by-Step: How to Use FreeHome.world",
                                      "Why FreeHome.world Is The Service for Your Overseas Home Needs"]):
                            break
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

        # Quoted text
        if text.startswith('"') and text.endswith('"'):
            children.append({
                "type": "paragraph",
                "version": 1,
                "children": [{"type": "text", "text": text, "format": 2, "version": 1}],  # italic
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


def main():
    import os
    os.chdir('/Users/trucupei/Projects/freehome/flow/frontend-home')

    print("Processing 'How FreeHome Works' page content...")

    # Read the document
    paragraphs = docx_to_paragraphs('how-freehome-works.docx')
    print(f"Read {len(paragraphs)} paragraphs")

    # Convert to Lexical
    content = paragraphs_to_lexical(paragraphs)
    print(f"Created {len(content['root']['children'])} Lexical nodes")

    # Login
    print("\nLogging in to CMS...")
    token = login()
    if not token:
        print("Failed to login!")
        return
    print("✓ Logged in")

    # Update the page - pages use 'layout' with content blocks, not 'content' directly
    print("\nUpdating 'How FreeHome Works' page...")

    # Structure: layout -> blocks -> columns -> richText
    layout = [
        {
            "blockType": "content",
            "columns": [
                {
                    "size": "full",
                    "richText": content
                }
            ]
        }
    ]

    result = api_request(f'/pages/{PAGE_ID}', 'PATCH', {
        'layout': layout
    }, token)

    if result:
        print("✓ Page updated successfully!")
        # Verify
        page = api_request(f'/pages/{PAGE_ID}?depth=0', token=token)
        if page:
            layout_blocks = page.get('layout', [])
            if layout_blocks:
                children = layout_blocks[0].get('columns', [{}])[0].get('richText', {}).get('root', {}).get('children', [])
                print(f"  Verified: {len(children)} content nodes in page")
    else:
        print("✗ Failed to update page")


if __name__ == '__main__':
    main()
