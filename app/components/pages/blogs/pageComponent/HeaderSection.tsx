"use client"
import React, { useState } from 'react';

// Component: Heading and subscription section
const HeaderSection: React.FC<{
    title: string;
    subtitle: string;
    onSubscribe: (email: string) => Promise<{ status: 'success' | 'already' | 'error'; message: string }>;
}> = ({ title, subtitle, onSubscribe }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'already' | 'error' | 'success' | null; text: string } | null>(null);1

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setFeedback(null);
        const result = await onSubscribe(email);
        setLoading(false);
        if (result.status === 'already') setFeedback({ type: 'already', text: 'Already subscribed!' });
        else if (result.status === 'success') setFeedback({ type: 'success', text: 'Verification mail sent!' });
        else setFeedback({ type: 'error', text: 'Failed. Try again' });
        // Clear feedback after 5 seconds
        setTimeout(() => {
            setFeedback(null);
            setEmail('');
        }, 5000);
    };

    return (
        <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-semibold">{title}</h1>
            <p className="text-lg md:text-xl text-gray-600 md:mt-3">{subtitle}</p>
            <div className="flex flex-row justify-center mt-4">
                {feedback ?
                    <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto mt-4 px-4">
                        {feedback.type === 'already' && (
                            <div className="rounded-md px-4 py-2 bg-yellow-600 text-white">Already subscribed!</div>
                        )}
                        {feedback.type === 'error' && (
                            <div className="rounded-md px-4 py-2 bg-red-600 text-white">Failed. Try again</div>
                        )}
                        {feedback.type === 'success' && (
                            <div className="rounded-md px-4 py-2 bg-blue-600 text-white">Verification mail sent!</div>
                        )}
                    </div>
                    :
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-[1fr_auto] md:max-w-xl mx-auto mt-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={`px-4 py-2 rounded-l-md bg-gray-200 text-gray-600 placeholder-gray-400 border border-gray-300 focus:outline-none ${loading ? 'animate-pulse' : ''
                                }`}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 rounded-r-md bg-gray-800 text-white disabled:opacity-60"
                        >
                            {loading ? 'Subscribing…' : 'Subscribe'}
                        </button>
                    </form>
                }
            </div>
        </div>
    );
};

export default HeaderSection;