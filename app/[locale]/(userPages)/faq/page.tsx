'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import { BannerSmall } from '@/widgets/Banner';
import { ArrowRightShort, Home } from '@/shared/icons';

import { BreadcrumbLink, Breadcrumbs, BreadcrumbText } from '@/shared/ui/Breadcrumbs';
import FaqBlock from './FaqBlock';

const Faq = () => {
    const t = useTranslations("Faq");

    return (
        <>
            <Breadcrumbs>
                <BreadcrumbLink href="/">
                    <Home />
                </BreadcrumbLink>

                <ArrowRightShort />

                <BreadcrumbLink href="/faq">{t('buyer')}</BreadcrumbLink>

                <ArrowRightShort />

                <BreadcrumbText>{t('faq')}</BreadcrumbText>
            </Breadcrumbs>

            <FaqBlock />

            <BannerSmall />
        </>
    );
};

export default Faq;
