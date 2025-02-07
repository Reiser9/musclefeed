import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    reactStrictMode: false,
    i18n: {
        locales: ['ru', 'he'],
        defaultLocale: 'ru',
        localeDetection: false,
    },
};

export default nextConfig;
