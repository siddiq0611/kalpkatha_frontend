// src/components/ChapterRenderer.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import 'github-markdown-css';

function ChapterRenderer({ chapterText }: { chapterText: string }) {
  const cleanText = chapterText
    // Join split bolds across lines: "**1. **\nEli**" → "**1. Eli**"
    .replace(/\*\*\s*\n\s*(.*?)\*\*/g, '**$1**')
    // Ensure bold lines have spacing around them
    .replace(/(?<!\n)\*\*(.*?)\*\*(?!\n)/g, '\n\n**$1**\n\n')
    // Add extra spacing between chapters (if marked with e.g. "Chapter N")
    .replace(/(?:\n)*Chapter\s+(\d+[:：].*)/gi, '\n\n---\n\n## Chapter $1\n\n');

  return (
    <div className="bg-dark-200 px-4 py-2 prose dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          strong: ({ children }) => (
            <strong className="text-lg font-semibold">{children}</strong>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
          ),
          p: ({ children }) => <p className="text-base leading-relaxed">{children}</p>,
        }}
      />
    </div>
  );
}

export default ChapterRenderer;
