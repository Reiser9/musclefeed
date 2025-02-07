'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { AuthWrapper } from '@/shared/wrappers/InitialWrapper';
import { ArrowRight, ArrowRightShort, Check, Delete, Home, Home2, Mail, Map, Pen, Phone, User } from '@/shared/icons';

import { BreadcrumbLink, Breadcrumbs, BreadcrumbText } from '@/shared/ui/Breadcrumbs';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Check2 } from '@/shared/icons/Check2';
import { Select } from '@/shared/ui/Select';
import { BackLink } from '@/shared/ui/BackLink';

const AccountProfile = () => {
    const [name, setName] = React.useState('');

    return (
        <AuthWrapper>
            <Breadcrumbs>
                <BreadcrumbLink href="/">
                    <Home />
                </BreadcrumbLink>

                <ArrowRightShort />

                <BreadcrumbLink href="/account">Личный кабинет</BreadcrumbLink>

                <ArrowRightShort />

                <BreadcrumbText>Профиль</BreadcrumbText>
            </Breadcrumbs>

            <div className={styles.profile}>
                <div className={base.container}>
                    <div className={styles.profileInner}>
                        <Text variant="h2" upper>
                            Ваш профиль
                        </Text>

                        <BackLink href="/account" text="Назад в Личный кабинет"></BackLink>

                        <div className={styles.profileContent}>
                            <div className={styles.profileSidebar}>
                                <Text variant="h3" upper color="main">
                                    Контактные данные
                                </Text>

                                <div className={styles.profileForm}>
                                    <Input value={name} setValue={setName} title="Как вас зовут" icon={<User />} full />
                                    <Input value={name} setValue={setName} title="Ваша фамилия" icon={<User />} full />
                                    <Input value={name} setValue={setName} title="Ваш телефон" icon={<Phone />} full />
                                    <Input value={name} setValue={setName} title="Ваша почта" icon={<Mail />} full />
                                </div>

                                <Button full>
                                    Сохранить изменения
                                    <ArrowRight />
                                </Button>
                            </div>

                            <div className={styles.profileWrapper}>
                                <Text variant="h3" upper color="main">
                                    Адреса доставки
                                </Text>

                                <div className={styles.profileMain}>
                                    <Text>Основной адрес</Text>

                                    <div className={styles.profileAddress}>
                                        <Check2 />
                                        Хайфа, ул. имени 1750 летия взятия Моссады, дом 15 кв. 25, вход со двора
                                    </div>
                                </div>

                                <div className={styles.profileAddresses}>
                                    <Text>Другие адреса</Text>

                                    <div className={styles.profileAddressesInner}>
                                        <div className={styles.profileAddressItem}>
                                            <p className={styles.profileAddressName}>
                                                Хайфа, ул. имени 1750 летия взятия Моссады, дом 15 кв. 25, вход со двора
                                            </p>

                                            <div className={styles.profileAddressButtons}>
                                                <button className={cn(styles.profileAddressButton, styles.disabled)}>
                                                    <Check />
                                                </button>

                                                <button className={styles.profileAddressButton}>
                                                    <Pen />
                                                </button>

                                                <button className={cn(styles.profileAddressButton, styles.danger)}>
                                                    <Delete />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.addAddressForm}>
                                        <Select title="Город" icon={<Map />} options={['Москва', 'Питер']} />
                                        <Input
                                            title="Улица"
                                            icon={<Map />}
                                            placeholder="Выберите или начните вводить"
                                        />
                                        <Input title="Дом" icon={<Home2 />} placeholder="Номер дома" />
                                        <Input title="Этаж" icon={<Map />} placeholder="Этаж" />
                                        <Input title="Квартира" icon={<Map />} placeholder="Квартира" />
                                    </div>

                                    <Button full>
                                        Сохранить новый адрес
                                        <ArrowRight />
                                    </Button>

                                    <Button full>
                                        Добавить адрес
                                        <ArrowRight />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthWrapper>
    );
};

export default AccountProfile;
