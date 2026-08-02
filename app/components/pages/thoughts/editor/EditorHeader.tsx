"use client";

import React from 'react';
import Link from 'next/link';

export type Notice = { kind: 'ok' | 'error'; text: string; href?: string } | null;

interface EditorHeaderProps {
    editing: boolean;
    dirty: boolean;
    saving: boolean;
    notice: Notice;
    restored: boolean;
    onDismissRestored: () => void;
    onDismissNotice: () => void;
    onSaveDraft: () => void;
    onPublish: () => void;
    onLogout: () => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
    editing, dirty, saving, notice, restored,
    onDismissRestored, onDismissNotice, onSaveDraft, onPublish, onLogout,
}) => (
    <>
        <div className="flex items-center justify-between flex-wrap gap-3 py-5">
            <div className="min-w-0">
                <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
                    {editing ? 'Editing entry' : 'New entry'}
                </h1>
                <p className="text-xs text-gray-500 font-semibold mt-0.5 flex items-center gap-2">
                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${dirty ? 'bg-amber-500' : 'bg-green-600'}`} />
                    {dirty ? 'Unsaved changes' : 'All changes saved'}
                    <span className="text-gray-300">|</span>
                    <Link href="/page/thoughts" className="hover:text-green-800">Public page</Link>
                </p>
            </div>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={onSaveDraft}
                    disabled={saving}
                    className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:border-green-800/40 hover:text-green-800 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                >
                    Save draft
                </button>
                <button
                    type="button"
                    onClick={onPublish}
                    disabled={saving}
                    className="px-5 py-2.5 bg-green-800 text-white font-bold text-sm rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-900/10 disabled:opacity-50 cursor-pointer"
                >
                    {saving ? 'Saving...' : 'Publish'}
                </button>
                <button
                    type="button"
                    onClick={onLogout}
                    className="px-3 py-2.5 text-gray-400 hover:text-red-600 font-bold text-xs cursor-pointer"
                >
                    Sign out
                </button>
            </div>
        </div>

        {restored && (
            <div className="mb-3 flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
                <span>Recovered an unsaved draft from your last session.</span>
                <button onClick={onDismissRestored} className="font-bold cursor-pointer hover:text-blue-950">
                    Dismiss
                </button>
            </div>
        )}

        {notice && (
            <div
                className={`mb-3 flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border text-xs font-semibold ${notice.kind === 'ok'
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-red-50 border-red-200 text-red-700'
                    }`}
            >
                <span>
                    {notice.text}
                    {notice.href && (
                        <Link href={notice.href} className="underline ml-2 font-bold">
                            View entry
                        </Link>
                    )}
                </span>
                <button onClick={onDismissNotice} className="font-bold cursor-pointer">
                    Dismiss
                </button>
            </div>
        )}
    </>
);

export default EditorHeader;
