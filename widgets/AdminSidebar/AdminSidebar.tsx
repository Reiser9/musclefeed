'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import { usePathname } from 'next/navigation';

import styles from './index.module.scss';

const AdminSidebar = () => {
    const pathname = usePathname();
    const locale = React.useMemo(() => (pathname.split('/')[1] === 'he' ? 'he' : 'ru'), [pathname]);

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarLogoInner}>
                <Link href="/" className={styles.sidebarLogo}>
                    <Image src="/img/logo.png" alt="logo" fill />
                </Link>
            </div>

            <nav className={styles.sidebarNav}>
                {/* Выделить в массив */}
                <Link
                    href={`/${locale}/admin`}
                    className={cn(styles.sidebarNavLink, {
                        [styles.active]: pathname === `/${locale}/admin`,
                    })}
                >
                    Заказы
                </Link>

                <Link
                    href={`/${locale}/admin/dish`}
                    className={cn(styles.sidebarNavLink, {
                        [styles.active]: pathname.includes(`/${locale}/admin/dish`),
                    })}
                >
                    Блюда
                </Link>

                <Link
                    href={`/${locale}/admin/typesdish`}
                    className={cn(styles.sidebarNavLink, {
                        [styles.active]: pathname.includes(`/${locale}/admin/typesdish`),
                    })}
                >
                    Типы блюд
                </Link>

                <Link
                    href={`/${locale}/admin/menu`}
                    className={cn(styles.sidebarNavLink, {
                        [styles.active]: pathname.includes(`/${locale}/admin/menu`),
                    })}
                >
                    Меню
                </Link>

                <Link
                    href={`/${locale}/admin/typesmenu`}
                    className={cn(styles.sidebarNavLink, {
                        [styles.active]: pathname.includes(`/${locale}/admin/typesmenu`),
                    })}
                >
                    Типы меню
                </Link>

                <Link
                    href={`/${locale}/admin/team`}
                    className={cn(styles.sidebarNavLink, {
                        [styles.active]: pathname.includes(`/${locale}/admin/team`),
                    })}
                >
                    Команда
                </Link>

                <Link
                    href={`/${locale}/admin/faq`}
                    className={cn(styles.sidebarNavLink, {
                        [styles.active]: pathname.includes(`/${locale}/admin/faq`),
                    })}
                >
                    FAQ
                </Link>

                <Link
                    href={`/${locale}/admin/reviews`}
                    className={cn(styles.sidebarNavLink, {
                        [styles.active]: pathname.includes(`/${locale}/admin/reviews`),
                    })}
                >
                    Отзывы
                </Link>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
