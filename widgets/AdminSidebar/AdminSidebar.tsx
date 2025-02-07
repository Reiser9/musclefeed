'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './index.module.scss';

const AdminSidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarLogoInner}>
                <Link href="/" className={styles.sidebarLogo}>
                    <Image src="/img/logo.png" alt="logo" fill />
                </Link>
            </div>

            <nav className={styles.sidebarNav}>
                <Link href="/admin" className={styles.sidebarNavLink}>
                    Заказы
                </Link>

                <Link href="/admin/dish" className={styles.sidebarNavLink}>
                    Блюда
                </Link>

                <Link href="/admin/team" className={styles.sidebarNavLink}>
                    Команда
                </Link>

                <Link href="/admin/faq" className={styles.sidebarNavLink}>
                    FAQ
                </Link>

                <Link href="/admin/reviews" className={styles.sidebarNavLink}>
                    Отзывы
                </Link>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
