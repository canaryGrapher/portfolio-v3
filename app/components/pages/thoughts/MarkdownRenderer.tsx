"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

/**
 * Sanitize runs BEFORE highlight, so the classes rehype-highlight adds are
 * never subject to sanitization. The extra allowances here are only for class
 * names an author writes by hand in raw HTML.
 *
 * Note the shape: a bare string allows the attribute, whereas a tuple like
 * ['className', 'foo'] restricts it to listed values. A tuple with no values
 * strips everything, which is easy to write by accident.
 */
const schema = {
    ...defaultSchema,
    attributes: {
        ...defaultSchema.attributes,
        code: [...(defaultSchema.attributes?.code || []), 'className'],
        span: [...(defaultSchema.attributes?.span || []), 'className'],
        img: [...(defaultSchema.attributes?.img || []), 'loading'],
    },
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => (
    <div className={`thoughts-prose ${className}`}>
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[[rehypeSanitize, schema], rehypeHighlight]}
            components={{
                a: ({ href, children, ...props }) => {
                    const external = typeof href === 'string' && /^https?:\/\//.test(href);
                    return (
                        <a
                            href={href}
                            target={external ? '_blank' : undefined}
                            rel={external ? 'noopener noreferrer' : undefined}
                            {...props}
                        >
                            {children}
                        </a>
                    );
                },
                // Plain img rather than next/image: sources are arbitrary URLs from
                // markdown, and next/image needs every host allow-listed up front.
                // eslint-disable-next-line @next/next/no-img-element
                img: ({ src, alt }) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={typeof src === 'string' ? src : ''} alt={alt || ''} loading="lazy" />
                ),
            }}
        >
            {content}
        </ReactMarkdown>
    </div>
);

export default MarkdownRenderer;
