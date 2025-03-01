'use client';

import React from 'react';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import styles from '../index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ArrowRightShort, Home } from '@/shared/icons';
import { useOrder } from '@/features/order';
import { AuthWrapper } from '@/shared/wrappers/InitialWrapper';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { getScheduleLabel } from '@/shared/utils/getSheduleLabel';

import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { BreadcrumbLink, Breadcrumbs, BreadcrumbText } from '@/shared/ui/Breadcrumbs';
import { Text } from '@/shared/ui/Text';
import { BackLink } from '@/shared/ui/BackLink';
import { ORDER_CHANGE_TYPES } from '@/entities/order';
import { Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';

const UserOrderPage = () => {
    const { id } = useParams();

    const [changeModal, setChangeModal] = React.useState(false);
    const [changeType, setChangeType] = React.useState<ORDER_CHANGE_TYPES>('MENU');
    const [comment, setComment] = React.useState('');
    const { getUserOrderById, createOrderRequest } = useOrder();
    const t = useTranslations('Orders');
    const language = useAppSelector((state) => state.app.language);

    const { data, isPending, isError } = useQuery({
        queryKey: ['user_order_by_id', id],
        queryFn: () => getUserOrderById(String(id)),
        enabled: !!id,
    });

    const createRequestHandler = () => {
        createOrderRequest(String(id), changeType, comment, () => {
            setComment('');
            setChangeModal(false);
        });
    };

    const { daysCount, endDate, startDate, menu, skippedWeekdays, allergies, isIndividual } = data || {};

    if (isPending) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent />;
    }

    return (
        <AuthWrapper>
            <Breadcrumbs>
                <BreadcrumbLink href={`/${language}`}>
                    <Home />
                </BreadcrumbLink>

                <ArrowRightShort />

                <BreadcrumbLink href={`/${language}/account`}>{t('account')}</BreadcrumbLink>

                <ArrowRightShort />

                <BreadcrumbText>{t('title')}</BreadcrumbText>
            </Breadcrumbs>

            <div className={styles.orders}>
                <div className={base.container}>
                    <div className={styles.ordersInner}>
                        <Text variant="h2" upper>
                            {t('title2')}
                        </Text>

                        <BackLink href={`/${language}/account`} text={t('back_text')} />

                        <div className={styles.configContent}>
                            <div className={styles.configTextInner}>
                                <Text upper variant="h3">
                                    Конфигурация рациона
                                </Text>

                                <p className={styles.configText}>
                                    Наше меню разработано профессиональными диетологами, приготовлено только из
                                    натуральных продуктов и рассчитано на каждого человека под его цели.{' '}
                                    <span>Худеть вкусно – легко!</span>
                                </p>
                            </div>

                            <div className={styles.configItems}>
                                {!isIndividual && (
                                    <div className={styles.configItem}>
                                        <p className={styles.configItemSuptext}>Рацион</p>

                                        <p className={styles.configItemTitle}>{menu?.name[language]}</p>

                                        <button
                                            className={styles.configItemButton}
                                            onClick={() => {
                                                setChangeModal(true);
                                                setChangeType('MENU');
                                            }}
                                        >
                                            Запросить изменить
                                        </button>
                                    </div>
                                )}

                                {!isIndividual && (
                                    <div className={styles.configItem}>
                                        <p className={styles.configItemSuptext}>Калорийность, ККал</p>

                                        <p className={styles.configItemTitle}>{menu?.calories}</p>

                                        <button
                                            className={styles.configItemButton}
                                            onClick={() => {
                                                setChangeModal(true);
                                                setChangeType('CALORIES');
                                            }}
                                        >
                                            Запросить изменить
                                        </button>
                                    </div>
                                )}

                                <div className={styles.configItem}>
                                    <p className={styles.configItemSuptext}>Длительность</p>

                                    <p className={styles.configItemTitle}>{daysCount} дней</p>

                                    {!isIndividual && (
                                        <button
                                            className={styles.configItemButton}
                                            onClick={() => {
                                                setChangeModal(true);
                                                setChangeType('DURATION');
                                            }}
                                        >
                                            Запросить изменить
                                        </button>
                                    )}
                                </div>

                                <div className={styles.configItem}>
                                    <p className={styles.configItemSuptext}>Доставка</p>

                                    <p className={styles.configItemTitle}>
                                        {!isIndividual && 'Начало доставки'} {dayjs(startDate).format('DD.MM.YYYY')}
                                    </p>
                                </div>

                                {!isIndividual && (
                                    <div className={styles.configItem}>
                                        <p className={styles.configItemSuptext}>Доставка</p>

                                        <p className={styles.configItemTitle}>
                                            Дата окончания {dayjs(endDate).format('DD.MM.YYYY')}
                                        </p>
                                    </div>
                                )}

                                <div className={styles.configItem}>
                                    <p className={styles.configItemSuptext}>Формат питания</p>

                                    <p className={styles.configItemTitle}>{getScheduleLabel(skippedWeekdays)}</p>

                                    {!isIndividual && (
                                        <button
                                            className={styles.configItemButton}
                                            onClick={() => {
                                                setChangeModal(true);
                                                setChangeType('FORMAT');
                                            }}
                                        >
                                            Запросить изменить
                                        </button>
                                    )}
                                </div>

                                <div className={styles.configItem}>
                                    <p className={styles.configItemSuptext}>Аллергии</p>

                                    <p className={styles.configItemTitle}>{allergies ? allergies : '-'}</p>

                                    {!isIndividual && (
                                        <button
                                            className={styles.configItemButton}
                                            onClick={() => {
                                                setChangeModal(true);
                                                setChangeType('OTHER');
                                            }}
                                        >
                                            Запросить изменить
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal value={changeModal} setValue={setChangeModal}>
                <Text upper fontWeight={600}>
                    Запрос изменения заказа
                </Text>

                <div className={styles.changeModal}>
                    <Input value={comment} setValue={setComment} component="textarea" full title="Комментарий" />

                    <Button full small onClick={createRequestHandler}>
                        Отправить
                    </Button>
                </div>
            </Modal>
        </AuthWrapper>
    );
};

export default UserOrderPage;
