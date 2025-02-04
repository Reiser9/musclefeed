import ruRU from 'antd/locale/ru_RU';
import type { Metadata } from 'next';
import { ConfigProvider } from 'antd';

import './globals.scss';

export const metadata: Metadata = {
    title: 'Muscle Feed',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body>
                <ConfigProvider
                    locale={ruRU}
                    theme={{
                        token: {
                            colorPrimary: '#00A31E',
                            fontFamily: 'Inter, sans-serif',
                        },
                    }}
                >
                    {children}
                </ConfigProvider>
            </body>
        </html>
    );
}
