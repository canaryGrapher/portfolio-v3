"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ThoughtsClient } from '@/app/lib/thoughts/client';

interface LoginModalProps {
    onSuccess: () => void;
}

/**
 * Deliberately card-less: the form sits directly on the page background, the way
 * Medium's sign-in does. Typography and whitespace carry it instead of chrome.
 */
const LoginModal: React.FC<LoginModalProps> = ({ onSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (busy) return;

        setBusy(true);
        setError(null);
        try {
            await ThoughtsClient.login(username, password);
            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
            setPassword('');
        } finally {
            setBusy(false);
        }
    };

    // Underline inputs rather than boxes: fewer borders competing for attention.
    const field =
        'w-full bg-transparent border-b border-gray-300 pb-2.5 pt-1 text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-green-800 transition-colors';
    const labelClass = 'block text-[13px] font-medium text-gray-500 mb-1';

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-6 py-20">
            <div className="w-full max-w-[340px]">
                <div className="text-center mb-12">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-green-800 mb-5">
                        Writing desk
                    </p>
                    <h1 className="font-serif text-[38px] leading-[1.15] tracking-tight text-gray-900 mb-3">
                        Welcome back.
                    </h1>
                    <p className="text-[15px] text-gray-500 leading-relaxed">
                        Sign in to write a new entry.
                    </p>
                </div>

                <form onSubmit={submit} className="flex flex-col gap-7">
                    <div>
                        <label htmlFor="username" className={labelClass}>
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={field}
                            autoComplete="username"
                            autoFocus
                            required
                        />
                    </div>

                    <div>
                        <div className="flex items-baseline justify-between mb-1">
                            <label htmlFor="password" className={labelClass.replace(' mb-1', '')}>
                                Password
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="text-[12px] font-medium text-gray-400 hover:text-green-800 transition-colors cursor-pointer"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={field}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    {error && (
                        <p role="alert" className="text-[13px] text-red-600 leading-relaxed -mt-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={busy}
                        className="mt-2 w-full py-3 bg-green-800 text-white text-[14px] font-semibold rounded-full hover:bg-green-700 active:bg-green-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                    >
                        {busy ? (
                            <>
                                <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Signing in
                            </>
                        ) : (
                            'Sign in'
                        )}
                    </button>
                </form>

                <div className="mt-14 pt-6 border-t border-gray-200 text-center">
                    <Link
                        href="/page/thoughts"
                        className="text-[13px] text-gray-400 hover:text-green-800 transition-colors"
                    >
                        Back to Thoughts
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
