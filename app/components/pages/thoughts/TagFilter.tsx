"use client";

import React from 'react';

interface TagFilterProps {
    tags: string[];
    selected: string | null;
    onSelect: (tag: string | null) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, selected, onSelect }) => {
    if (tags.length === 0) return null;

    const chip = (active: boolean) =>
        `px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${active
            ? 'bg-green-800 text-white border-green-800 shadow-sm shadow-green-900/20'
            : 'bg-white text-gray-600 border-gray-200 hover:border-green-800/40 hover:text-green-800'
        }`;

    return (
        <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => onSelect(null)} className={chip(selected === null)}>
                All
            </button>
            {tags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => onSelect(selected === tag ? null : tag)}
                    className={chip(selected === tag)}
                >
                    #{tag}
                </button>
            ))}
        </div>
    );
};

export default TagFilter;
