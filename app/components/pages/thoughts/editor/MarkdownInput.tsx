"use client";

import React, { forwardRef } from 'react';

interface MarkdownInputProps {
    value: string;
    onChange: (value: string) => void;
    onPasteFiles: (files: File[]) => void;
    onSave: () => void;
    onPublish: () => void;
}

/**
 * The textarea. Kept dumb on purpose: selection maths and upload orchestration
 * live in EditorShell so this stays a controlled input.
 */
const MarkdownInput = forwardRef<HTMLTextAreaElement, MarkdownInputProps>(
    ({ value, onChange, onPasteFiles, onSave, onPublish }, ref) => {
        const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            const mod = e.metaKey || e.ctrlKey;

            if (mod && e.key === 's') {
                e.preventDefault();
                onSave();
                return;
            }
            if (mod && e.key === 'Enter') {
                e.preventDefault();
                onPublish();
                return;
            }

            // Tab inserts two spaces rather than moving focus out of the editor.
            if (e.key === 'Tab') {
                e.preventDefault();
                const target = e.currentTarget;
                const { selectionStart: start, selectionEnd: end } = target;
                const next = `${value.slice(0, start)}  ${value.slice(end)}`;
                onChange(next);
                requestAnimationFrame(() => {
                    target.selectionStart = target.selectionEnd = start + 2;
                });
            }
        };

        const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
            const files = Array.from(e.clipboardData.files).filter((f) => f.type.startsWith('image/'));
            if (files.length > 0) {
                e.preventDefault();
                onPasteFiles(files);
            }
        };

        const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
            const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
            if (files.length > 0) {
                e.preventDefault();
                onPasteFiles(files);
            }
        };

        return (
            <textarea
                ref={ref}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                onDrop={handleDrop}
                spellCheck
                placeholder={'Write in markdown.\n\nDrag or paste an image anywhere to upload it.'}
                className="w-full h-full min-h-[380px] p-5 font-mono text-sm leading-relaxed text-gray-800 bg-white resize-none focus:outline-none overflow-y-auto"
            />
        );
    }
);

MarkdownInput.displayName = 'MarkdownInput';

export default MarkdownInput;
