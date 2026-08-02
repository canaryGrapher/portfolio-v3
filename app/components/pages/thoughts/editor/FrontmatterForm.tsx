"use client";

import React, { useState } from 'react';
import { EditorForm } from './useEditorState';
import FeatureImagePicker from './FeatureImagePicker';

interface FrontmatterFormProps {
    form: EditorForm;
    onChange: <K extends keyof EditorForm>(key: K, value: EditorForm[K]) => void;
    slugLocked: boolean;
}

const label = 'block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5';
const field =
    'w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-800/40 focus:border-green-800 transition-all text-gray-800';

const FrontmatterForm: React.FC<FrontmatterFormProps> = ({ form, onChange, slugLocked }) => {
    const [tagInput, setTagInput] = useState('');

    const addTag = () => {
        const tag = tagInput.trim().toLowerCase().replace(/\s+/g, '-');
        if (tag && !form.tags.includes(tag)) {
            onChange('tags', [...form.tags, tag]);
        }
        setTagInput('');
    };

    const handleTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
        } else if (e.key === 'Backspace' && !tagInput && form.tags.length > 0) {
            onChange('tags', form.tags.slice(0, -1));
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div>
                <label htmlFor="title" className={label}>Title</label>
                <input
                    id="title"
                    type="text"
                    value={form.title}
                    onChange={(e) => onChange('title', e.target.value)}
                    placeholder="What is this about?"
                    className={field}
                />
            </div>

            <div>
                <label htmlFor="subtitle" className={label}>Subtitle</label>
                <input
                    id="subtitle"
                    type="text"
                    value={form.subtitle}
                    onChange={(e) => onChange('subtitle', e.target.value)}
                    placeholder="Optional one-liner"
                    className={field}
                />
            </div>

            <div>
                <label htmlFor="slug" className={label}>
                    Slug {slugLocked && <span className="text-gray-400 normal-case">(fixed after publishing)</span>}
                </label>
                <input
                    id="slug"
                    type="text"
                    value={form.slug}
                    onChange={(e) => onChange('slug', e.target.value)}
                    disabled={slugLocked}
                    placeholder="auto-generated from the title"
                    className={`${field} ${slugLocked ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''} font-mono text-xs`}
                />
            </div>

            <div>
                <label htmlFor="tags" className={label}>Tags</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                    {form.tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full font-bold bg-green-800 text-white"
                        >
                            #{tag}
                            <button
                                type="button"
                                onClick={() => onChange('tags', form.tags.filter((t) => t !== tag))}
                                className="hover:text-red-300 cursor-pointer"
                                aria-label={`Remove ${tag}`}
                            >
                                x
                            </button>
                        </span>
                    ))}
                </div>
                <input
                    id="tags"
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKey}
                    onBlur={addTag}
                    placeholder="Type and press Enter"
                    className={field}
                />
            </div>

            <FeatureImagePicker
                value={form.featureImage}
                onChange={(url) => onChange('featureImage', url)}
            />

            <div>
                <label htmlFor="excerpt" className={label}>
                    Excerpt <span className="text-gray-400 normal-case">(auto if blank)</span>
                </label>
                <textarea
                    id="excerpt"
                    value={form.excerpt}
                    onChange={(e) => onChange('excerpt', e.target.value)}
                    rows={3}
                    placeholder="Shown on the listing page and in link previews"
                    className={`${field} resize-none`}
                />
            </div>
        </div>
    );
};

export default FrontmatterForm;
