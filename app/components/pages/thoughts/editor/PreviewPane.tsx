"use client";

import React from 'react';
import MarkdownRenderer from '../MarkdownRenderer';

interface PreviewPaneProps {
    content: string;
    title: string;
    subtitle: string;
}

const PreviewPane: React.FC<PreviewPaneProps> = ({ content, title, subtitle }) => (
    <div className="min-h-[380px] p-6 bg-white">
        {title && (
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2 leading-tight">
                {title}
            </h1>
        )}
        {subtitle && <p className="text-base text-gray-600 font-semibold mb-6">{subtitle}</p>}

        {content.trim() ? (
            <MarkdownRenderer content={content} />
        ) : (
            <p className="text-sm text-gray-400 italic">Preview appears here as you type.</p>
        )}
    </div>
);

export default PreviewPane;
