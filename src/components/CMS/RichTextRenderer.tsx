'use client';

import React from 'react';
import Link from 'next/link';

interface LexicalNode {
  type: string;
  version?: number;
  children?: LexicalNode[];
  text?: string;
  format?: number | string;
  tag?: string;
  listType?: string;
  url?: string;
  newTab?: boolean;
  direction?: 'ltr' | 'rtl' | null;
  indent?: number;
  [key: string]: unknown;
}

interface SerializedEditorState {
  root: {
    type: string;
    children: LexicalNode[];
    direction?: 'ltr' | 'rtl' | null;
    format?: string;
    indent?: number;
    version?: number;
  };
}

interface RichTextRendererProps {
  data: SerializedEditorState | null | undefined;
  className?: string;
  skipFirstHeading?: boolean;
}

/**
 * Get text formatting classes based on format bitmask
 */
function getTextFormatClasses(format: number): string {
  const classes: string[] = [];
  if (format & 1) classes.push('font-bold');
  if (format & 2) classes.push('italic');
  if (format & 4) classes.push('line-through');
  if (format & 8) classes.push('underline');
  if (format & 16) classes.push('font-mono text-sm bg-gray-100 px-1 rounded');
  if (format & 32) classes.push('align-sub text-xs');
  if (format & 64) classes.push('align-super text-xs');
  return classes.join(' ');
}

/**
 * Render a single Lexical node to JSX
 */
function renderNode(node: LexicalNode, index: number): React.ReactNode {
  const key = `node-${index}-${node.type}`;

  switch (node.type) {
    case 'root':
      return (
        <React.Fragment key={key}>
          {node.children?.map((child, i) => renderNode(child, i))}
        </React.Fragment>
      );

    case 'paragraph':
      return (
        <p key={key} className="mb-4">
          {node.children?.map((child, i) => renderNode(child, i))}
        </p>
      );

    case 'heading': {
      const tag = node.tag || 'h2';
      const headingClasses: Record<string, string> = {
        h1: 'text-3xl font-bold mb-4 mt-6',
        h2: 'text-2xl font-bold mb-3 mt-5',
        h3: 'text-xl font-bold mb-2 mt-4',
        h4: 'text-lg font-bold mb-2 mt-3',
        h5: 'text-base font-bold mb-1 mt-2',
        h6: 'text-sm font-bold mb-1 mt-2',
      };
      const className = headingClasses[tag] || '';
      const children = node.children?.map((child, i) => renderNode(child, i));

      switch (tag) {
        case 'h1':
          return (
            <h1 key={key} className={className}>
              {children}
            </h1>
          );
        case 'h2':
          return (
            <h2 key={key} className={className}>
              {children}
            </h2>
          );
        case 'h3':
          return (
            <h3 key={key} className={className}>
              {children}
            </h3>
          );
        case 'h4':
          return (
            <h4 key={key} className={className}>
              {children}
            </h4>
          );
        case 'h5':
          return (
            <h5 key={key} className={className}>
              {children}
            </h5>
          );
        case 'h6':
          return (
            <h6 key={key} className={className}>
              {children}
            </h6>
          );
        default:
          return (
            <h2 key={key} className={className}>
              {children}
            </h2>
          );
      }
    }

    case 'text': {
      const formatClasses =
        typeof node.format === 'number' ? getTextFormatClasses(node.format) : '';
      if (formatClasses) {
        return (
          <span key={key} className={formatClasses}>
            {node.text}
          </span>
        );
      }
      return <React.Fragment key={key}>{node.text}</React.Fragment>;
    }

    case 'link': {
      const href = (node.fields as { url?: string })?.url || node.url || '#';
      const newTab = (node.fields as { newTab?: boolean })?.newTab || node.newTab;
      return (
        <Link
          key={key}
          href={href}
          className="text-primary hover:underline"
          target={newTab ? '_blank' : undefined}
          rel={newTab ? 'noopener noreferrer' : undefined}
        >
          {node.children?.map((child, i) => renderNode(child, i))}
        </Link>
      );
    }

    case 'autolink': {
      const href = node.url || '#';
      return (
        <a
          key={key}
          href={href}
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {node.children?.map((child, i) => renderNode(child, i))}
        </a>
      );
    }

    case 'list': {
      const ListTag = node.listType === 'number' ? 'ol' : 'ul';
      const listClasses =
        node.listType === 'number' ? 'list-decimal pl-6 mb-4' : 'list-disc pl-6 mb-4';
      return (
        <ListTag key={key} className={listClasses}>
          {node.children?.map((child, i) => renderNode(child, i))}
        </ListTag>
      );
    }

    case 'listitem':
      return (
        <li key={key} className="mb-1">
          {node.children?.map((child, i) => renderNode(child, i))}
        </li>
      );

    case 'quote':
      return (
        <blockquote key={key} className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
          {node.children?.map((child, i) => renderNode(child, i))}
        </blockquote>
      );

    case 'horizontalrule':
      return <hr key={key} className="my-6 border-gray-200" />;

    case 'linebreak':
      return <br key={key} />;

    case 'tab':
      return <span key={key} className="inline-block w-8" />;

    case 'upload': {
      const value = node.value as { url?: string; alt?: string } | undefined;
      if (value?.url) {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={key}
            src={value.url}
            alt={value.alt || ''}
            className="max-w-full h-auto rounded-lg my-4"
          />
        );
      }
      return null;
    }

    default:
      // For unknown node types, try to render children if they exist
      if (node.children?.length) {
        return (
          <React.Fragment key={key}>
            {node.children.map((child, i) => renderNode(child, i))}
          </React.Fragment>
        );
      }
      return null;
  }
}

/**
 * Client-side Rich Text renderer for Payload CMS Lexical content
 * Converts Lexical JSON to React JSX
 */
export function RichTextRenderer({ data, className, skipFirstHeading }: RichTextRendererProps) {
  if (!data?.root?.children) return null;

  let children = data.root.children;

  // Skip the first heading (h1) if requested - useful when page already has a title
  if (skipFirstHeading) {
    const firstHeadingIndex = children.findIndex(
      (node) => node.type === 'heading' && node.tag === 'h1'
    );
    if (firstHeadingIndex === 0) {
      children = children.slice(1);
    }
  }

  return (
    <div className={className || 'payload-richtext'}>
      {children.map((node, index) => renderNode(node, index))}
    </div>
  );
}
