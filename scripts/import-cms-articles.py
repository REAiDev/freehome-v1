#!/usr/bin/env python3
"""
Import all CMS articles from ticket #144 docx files into Payload CMS.
Converts Word documents to Lexical JSON format.
"""

import json
import zipfile
import xml.etree.ElementTree as ET
import urllib.request
import urllib.error

CMS_URL = 'http://localhost:3000/api'
TENANT_ID = 2  # freehome tenant

# Article definitions
ARTICLES = [
    {
        'id': 1,  # existing
        'file': 'how-to-buy-real-estate-overseas.docx',
        'title': 'How to Buy Real Estate Overseas: A Complete Guide for International Buyers',
        'slug': 'how-to-buy-real-estate-overseas',
        'meta_description': 'Learn everything you need to know about buying property overseas. From legal requirements to financing options, this comprehensive guide covers the entire international real estate buying process.',
    },
    {
        'id': 2,  # existing
        'file': 'overseas-property-buyers-guide.docx',
        'title': "Overseas Property Buyer's Guide: Step-by-Step Process, Risks, and Best Practices",
        'slug': 'overseas-property-buyers-guide',
        'meta_description': 'A comprehensive step-by-step guide covering the entire overseas property buying process, from initial research to closing, including risks and best practices.',
    },
    {
        'file': 'tax-planning.docx',
        'title': 'Tax Planning for International Property Buyers',
        'slug': 'tax-planning-international-property-buyers',
        'meta_description': 'Understanding purchase taxes, ongoing ownership taxes, rental income taxation, capital gains tax, and reporting obligations for international property buyers.',
    },
    {
        'file': 'lifestyle-guide.docx',
        'title': 'Lifestyle-Based Property Selection Guide',
        'slug': 'lifestyle-based-property-selection-guide',
        'meta_description': 'How international buyers choose property that fits how they live - from remote work and digital nomad lifestyle to retirement properties.',
    },
    {
        'file': 'value-guide.docx',
        'title': 'Overseas Real Estate Value Guide',
        'slug': 'overseas-real-estate-value-guide',
        'meta_description': 'How international buyers identify, evaluate, and preserve value when purchasing property abroad.',
    },
    {
        'file': 'choose-country-location.docx',
        'title': 'How to Choose the Right Country and Location for Your Overseas Property Investment',
        'slug': 'choose-country-location-overseas-property',
        'meta_description': 'Key factors for selecting the ideal country and location for your international property investment, from market trends to legal restrictions.',
    },
    {
        'file': 'legal-steps.docx',
        'title': 'Legal Steps to Buy Property Abroad',
        'slug': 'legal-steps-buy-property-abroad',
        'meta_description': 'A comprehensive guide to the legal steps international buyers must follow when purchasing property overseas, from ownership laws to title verification.',
    },
    {
        'file': 'buying-process.docx',
        'title': 'Guided Overseas Property Buying Process',
        'slug': 'guided-overseas-property-buying-process',
        'meta_description': 'A step-by-step framework for international buyers navigating the overseas property purchase process from planning to closing.',
    },
    {
        'file': 'risk-checklist.docx',
        'title': 'Overseas Property Risk Checklist',
        'slug': 'overseas-property-risk-checklist',
        'meta_description': 'Key risks international buyers should evaluate before purchasing property abroad, including legal, market, and financial considerations.',
    },
    {
        'file': 'find-value.docx',
        'title': 'How International Buyers Can Find Value in Overseas Real Estate',
        'slug': 'find-value-overseas-real-estate',
        'meta_description': 'How to identify opportunities in fragmented markets, leverage negotiation tactics, and recognize inefficiencies when buying property abroad.',
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
            text in ["Executive Summary", "Key Points at a Glance", "Intro", "Intro Paragraph"] or
            text.startswith(("Understanding the Basics", "Detailed Guidance", "Supporting International",
                           "Understand the Basics", "The Key Tax", "Key Lifestyle", "Key Considerations",
                           "Understanding Overseas", "Common Factors")) or
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
                           "Considerations:", "Incorporating ", "Checklist", "Tips"))
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
            if rest.strip() and label[0].isupper():
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


def upsert_post(token, article, content):
    """Create or update a post."""
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
    }

    if article.get('id'):
        result = api_request(f"/posts/{article['id']}", 'PATCH', post_data, token)
        action = 'Updated'
    else:
        result = api_request('/posts', 'POST', post_data, token)
        action = 'Created'

    if result:
        doc = result.get('doc', result)
        print(f"✓ {action}: {article['title']} (ID: {doc.get('id')})")
        return doc.get('id')
    else:
        print(f"✗ Failed to {action.lower()}: {article['title']}")
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

    created_ids = {}

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

        # Upsert to CMS
        post_id = upsert_post(token, article, content)
        if post_id:
            created_ids[article['slug']] = post_id

    print(f"\n{'='*60}")
    print(f"Created/Updated {len(created_ids)} posts")
    print("Post IDs:", json.dumps(created_ids, indent=2))

    # Now link related posts
    print("\nLinking related posts...")
    pillar_id = created_ids.get('how-to-buy-real-estate-overseas')
    if pillar_id:
        # Link pillar to all supporting articles
        supporting_ids = [v for k, v in created_ids.items() if k != 'how-to-buy-real-estate-overseas']
        if supporting_ids:
            result = api_request(f"/posts/{pillar_id}", 'PATCH', {
                'relatedPosts': supporting_ids
            }, token)
            if result:
                print(f"✓ Linked pillar article to {len(supporting_ids)} supporting articles")

        # Link each supporting article back to pillar
        for slug, post_id in created_ids.items():
            if slug != 'how-to-buy-real-estate-overseas':
                result = api_request(f"/posts/{post_id}", 'PATCH', {
                    'relatedPosts': [pillar_id]
                }, token)
                if result:
                    print(f"✓ Linked {slug} → pillar article")

    print("\n✓ Done!")


if __name__ == '__main__':
    main()
