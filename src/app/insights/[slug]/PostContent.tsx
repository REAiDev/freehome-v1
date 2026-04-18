'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { RichTextRenderer } from '@/components/CMS/RichTextRenderer';

interface Heading {
  id: string;
  title: string;
  level: number;
}

interface LexicalNode {
  type: string;
  tag?: string;
  children?: LexicalNode[];
  text?: string;
  format?: number | string;
  url?: string;
  newTab?: boolean;
  direction?: 'ltr' | 'rtl' | null;
  indent?: number;
  [key: string]: unknown;
}

interface LexicalContent {
  root: {
    type: string;
    children: LexicalNode[];
    direction?: 'ltr' | 'rtl' | null;
    format?: string;
    indent?: number;
    version?: number;
  };
}

interface PostContentProps {
  title: string;
  content: LexicalContent;
  headings: Heading[];
  lastUpdated?: string;
}

export function PostContent({ title, content, headings, lastUpdated }: PostContentProps) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Add IDs to headings in the rendered content
    headings.forEach(({ id }) => {
      const elements = document.querySelectorAll('h1, h2, h3, h4, strong');
      elements.forEach((el) => {
        const text = el.textContent || '';
        const slug = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .substring(0, 50);
        if (slug === id && !el.id) {
          el.id = id;
        }
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -35% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  // Filter to show only h2 headings in TOC, skip the first h1 since it's the title
  const filteredHeadings = headings.filter((h, index) => {
    if (index === 0 && h.level === 1) return false;
    return h.level <= 2;
  });
  const tocHeadings = filteredHeadings.slice(0, 15);

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-8 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          {/* Back link */}
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Insights
          </Link>

          {/* Centered Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-12 text-center">
            {title}
          </h1>

          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
            {/* Sticky Table of Contents - Desktop */}
            {tocHeadings.length > 0 && (
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24 bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100 shadow-sm">
                  <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
                    On This Page
                  </h2>
                  <nav className="space-y-1 max-h-[60vh] overflow-y-auto">
                    {tocHeadings.map(({ id, title: headingTitle }) => (
                      <button
                        key={id}
                        onClick={() => scrollToSection(id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          activeSection === id
                            ? 'bg-blue-600 text-white font-medium shadow-sm'
                            : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                      >
                        <span className="line-clamp-2">{headingTitle}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>
            )}

            {/* Mobile Dropdown TOC */}
            {tocHeadings.length > 0 && (
              <div className="lg:hidden mb-6">
                <select
                  value={activeSection}
                  onChange={(e) => scrollToSection(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl font-medium text-gray-700 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all"
                >
                  <option value="">Jump to section...</option>
                  {tocHeadings.map(({ id, title: headingTitle }) => (
                    <option key={id} value={id}>
                      {headingTitle}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {/* Last Updated Badge */}
              {lastUpdated && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-8 border border-blue-100">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Last updated: {formatDate(lastUpdated)}
                </div>
              )}

              {/* Rich Text Content */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
                <RichTextRenderer
                  data={content}
                  className="prose prose-lg max-w-none prose-headings:scroll-mt-24"
                  skipFirstHeading
                />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
