'use client';

import React from 'react';
import cn from 'classnames';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';

import 'swiper/css';

import styles from '../../index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { Day } from '@/entities/order';
import { ArrowRightShort, Home } from '@/shared/icons';
import { AuthWrapper } from '@/shared/wrappers/InitialWrapper';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { useOrder } from '@/features/order';
import DayButton from './DayButton';
import DishItem from './DishItem';

import { Text } from '@/shared/ui/Text';
import { BreadcrumbLink, Breadcrumbs, BreadcrumbText } from '@/shared/ui/Breadcrumbs';
import { BackLink } from '@/shared/ui/BackLink';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';

const UserOrderSwaps = () => {
    const swiperIntance = React.useRef<SwiperClass | null>(null);
    const [activeDate, setActiveDate] = React.useState<Day | null>(null);

    const { id } = useParams();
    const t = useTranslations('Orders');
    const language = useAppSelector((state) => state.app.language);

    const { getOrderDays, getDayDishes } = useOrder();

    const {
        data: days,
        isPending: daysIsPending,
        isError: daysIsError,
    } = useQuery({
        queryKey: ['user_order_days_by_id', id],
        queryFn: () => getOrderDays(String(id)),
        enabled: !!id,
    });

    const {
        data: dishes,
        isLoading: dishesIsPending,
        isError: dishesIsError,
    } = useQuery({
        queryKey: ['user_order_dishes_by_day', activeDate?.id],
        queryFn: () => getDayDishes(String(activeDate?.id)),
        enabled: !!activeDate?.id,
    });

    const today = dayjs().startOf('day');

    React.useEffect(() => {
        if (days && !!days.length) {
            let activeDay: Day | null = null;

            const sortedDays = [...days].sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));

            for (const day of sortedDays) {
                const isToday = dayjs(day.date).startOf('day').isSame(today);
                const isFuture = dayjs(day.date).startOf('day').isAfter(today);

                if (!day.isSkipped) {
                    if (isToday || (!activeDay && isFuture)) {
                        activeDay = day;
                        break;
                    }
                }
            }

            if (activeDay) {
                setActiveDate(activeDay);
            }
        }
    }, [days]);

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
                                    {t('conf_title')}
                                </Text>

                                <p className={styles.configText}>
                                    {t('conf_text')} <span>{t('conf_highlight')}</span>
                                </p>
                            </div>

                            {daysIsPending ? (
                                <Preloader page small />
                            ) : daysIsError ? (
                                <NotContent />
                            ) : (
                                <div className={styles.swapDateInner}>
                                    <p className={styles.swapDateTitle}>{t('swaps')}</p>

                                    <div className={styles.swapDateButtons}>
                                        <button
                                            className={cn(styles.swapDateButton, styles.arrow)}
                                            onClick={() => swiperIntance.current?.slidePrev()}
                                        >
                                            <svg
                                                width="25"
                                                height="24"
                                                viewBox="0 0 25 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M19.75 12H5.75M5.75 12L12.75 19M5.75 12L12.75 5"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>

                                        <Swiper
                                            spaceBetween={16}
                                            slidesPerView={6}
                                            className={styles.swapDaysSlider}
                                            onSwiper={(swiper) => {
                                                swiperIntance.current = swiper;
                                            }}
                                            breakpoints={{
                                                0: {
                                                    slidesPerView: 2,
                                                    spaceBetween: 8,
                                                },
                                                420: {
                                                    slidesPerView: 3,
                                                    spaceBetween: 8,
                                                },
                                                768: {
                                                    slidesPerView: 4,
                                                    spaceBetween: 16,
                                                },
                                                1270: {
                                                    slidesPerView: 5,
                                                    spaceBetween: 16,
                                                },
                                                1630: {
                                                    slidesPerView: 6,
                                                    spaceBetween: 16,
                                                },
                                            }}
                                        >
                                            {!!days &&
                                                days.map((day) => (
                                                    <SwiperSlide key={day.id}>
                                                        <DayButton
                                                            data={day}
                                                            isActive={activeDate?.id === day.id}
                                                            onClick={() => setActiveDate(day)}
                                                        />
                                                    </SwiperSlide>
                                                ))}
                                        </Swiper>

                                        <button
                                            className={cn(styles.swapDateButton, styles.arrow)}
                                            onClick={() => swiperIntance.current?.slideNext()}
                                        >
                                            <svg
                                                width="25"
                                                height="24"
                                                viewBox="0 0 25 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M4.25 12H20.25M20.25 12L14.25 6M20.25 12L14.25 18"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {dishesIsPending ? (
                                <Preloader page small />
                            ) : dishesIsError ? (
                                <NotContent />
                            ) : !!dishes && !!dishes.dishes ? (
                                <div className={styles.swapItems}>
                                    {dishes.dishes.map((dish) => (
                                        <DishItem key={dish.id} data={dish} dayId={activeDate?.id} day={activeDate} />
                                    ))}

                                    <div className={styles.dishTotal}>
                                        <Text fontWeight={600} upper>
                                            {t('total')}
                                        </Text>

                                        <div className={styles.dishTotalPoints}>
                                            <p>{t('ccals')} {dishes.total.calories}</p>
                                            <p>{t('bel')} {dishes.total.proteins}</p>
                                            <p>{t('fat')} {dishes.total.fats}</p>
                                            <p>{t('ugl')} {dishes.total.carbohydrates}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <NotContent text="Блюда не найдены" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthWrapper>
    );
};

export default UserOrderSwaps;
