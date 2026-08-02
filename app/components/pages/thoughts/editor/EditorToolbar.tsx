"use client";

import React from 'react';

export type WrapAction =
    | { type: 'wrap'; before: string; after: string; placeholder: string }
    | { type: 'prefix'; prefix: string; placeholder: string };

interface EditorToolbarProps {
    onAction: (action: WrapAction) => void;
    onUploadClick: () => void;
    uploading: boolean;
}

const BUTTONS: { label: string; title: string; action: WrapAction; mono?: boolean }[] = [
    { label: 'B', title: 'Bold', action: { type: 'wrap', before: '**', after: '**', placeholder: 'bold text' } },
    { label: 'I', title: 'Italic', action: { type: 'wrap', before: '_', after: '_', placeholder: 'italic text' } },
    { label: 'H2', title: 'Heading', action: { type: 'prefix', prefix: '## ', placeholder: 'Heading' } },
    { label: 'H3', title: 'Subheading', action: { type: 'prefix', prefix: '### ', placeholder: 'Subheading' } },
    { label: 'Link', title: 'Link', action: { type: 'wrap', before: '[', after: '](https://)', placeholder: 'link text' } },
    { label: '<>', title: 'Inline code', action: { type: 'wrap', before: '`', after: '`', placeholder: 'code' }, mono: true },
    { label: '{ }', title: 'Code block', action: { type: 'wrap', before: '```\n', after: '\n```', placeholder: 'code' }, mono: true },
    { label: '"', title: 'Quote', action: { type: 'prefix', prefix: '> ', placeholder: 'quote' } },
    { label: 'List', title: 'Bullet list', action: { type: 'prefix', prefix: '- ', placeholder: 'item' } },
];

const EditorToolbar: React.FC<EditorToolbarProps> = ({ onAction, onUploadClick, uploading }) => (
    <div className="flex items-center gap-1 flex-wrap px-3 py-2 border-b border-gray-200 bg-gray-50/80 rounded-t-xl">
        {BUTTONS.map((btn) => (
            <button
                key={btn.title}
                type="button"
                title={btn.title}
                onClick={() => onAction(btn.action)}
                className={`px-2.5 py-1 text-xs font-bold text-gray-600 rounded-md hover:bg-white hover:text-green-800 hover:shadow-sm transition-all cursor-pointer ${btn.mono ? 'font-mono' : ''
                    }`}
            >
                {btn.label}
            </button>
        ))}

        <div className="w-px h-4 bg-gray-300 mx-1" />

        <button
            type="button"
            title="Upload image"
            onClick={onUploadClick}
            disabled={uploading}
            className="px-2.5 py-1 text-xs font-bold text-gray-600 rounded-md hover:bg-white hover:text-green-800 hover:shadow-sm transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
        >
            {uploading ? (
                <>
                    <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Uploading
                </>
            ) : (
                'Image'
            )}
        </button>
    </div>
);

export default EditorToolbar;
