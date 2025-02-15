'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { usePathname } from 'next/navigation';

import styles from './index.module.scss';

const FaqTabs = () => {
    const pathname = usePathname();
    const locale = React.useMemo(() => (pathname.split('/')[1] === 'he' ? 'he' : 'ru'), [pathname]);

    return <div className={styles.faqTabs}>
        <Link className={cn(styles.faqTab, {
            [styles.active]: pathname === `/${locale}/admin/faq`
        })} href={`/${locale}/admin/faq`}>Вопросы</Link>

        <Link className={cn(styles.faqTab, {
            [styles.active]: pathname.includes(`/${locale}/admin/faq/category`)
        })} href={`/${locale}/admin/faq/category`}>Категории</Link>
    </div>;
};

export default FaqTabs;
