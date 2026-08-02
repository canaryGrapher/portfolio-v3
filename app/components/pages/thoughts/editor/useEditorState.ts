"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { ThoughtDraftInput, ThoughtStatus } from '@/app/interface/thoughts';

export interface EditorForm {
    slug: string;
    title: string;
    subtitle: string;
    tags: string[];
    featureImage: string;
    excerpt: string;
    status: ThoughtStatus;
    content: string;
}

const EMPTY: EditorForm = {
    slug: '',
    title: '',
    subtitle: '',
    tags: [],
    featureImage: '',
    excerpt: '',
    status: 'draft',
    content: '',
};

const AUTOSAVE_KEY = 'thoughts-editor-draft';
const AUTOSAVE_MS = 3000;

export const useEditorState = () => {
    const [form, setForm] = useState<EditorForm>(EMPTY);
    // Set when editing an existing post; null means "new post".
    const [editingSlug, setEditingSlug] = useState<string | null>(null);
    const [dirty, setDirty] = useState(false);
    const [restored, setRestored] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const update = useCallback(<K extends keyof EditorForm>(key: K, value: EditorForm[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        setDirty(true);
    }, []);

    const load = useCallback((next: EditorForm, slug: string | null) => {
        setForm(next);
        setEditingSlug(slug);
        setDirty(false);
    }, []);

    const reset = useCallback(() => {
        setForm(EMPTY);
        setEditingSlug(null);
        setDirty(false);
        localStorage.removeItem(AUTOSAVE_KEY);
    }, []);

    /** Recovers an unsaved draft after a crash or accidental close. */
    useEffect(() => {
        try {
            const saved = localStorage.getItem(AUTOSAVE_KEY);
            if (!saved) return;
            const parsed = JSON.parse(saved) as { form: EditorForm; editingSlug: string | null };
            if (parsed.form?.title || parsed.form?.content) {
                setForm(parsed.form);
                setEditingSlug(parsed.editingSlug ?? null);
                setRestored(true);
            }
        } catch {
            // Corrupt autosave is not worth surfacing; start clean.
        }
    }, []);

    useEffect(() => {
        if (!dirty) return;
        if (timer.current) clearTimeout(timer.current);

        timer.current = setTimeout(() => {
            localStorage.setItem(AUTOSAVE_KEY, JSON.stringify({ form, editingSlug }));
        }, AUTOSAVE_MS);

        return () => {
            if (timer.current) clearTimeout(timer.current);
        };
    }, [form, editingSlug, dirty]);

    /** Warns before closing a tab with unsaved changes. */
    useEffect(() => {
        const handler = (e: BeforeUnloadEvent) => {
            if (!dirty) return;
            e.preventDefault();
            e.returnValue = '';
        };
        window.addEventListener('beforeunload', handler);
        return () => window.removeEventListener('beforeunload', handler);
    }, [dirty]);

    const toPayload = useCallback(
        (status: ThoughtStatus): ThoughtDraftInput => ({
            slug: form.slug || undefined,
            title: form.title,
            subtitle: form.subtitle,
            tags: form.tags,
            featureImage: form.featureImage,
            excerpt: form.excerpt,
            status,
            content: form.content,
        }),
        [form]
    );

    const clearAutosave = useCallback(() => {
        localStorage.removeItem(AUTOSAVE_KEY);
        setDirty(false);
    }, []);

    return {
        form,
        update,
        load,
        reset,
        editingSlug,
        setEditingSlug,
        dirty,
        restored,
        dismissRestored: () => setRestored(false),
        toPayload,
        clearAutosave,
    };
};
