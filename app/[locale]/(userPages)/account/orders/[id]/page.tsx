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
import { ORDER_CHANGE_TYPES } from '@/entities/order';

import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { BreadcrumbLink, Breadcrumbs, BreadcrumbText } from '@/shared/ui/Breadcrumbs';
import { Text } from '@/shared/ui/Text';
import { BackLink } from '@/shared/ui/BackLink';
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
        createOrderRequest(language, String(id), changeType, comment, () => {
            setComment('');
            setChangeModal(false);
        });
    };

    const {
        daysCount,
        endDate,
        startDate,
        menu,
        skippedWeekdays,
        allergies,
        isIndividual,
        giftDaysCount,
        price,
        finalPrice,
        paidAmount,
        promocodeDiscount,
        menuDiscount,
    } = data || {};

    const { menuType } = menu || {};

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

                        <BackLink href={`/${language}/account/orders`} text={t('back_orders')} />

                        <div className={styles.configContent}>
                            <div className={styles.configTextInner}>
                                <Text upper variant="h3">
                                    {t('conf_title')}
                                </Text>

                                <p className={styles.configText}>
                                    {t('conf_text')} <span>{t('conf_highlight')}</span>
                                </p>
                            </div>

                            <div className={styles.configItems}>
                                {!isIndividual && (
                                    <div className={styles.configItem}>
                                        <p className={styles.configItemSuptext}>{t('racion')}</p>

                                        <p className={styles.configItemTitle}>{menuType?.name[language]}</p>

                                        <button
                                            className={styles.configItemButton}
                                            onClick={() => {
                                                setChangeModal(true);
                                                setChangeType('MENU');
                                            }}
                                        >
                                            {t('request_button')}
                                        </button>
                                    </div>
                                )}

                                {!isIndividual && (
                                    <div className={styles.configItem}>
                                        <p className={styles.configItemSuptext}>{t('ccal')}</p>

                                        <p className={styles.configItemTitle}>{menu?.calories}</p>

                                        <button
                                            className={styles.configItemButton}
                                            onClick={() => {
                                                setChangeModal(true);
                                                setChangeType('CALORIES');
                                            }}
                                        >
                                            {t('request_button')}
                                        </button>
                                    </div>
                                )}

                                <div className={styles.configItem}>
                                    <p className={styles.configItemSuptext}>{t('duration')}</p>

                                    <p className={styles.configItemTitle}>
                                        {t('duration_days', { days: daysCount })}{' '}
                                        {!!giftDaysCount && <span>+ {giftDaysCount} дня</span>}
                                    </p>

                                    {!isIndividual && (
                                        <button
                                            className={styles.configItemButton}
                                            onClick={() => {
                                                setChangeModal(true);
                                                setChangeType('DURATION');
                                            }}
                                        >
                                            {t('request_button')}
                                        </button>
                                    )}
                                </div>

                                <div className={styles.configItem}>
                                    <p className={styles.configItemSuptext}>{t('delivery')}</p>

                                    <p className={styles.configItemTitle}>
                                        {!isIndividual && (language === 'ru' ? 'Начало доставки' : 'תחילת המשלוח')}{' '}
                                        {dayjs(startDate).format('DD.MM.YYYY')}
                                    </p>
                                </div>

                                {!isIndividual && (
                                    <div className={styles.configItem}>
                                        <p className={styles.configItemSuptext}>{t('delivery')}</p>

                                        <p className={styles.configItemTitle}>
                                            {language === 'ru' ? 'Дата окончания' : 'תאריך סיום'}{' '}
                                            {dayjs(endDate).format('DD.MM.YYYY')}
                                        </p>
                                    </div>
                                )}

                                <div className={styles.configItem}>
                                    <p className={styles.configItemSuptext}>{t('format')}</p>

                                    <p className={styles.configItemTitle}>
                                        {getScheduleLabel(skippedWeekdays, language)}
                                    </p>

                                    {!isIndividual && (
                                        <button
                                            className={styles.configItemButton}
                                            onClick={() => {
                                                setChangeModal(true);
                                                setChangeType('FORMAT');
                                            }}
                                        >
                                            {t('request_button')}
                                        </button>
                                    )}
                                </div>

                                <div className={styles.configItem}>
                                    <p className={styles.configItemSuptext}>{t('allergi')}</p>

                                    <p className={styles.configItemTitle}>{allergies ? allergies : '-'}</p>

                                    {!isIndividual && (
                                        <button
                                            className={styles.configItemButton}
                                            onClick={() => {
                                                setChangeModal(true);
                                                setChangeType('OTHER');
                                            }}
                                        >
                                            {t('request_button')}
                                        </button>
                                    )}
                                </div>

                                <div className={styles.configItem}>
                                    <p className={styles.configItemSuptext}>{t('price')}</p>

                                    <p className={styles.configItemTitle}>{price ? price : '-'}</p>
                                </div>

                                <div className={styles.configItem}>
                                    <p className={styles.configItemSuptext}>{t('paidAmount')}</p>

                                    <p className={styles.configItemTitle}>{paidAmount ? paidAmount : '-'}</p>
                                </div>

                                <div className={styles.configItem}>
                                    <p className={styles.configItemSuptext}>{t('promocodeDiscount')}</p>

                                    <p className={styles.configItemTitle}>
                                        {promocodeDiscount ? promocodeDiscount : '-'}
                                    </p>
                                </div>

                                <div className={styles.configItem}>
                                    <p className={styles.configItemSuptext}>{t('menuDiscount')}</p>

                                    <p className={styles.configItemTitle}>{menuDiscount ? menuDiscount : '-'}</p>
                                </div>

                                <div className={styles.configItem}>
                                    <p className={styles.configItemSuptext}>{t('finalPrice')}</p>

                                    <p className={styles.configItemTitle}>{finalPrice ? finalPrice : '-'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal value={changeModal} setValue={setChangeModal}>
                <Text upper fontWeight={600}>
                    {t('request_title')}
                </Text>

                <div className={styles.changeModal}>
                    <Input
                        value={comment}
                        setValue={setComment}
                        component="textarea"
                        full
                        title={t('request_comment')}
                    />

                    <Button full small onClick={createRequestHandler}>
                        {t('send_request')}
                    </Button>
                </div>
            </Modal>
        </AuthWrapper>
    );
};

export default UserOrderPage;
