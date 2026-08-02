"use client";

import React, { useState, useEffect } from 'react';
import { ThoughtsClient } from '@/app/lib/thoughts/client';
import LoginModal from '@/app/components/pages/thoughts/editor/LoginModal';
import EditorShell from '@/app/components/pages/thoughts/editor/EditorShell';

/**
 * The page renders for anyone, but everything it can do is gated by the API,
 * which middleware protects. So an unauthenticated visitor sees only the modal.
 */
const WritePage = () => {
    const [authed, setAuthed] = useState<boolean | null>(null);

    useEffect(() => {
        ThoughtsClient.session()
            .then((s) => setAuthed(Boolean(s.authenticated)))
            .catch(() => setAuthed(false));
    }, []);

    if (authed === null) {
        return (
            <div className="min-h-screen bg-[#fcfcfb] flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-gray-300" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            </div>
        );
    }

    if (!authed) {
        // Flat near-white here rather than the site's gradient: a card-less form
        // needs a calm background or the type has to fight the gradient.
        return (
            <div className="min-h-screen bg-[#fcfcfb]">
                <LoginModal onSuccess={() => setAuthed(true)} />
            </div>
        );
    }


    return <EditorShell onLogout={() => setAuthed(false)} />;
};

export default WritePage;
