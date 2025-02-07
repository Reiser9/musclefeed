import ruRU from 'antd/locale/ru_RU';
import type { Metadata } from 'next';
import { ConfigProvider } from 'antd';

import './globals.scss';

import { ReactQueryProvider, ReduxProvider } from '@/shared/providers';
import { NotifiesWrapper } from '@/shared/wrappers/NotifiesWrapper';
import { InitialWrapper } from '@/shared/wrappers/InitialWrapper';

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
                <ReduxProvider>
                    <ReactQueryProvider>
                        <InitialWrapper>
                            <ConfigProvider
                                locale={ruRU}
                                theme={{
                                    token: {
                                        colorPrimary: '#00A31E',
                                        fontFamily: 'Inter, sans-serif',
                                    },
                                }}
                            >
                                <NotifiesWrapper>{children}</NotifiesWrapper>
                            </ConfigProvider>
                        </InitialWrapper>
                    </ReactQueryProvider>
                </ReduxProvider>
            </body>
        </html>
    );
}
