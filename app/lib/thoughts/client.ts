"use client";

import {
    ThoughtPost,
    ThoughtSummary,
    ThoughtDraftInput,
    UploadedImage,
    SessionInfo,
} from '@/app/interface/thoughts';

const json = async <T,>(res: Response): Promise<T> => {
    const body = await res.json().catch(() => ({}));
    if (!res.ok || body.success === false) {
        throw new Error(body.error || `Request failed (${res.status})`);
    }
    return body.data as T;
};

export const ThoughtsClient = {
    login: (username: string, password: string) =>
        fetch('/api/thoughts/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        }).then((r) => json<{ username: string }>(r)),

    logout: () => fetch('/api/thoughts/auth/logout', { method: 'POST' }).then((r) => json(r)),

    session: () =>
        fetch('/api/thoughts/auth/session', { cache: 'no-store' }).then((r) => json<SessionInfo>(r)),

    list: () =>
        fetch('/api/thoughts/posts', { cache: 'no-store' }).then((r) => json<ThoughtSummary[]>(r)),

    get: (slug: string) =>
        fetch(`/api/thoughts/posts/${slug}`, { cache: 'no-store' }).then((r) => json<ThoughtPost>(r)),

    create: (input: ThoughtDraftInput) =>
        fetch('/api/thoughts/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        }).then((r) => json<{ slug: string; sha: string; commitUrl: string }>(r)),

    update: (slug: string, input: ThoughtDraftInput) =>
        fetch(`/api/thoughts/posts/${slug}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        }).then((r) => json<{ slug: string; sha: string; commitUrl: string }>(r)),

    remove: (slug: string) =>
        fetch(`/api/thoughts/posts/${slug}`, { method: 'DELETE' }).then((r) => json(r)),

    upload: (file: File) => {
        const form = new FormData();
        form.append('file', file);
        return fetch('/api/thoughts/upload', { method: 'POST', body: form }).then((r) =>
            json<UploadedImage>(r)
        );
    },
};
