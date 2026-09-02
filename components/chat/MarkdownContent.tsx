'use client';

import React from 'react';

interface MarkdownContentProps {
  content: string;
}

interface ParsedBlock {
  type: 'paragraph' | 'h1' | 'h2' | 'h3' | 'ul' | 'ol' | 'code' | 'quote' | 'blank';
  items?: string[];
  text?: string;
  code?: string;
}

function renderInline(text: string): React.ReactNode {
  if (!text) return null;

  // Tokenize for inline code, bold, italic, and regular text
  const tokens: React.ReactNode[] = [];
  const inlineRegex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = inlineRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.substring(lastIndex, match.index));
    }

    const matchText = match[0];
    if (matchText.startsWith('`') && matchText.endsWith('`')) {
      tokens.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 rounded text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-emerald-700 dark:text-emerald-400 border border-zinc-200 dark:border-zinc-700"
        >
          {matchText.slice(1, -1)}
        </code>
      );
    } else if (matchText.startsWith('**') && matchText.endsWith('**')) {
      tokens.push(
        <strong key={match.index} className="font-semibold text-zinc-950 dark:text-zinc-50">
          {matchText.slice(2, -2)}
        </strong>
      );
    } else if (matchText.startsWith('*') && matchText.endsWith('*')) {
      tokens.push(
        <em key={match.index} className="italic text-zinc-800 dark:text-zinc-200">
          {matchText.slice(1, -1)}
        </em>
      );
    }

    lastIndex = inlineRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push(text.substring(lastIndex));
  }

  return <>{tokens}</>;
}

function parseMarkdownBlocks(content: string): ParsedBlock[] {
  const lines = content.split('\n');
  const blocks: ParsedBlock[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Code blocks ```
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        blocks.push({ type: 'code', code: codeBuffer.join('\n') });
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Unordered list (- or *)
    const ulMatch = line.match(/^(\s*)[-*]\s+(.+)$/);
    if (ulMatch) {
      const prevBlock = blocks[blocks.length - 1];
      if (prevBlock && prevBlock.type === 'ul' && prevBlock.items) {
        prevBlock.items.push(ulMatch[2]);
      } else {
        blocks.push({ type: 'ul', items: [ulMatch[2]] });
      }
      continue;
    }

    // Ordered list (1. 2.)
    const olMatch = line.match(/^(\s*)\d+\.\s+(.+)$/);
    if (olMatch) {
      const prevBlock = blocks[blocks.length - 1];
      if (prevBlock && prevBlock.type === 'ol' && prevBlock.items) {
        prevBlock.items.push(olMatch[2]);
      } else {
        blocks.push({ type: 'ol', items: [olMatch[2]] });
      }
      continue;
    }

    if (!trimmed) {
      blocks.push({ type: 'blank' });
      continue;
    }

    if (trimmed.startsWith('### ')) {
      blocks.push({ type: 'h3', text: trimmed.substring(4) });
      continue;
    }

    if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'h2', text: trimmed.substring(3) });
      continue;
    }

    if (trimmed.startsWith('# ')) {
      blocks.push({ type: 'h1', text: trimmed.substring(2) });
      continue;
    }

    if (trimmed.startsWith('> ')) {
      blocks.push({ type: 'quote', text: trimmed.substring(2) });
      continue;
    }

    blocks.push({ type: 'paragraph', text: line });
  }

  if (inCodeBlock && codeBuffer.length > 0) {
    blocks.push({ type: 'code', code: codeBuffer.join('\n') });
  }

  return blocks;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  if (!content) return null;

  const blocks = parseMarkdownBlocks(content);

  return (
    <div className="space-y-1.5">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'h1':
            return (
              <h2
                key={idx}
                className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50 mt-4 mb-2"
              >
                {renderInline(block.text || '')}
              </h2>
            );
          case 'h2':
            return (
              <h3
                key={idx}
                className="text-base font-bold text-zinc-900 dark:text-zinc-50 mt-4 mb-2 border-b border-zinc-200/60 dark:border-zinc-800 pb-1"
              >
                {renderInline(block.text || '')}
              </h3>
            );
          case 'h3':
            return (
              <h4
                key={idx}
                className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-3.5 mb-1.5"
              >
                {renderInline(block.text || '')}
              </h4>
            );
          case 'ul':
            return (
              <ul
                key={idx}
                className="my-2 space-y-1.5 pl-4 list-disc marker:text-emerald-500"
              >
                {block.items?.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200"
                  >
                    {renderInline(item)}
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol
                key={idx}
                className="my-2 space-y-1.5 pl-4 list-decimal marker:text-emerald-500 marker:font-semibold"
              >
                {block.items?.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200"
                  >
                    {renderInline(item)}
                  </li>
                ))}
              </ol>
            );
          case 'code':
            return (
              <div
                key={idx}
                className="my-3 rounded-lg overflow-x-auto bg-zinc-900 border border-zinc-800 p-3.5 text-zinc-100 font-mono text-xs leading-relaxed"
              >
                <pre>{block.code}</pre>
              </div>
            );
          case 'quote':
            return (
              <div
                key={idx}
                className="my-2 pl-3 py-1 border-l-2 border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 text-xs italic text-zinc-700 dark:text-zinc-300 rounded-r-md"
              >
                {renderInline(block.text || '')}
              </div>
            );
          case 'blank':
            return <div key={idx} className="h-1.5" />;
          case 'paragraph':
          default:
            return (
              <p
                key={idx}
                className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200"
              >
                {renderInline(block.text || '')}
              </p>
            );
        }
      })}
    </div>
  );
}
