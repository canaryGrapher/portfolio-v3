"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ThoughtsClient } from '@/app/lib/thoughts/client';
import { ThoughtSummary, ThoughtStatus } from '@/app/interface/thoughts';
import { slugify } from '@/app/lib/thoughts/slug';
import { useEditorState } from './useEditorState';
import { useImageUpload } from './useImageUpload';
import EditorHeader, { Notice } from './EditorHeader';
import EditorToolbar, { WrapAction } from './EditorToolbar';
import MarkdownInput from './MarkdownInput';
import PreviewPane from './PreviewPane';
import FrontmatterForm from './FrontmatterForm';
import PostList from './PostList';

type Tab = 'write' | 'preview';

const EditorShell: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const {
        form, update, load, reset, editingSlug, setEditingSlug,
        dirty, restored, dismissRestored, toPayload, clearAutosave,
    } = useEditorState();

    const [posts, setPosts] = useState<ThoughtSummary[]>([]);
    const [listLoading, setListLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [notice, setNotice] = useState<Notice>(null);
    const [tab, setTab] = useState<Tab>('write');
    const [detailsOpen, setDetailsOpen] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { upload, uploading } = useImageUpload();

    const refreshList = useCallback(async () => {
        setListLoading(true);
        try {
            setPosts(await ThoughtsClient.list());
        } catch (e) {
            setNotice({ kind: 'error', text: e instanceof Error ? e.message : 'Could not load entries' });
        } finally {
            setListLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshList();
    }, [refreshList]);

    // Slug follows the title until the post exists, then it is frozen.
    useEffect(() => {
        if (!editingSlug && form.title) {
            update('slug', slugify(form.title));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.title, editingSlug]);

    /** Inserts markdown around the current selection and restores the caret. */
    const applyAction = (action: WrapAction) => {
        const el = textareaRef.current;
        if (!el) return;

        const { selectionStart: start, selectionEnd: end } = el;
        const selected = form.content.slice(start, end);

        let inserted: string;
        let caretOffset: number;

        if (action.type === 'wrap') {
            const body = selected || action.placeholder;
            inserted = `${action.before}${body}${action.after}`;
            caretOffset = action.before.length + body.length;
        } else {
            const body = selected || action.placeholder;
            const atLineStart = start === 0 || form.content[start - 1] === '\n';
            const lead = atLineStart ? '' : '\n';
            inserted = `${lead}${action.prefix}${body}`;
            caretOffset = inserted.length;
        }

        update('content', `${form.content.slice(0, start)}${inserted}${form.content.slice(end)}`);

        requestAnimationFrame(() => {
            el.focus();
            const caret = start + caretOffset;
            el.selectionStart = selected ? caret : start + (action.type === 'wrap' ? action.before.length : caretOffset);
            el.selectionEnd = caret;
        });
    };

    const insertImages = async (files: File[]) => {
        for (const file of files) {
            const result = await upload(file);
            if (!result) {
                setNotice({ kind: 'error', text: `Could not upload ${file.name}` });
                continue;
            }
            const el = textareaRef.current;
            const at = el?.selectionStart ?? form.content.length;
            const markdown = `\n![${result.name}](${result.url})\n`;
            update('content', `${form.content.slice(0, at)}${markdown}${form.content.slice(at)}`);
        }
    };

    const save = async (status: ThoughtStatus) => {
        if (saving) return;

        if (!form.title.trim()) {
            setNotice({ kind: 'error', text: 'Give it a title first. The title field is in Details.' });
            setDetailsOpen(true);
            return;
        }
        if (!form.content.trim()) {
            setNotice({ kind: 'error', text: 'The entry is empty.' });
            return;
        }

        setSaving(true);
        setNotice(null);

        try {
            const payload = toPayload(status);
            const result = editingSlug
                ? await ThoughtsClient.update(editingSlug, payload)
                : await ThoughtsClient.create(payload);

            setEditingSlug(result.slug);
            update('slug', result.slug);
            update('status', status);
            clearAutosave();
            await refreshList();

            setNotice({
                kind: 'ok',
                text: status === 'published' ? 'Published. Live within a minute.' : 'Draft saved.',
                href: status === 'published' ? `/page/thoughts/${result.slug}` : undefined,
            });
        } catch (e) {
            setNotice({ kind: 'error', text: e instanceof Error ? e.message : 'Save failed' });
        } finally {
            setSaving(false);
        }
    };

    const openPost = async (slug: string) => {
        if (dirty && !window.confirm('You have unsaved changes. Discard them?')) return;

        try {
            const post = await ThoughtsClient.get(slug);
            load(
                {
                    slug: post.slug,
                    title: post.title,
                    subtitle: post.subtitle || '',
                    tags: post.tags,
                    featureImage: post.featureImage || '',
                    excerpt: post.excerpt || '',
                    status: post.status,
                    content: post.content,
                },
                post.slug
            );
            setNotice(null);
            setTab('write');
        } catch (e) {
            setNotice({ kind: 'error', text: e instanceof Error ? e.message : 'Could not open entry' });
        }
    };

    const deletePost = async (slug: string) => {
        try {
            await ThoughtsClient.remove(slug);
            if (editingSlug === slug) reset();
            await refreshList();
            setNotice({ kind: 'ok', text: 'Entry deleted.' });
        } catch (e) {
            setNotice({ kind: 'error', text: e instanceof Error ? e.message : 'Delete failed' });
        }
    };

    const startNew = () => {
        if (dirty && !window.confirm('You have unsaved changes. Discard them?')) return;
        reset();
        setNotice(null);
        setTab('write');
    };

    const logout = async () => {
        await ThoughtsClient.logout().catch(() => undefined);
        onLogout();
    };

    const panel = 'bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm';

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 pt-6 pb-8">
            <div className="max-w-[1700px] mx-auto px-4">
                <EditorHeader
                    editing={Boolean(editingSlug)}
                    dirty={dirty}
                    saving={saving}
                    notice={notice}
                    restored={restored}
                    onDismissRestored={dismissRestored}
                    onDismissNotice={() => setNotice(null)}
                    onSaveDraft={() => save('draft')}
                    onPublish={() => save('published')}
                    onLogout={logout}
                />

                {/* Left: entries · Center: write/preview · Right: details */}
                <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_300px] gap-5">
                    <aside className={`${panel} p-4 order-2 lg:order-1 lg:h-[calc(100vh-10rem)] lg:sticky lg:top-6`}>
                        <PostList
                            posts={posts}
                            activeSlug={editingSlug}
                            loading={listLoading}
                            onSelect={openPost}
                            onDelete={deletePost}
                            onNew={startNew}
                        />
                    </aside>

                    <section className="order-1 lg:order-2 flex flex-col">
                        <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col lg:h-[calc(100vh-10rem)]">
                            <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-gray-200 bg-gray-50/80">
                                <div
                                    role="tablist"
                                    aria-label="Editor view"
                                    className="flex gap-0.5 bg-gray-200/70 rounded-lg p-0.5"
                                >
                                    {(['write', 'preview'] as const).map((t) => (
                                        <button
                                            key={t}
                                            role="tab"
                                            aria-selected={tab === t}
                                            onClick={() => setTab(t)}
                                            className={`px-4 py-1.5 text-xs font-bold rounded-md capitalize cursor-pointer transition-all ${tab === t ? 'bg-white text-green-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setDetailsOpen((v) => !v)}
                                    className="xl:hidden px-3 py-1.5 text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-lg hover:text-green-800 cursor-pointer"
                                >
                                    {detailsOpen ? 'Hide details' : 'Details'}
                                </button>
                            </div>

                            {/* Both panes stay mounted so the textarea keeps its caret and
                                scroll position when you flick to preview and back. */}
                            <div className="flex-1 min-h-0 overflow-hidden">
                                <div className={`${tab === 'write' ? 'flex' : 'hidden'} flex-col h-full`}>
                                    <EditorToolbar
                                        onAction={applyAction}
                                        onUploadClick={() => fileInputRef.current?.click()}
                                        uploading={uploading}
                                    />
                                    <div className="flex-1 min-h-0">
                                        <MarkdownInput
                                            ref={textareaRef}
                                            value={form.content}
                                            onChange={(v) => update('content', v)}
                                            onPasteFiles={insertImages}
                                            onSave={() => save('draft')}
                                            onPublish={() => save('published')}
                                        />
                                    </div>
                                </div>

                                <div className={`${tab === 'preview' ? 'block' : 'hidden'} h-full overflow-y-auto`}>
                                    <PreviewPane content={form.content} title={form.title} subtitle={form.subtitle} />
                                </div>
                            </div>
                        </div>

                        <p className="text-[11px] text-gray-400 mt-2.5 font-semibold">
                            Cmd/Ctrl+S saves a draft · Cmd/Ctrl+Enter publishes · drag or paste images straight in
                        </p>
                    </section>

                    <aside
                        className={`${panel} p-5 order-3 ${detailsOpen ? 'block' : 'hidden'} xl:block xl:h-[calc(100vh-10rem)] xl:sticky xl:top-6 xl:overflow-y-auto`}
                    >
                        <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-4">
                            Details
                        </h2>
                        <FrontmatterForm form={form} onChange={update} slugLocked={Boolean(editingSlug)} />
                    </aside>
                </div>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length) insertImages(files);
                    e.target.value = '';
                }}
            />
        </div>
    );
};

export default EditorShell;
