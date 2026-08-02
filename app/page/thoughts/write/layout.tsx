import type { Metadata } from 'next';

// Keeps the editor out of search results. Obscurity is not the security control
// here (the API is), but there is no reason for this URL to be indexed.
export const metadata: Metadata = {
    title: 'Write',
    robots: { index: false, follow: false, nocache: true },
};

export default function WriteLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
