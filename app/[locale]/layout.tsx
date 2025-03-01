import ruRU from 'antd/locale/ru_RU';
import heIL from 'antd/locale/he_IL';
import type { Metadata } from 'next';
import { ConfigProvider } from 'antd';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { redirect } from 'next/navigation';

import { ReactQueryProvider, ReduxProvider } from '@/shared/providers';
import { NotifiesWrapper } from '@/shared/wrappers/NotifiesWrapper';
import { InitialWrapper } from '@/shared/wrappers/InitialWrapper';

export const metadata: Metadata = {
    title: 'Muscle Feed',
};

export default async function LocaleLayout({
    params,
    children,
}: {
    params: { locale: string };
    children: React.ReactNode;
}) {
    const { locale } = await params;

    if (!routing.locales.includes((locale as 'ru') || 'he')) {
        return redirect('/');
    }

    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            <ReduxProvider>
                <ReactQueryProvider>
                    <InitialWrapper lang={locale as 'ru' | 'he'}>
                        <ConfigProvider
                            locale={locale === 'he' ? heIL : ruRU}
                            theme={{
                                token: {
                                    colorPrimary: '#00A31E',
                                    fontFamily: 'Inter, sans-serif',
                                },
                            }}
                        >
                            <NotifiesWrapper>
                                <div className={locale === 'he' ? 'rtl' : ''}>{children}</div>
                            </NotifiesWrapper>
                        </ConfigProvider>
                    </InitialWrapper>
                </ReactQueryProvider>
            </ReduxProvider>
        </NextIntlClientProvider>
    );
}
