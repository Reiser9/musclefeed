'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';

import { Cross, Menu } from '@/shared/icons';
import { useUserInfo } from '@/features/user';

const AdminSidebar = () => {
    const [showSidebar, setShowSidebar] = React.useState(false);
    const pathname = usePathname();
    const locale = React.useMemo(() => (pathname.split('/')[1] === 'he' ? 'he' : 'ru'), [pathname]);

    const { getShortInfo } = useUserInfo();

    const { data } = useQuery({
        queryKey: ['user_info'],
        queryFn: getShortInfo,
    });

    const { roles } = data || {};

    return (
        <>
            <aside
                className={cn(styles.sidebar, {
                    [styles.show]: showSidebar,
                })}
            >
                <div className={styles.sidebarLogoInner}>
                    <button className={styles.sidebarClose} onClick={() => setShowSidebar(false)}>
                        <Cross />
                    </button>

                    <Link href="/" className={styles.sidebarLogo}>
                        <Image src="/img/logo.png" alt="logo" fill />
                    </Link>
                </div>

                <nav className={styles.sidebarNav}>
                    <Link
                        href={`/${locale}/admin`}
                        className={cn(styles.sidebarNavLink, {
                            [styles.active]: pathname === `/${locale}/admin`,
                        })}
                        onClick={() => setShowSidebar(false)}
                    >
                        Заказы
                    </Link>

                    <Link
                        href={`/${locale}/admin/request`}
                        className={cn(styles.sidebarNavLink, {
                            [styles.active]: pathname === `/${locale}/admin/request`,
                        })}
                        onClick={() => setShowSidebar(false)}
                    >
                        Запросы изменений
                    </Link>

                    <Link
                        href={`/${locale}/admin/panel`}
                        className={cn(styles.sidebarNavLink, {
                            [styles.active]: pathname === `/${locale}/admin/panel`,
                        })}
                        onClick={() => setShowSidebar(false)}
                    >
                        Панель
                    </Link>

                    {roles?.includes('ADMIN') && (
                        <Link
                            href={`/${locale}/admin/dish`}
                            className={cn(styles.sidebarNavLink, {
                                [styles.active]: pathname.includes(`/${locale}/admin/dish`),
                            })}
                            onClick={() => setShowSidebar(false)}
                        >
                            Блюда
                        </Link>
                    )}

                    {roles?.includes('ADMIN') && (
                        <Link
                            href={`/${locale}/admin/typesdish`}
                            className={cn(styles.sidebarNavLink, {
                                [styles.active]: pathname.includes(`/${locale}/admin/typesdish`),
                            })}
                            onClick={() => setShowSidebar(false)}
                        >
                            Типы блюд
                        </Link>
                    )}

                    {roles?.includes('ADMIN') && (
                        <Link
                            href={`/${locale}/admin/menu`}
                            className={cn(styles.sidebarNavLink, {
                                [styles.active]: pathname.includes(`/${locale}/admin/menu`),
                            })}
                            onClick={() => setShowSidebar(false)}
                        >
                            Меню
                        </Link>
                    )}

                    {roles?.includes('ADMIN') && (
                        <Link
                            href={`/${locale}/admin/typesmenu`}
                            className={cn(styles.sidebarNavLink, {
                                [styles.active]: pathname.includes(`/${locale}/admin/typesmenu`),
                            })}
                            onClick={() => setShowSidebar(false)}
                        >
                            Типы меню
                        </Link>
                    )}

                    {roles?.includes('ADMIN') && (
                        <Link
                            href={`/${locale}/admin/team`}
                            className={cn(styles.sidebarNavLink, {
                                [styles.active]: pathname.includes(`/${locale}/admin/team`),
                            })}
                            onClick={() => setShowSidebar(false)}
                        >
                            Команда
                        </Link>
                    )}

                    {roles?.includes('ADMIN') && (
                        <Link
                            href={`/${locale}/admin/faq`}
                            className={cn(styles.sidebarNavLink, {
                                [styles.active]: pathname.includes(`/${locale}/admin/faq`),
                            })}
                            onClick={() => setShowSidebar(false)}
                        >
                            FAQ
                        </Link>
                    )}

                    {roles?.includes('ADMIN') && (
                        <Link
                            href={`/${locale}/admin/reviews`}
                            className={cn(styles.sidebarNavLink, {
                                [styles.active]: pathname.includes(`/${locale}/admin/reviews`),
                            })}
                            onClick={() => setShowSidebar(false)}
                        >
                            Отзывы
                        </Link>
                    )}

                    {roles?.includes('ADMIN') && (
                        <Link
                            href={`/${locale}/admin/cities`}
                            className={cn(styles.sidebarNavLink, {
                                [styles.active]: pathname.includes(`/${locale}/admin/cities`),
                            })}
                            onClick={() => setShowSidebar(false)}
                        >
                            Города
                        </Link>
                    )}

                    {roles?.includes('ADMIN') && (
                        <Link
                            href={`/${locale}/admin/users`}
                            className={cn(styles.sidebarNavLink, {
                                [styles.active]: pathname.includes(`/${locale}/admin/users`),
                            })}
                            onClick={() => setShowSidebar(false)}
                        >
                            Пользователи
                        </Link>
                    )}
                </nav>
            </aside>

            <button
                className={cn(styles.sidebarMenu, {
                    [styles.show]: !showSidebar,
                })}
                onClick={() => setShowSidebar(true)}
            >
                <Menu />
            </button>
        </>
    );
};

export default AdminSidebar;
