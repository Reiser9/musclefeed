import type { Metadata } from 'next';

import './globals.scss';
import PixelTracker from '@/PixelTracker';

export const metadata: Metadata = {
    title: 'Muscle Feed',
};

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <PixelTracker />
                {children}
            </body>
        </html>
    );
}
