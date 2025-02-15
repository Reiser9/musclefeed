import type { NextConfig } from 'next';
import path from 'path';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin("./request.ts");

const nextConfig: NextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        domains: ['resez.ru'],
        unoptimized: true,
    },
    reactStrictMode: false,
};

export default withNextIntl(nextConfig);
