'use client';

import React from 'react';
import Link from 'next/link';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { AuthWrapper } from '@/shared/wrappers/InitialWrapper';
import { ArrowRightShort, Home, Safe } from '@/shared/icons';

import { BreadcrumbLink, Breadcrumbs, BreadcrumbText } from '@/shared/ui/Breadcrumbs';
import { Text } from '@/shared/ui/Text';
import { Order } from '@/shared/icons/Order';

const Account = () => {
    return (
        <AuthWrapper>
            <Breadcrumbs>
                <BreadcrumbLink href="/">
                    <Home />
                </BreadcrumbLink>

                <ArrowRightShort />

                <BreadcrumbText>Личный кабинет</BreadcrumbText>
            </Breadcrumbs>

            <div className={styles.account}>
                <div className={base.container}>
                    <div className={styles.accountInner}>
                        <Text variant="h2" upper>
                            Личный кабинет
                        </Text>

                        <div className={styles.cabinetContent}>
                            <Link href="/account/profile" className={styles.cabinetLink}>
                                <Safe />
                                <span>Ваш профиль</span>
                                Тут можно изменить ваши личные данные и адреса доставки
                            </Link>

                            <Link href="/account/orders" className={styles.cabinetLink}>
                                <Order />
                                <span>Ваши заказы</span>
                                Тут можно посмотреть заказы и заменить блюда при желании
                            </Link>

                            <Link href="/account/safe" className={styles.cabinetLink}>
                                <Safe />
                                <span>Финансы и безопасность</span>
                                Тут можно изменить ваши личные данные и адреса доставки
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthWrapper>
    );
};

export default Account;
