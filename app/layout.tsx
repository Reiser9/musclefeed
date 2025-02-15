import type { Metadata } from 'next';

import './globals.scss';

export const metadata: Metadata = {
    title: 'Muscle Feed',
};

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>{children}</body>
        </html>
    );
}
