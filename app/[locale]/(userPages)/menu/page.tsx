'use client';

import React from 'react';
import cn from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from 'antd';
import { useTranslations } from 'next-intl';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { DATE_OF_DELIVERY } from '@/shared/consts/DATE_OF_DELIVERY';
import { ArrowRight, Date as DateIcon } from '@/shared/icons';
import { Banner } from '@/widgets/Banner';
import { Team } from '../ui/Team';
import { Reviews } from '../ui/Reviews';
import { Delivery } from '../ui/Delivery';
import { useAdminDish } from '@/features/admin';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { usePersonal } from '@/features/personal';
import IndiOrderModal from './IndiOrderModal';
import DishIndiItem from './DishIndiItem';
import { Dish } from '@/entities/dish';

import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';

const startDate = dayjs(DATE_OF_DELIVERY);
const disabledDate = (current: Dayjs) => {
    if (!current) return false;

    const today = dayjs().startOf('day');
    const diff = current.diff(startDate, 'day');

    return current.isBefore(today, 'day') || (diff >= 0 && diff % 2 === 1);
};

const MenuPage = () => {
    const [page, setPage] = React.useState(1);
    const [dateDelivery, setDateDelivery] = React.useState('');
    const [dateDeliveryPicker, setDateDeliveryPicker] = React.useState(false);
    const [deliveryModal, setDeliveryModal] = React.useState(false);
    const [orderModal, setOrderModal] = React.useState(false);
    const [activeDishTypeId, setActiveDishTypeId] = React.useState<number | null>(null);

    const [cart, setCart] = React.useState<{ quantity: number; dish: Dish }[]>([]);

    const addToCart = (dish: Dish) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.dish.id === dish.id);

            if (existingItem) {
                return prevCart.map((item) =>
                    item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item,
                );
            }

            return [...prevCart, { dish, quantity: 1 }];
        });
    };

    const incrementQuantity = (id: number) => {
        setCart((prevCart) =>
            prevCart.map((item) => (item.dish.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
        );
    };

    const decrementQuantity = (id: number) => {
        setCart((prevCart) => {
            return prevCart
                .map((item) => (item.dish.id === id ? { ...item, quantity: item.quantity - 1 } : item))
                .filter((item) => item.quantity > 0);
        });
    };

    const language = useAppSelector((state) => state.app.language);
    const { getDishTypes } = useAdminDish();
    const { getDishesIndi } = usePersonal();

    const {
        data: dishtypes,
        isPending: dishtypesIsPending,
        isError: dishtypesIsError,
    } = useQuery({
        queryKey: ['dish_types'],
        queryFn: getDishTypes,
    });

    const { data, isLoading, isError } = useQuery({
        queryKey: ['indi_foods', page, activeDishTypeId],
        queryFn: () => getDishesIndi(page, 15, '', activeDishTypeId ? activeDishTypeId : ''),
        enabled: !!activeDishTypeId,
        placeholderData: keepPreviousData,
    });

    const t = useTranslations('Menu');

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.dish.price * item.quantity, 0);
    };

    React.useEffect(() => {
        if (!!dishtypes) {
            setActiveDishTypeId(dishtypes[0].id);
        }
    }, [dishtypes]);

    return (
        <>
            <section className={styles.complex}>
                <div className={base.container}>
                    <div className={styles.complexInner}>
                        <div className={styles.complexWrp}>
                            <div className={styles.foodTextInner}>
                                <p className={styles.foodTextTitle}>
                                    Свобода выбора: Создайте свой идеальный набор блюд
                                </p>

                                <p className={styles.foodTextText}>
                                    Эта программа для тех, кто хочет питаться правильно и устал от фастфуда. Выберите
                                    любые блюда на свой вкус из нашего меню и составьте свой идеальный заказ.
                                    Минимальная сумма — 200 шекелей, а вы получаете только то, что действительно хотите,
                                    без лишних компромиссов
                                </p>
                            </div>

                            <div className={styles.foodForm}>
                                <div className={styles.foodFormItem}>
                                    <div className={styles.foodFormItemName}>
                                        <p className={styles.foodFormItemNameText}>Когда привезти</p>

                                        <button
                                            className={styles.foodFormButton}
                                            onClick={() => setDeliveryModal(true)}
                                        >
                                            {t('delivery_cond')}
                                        </button>
                                    </div>

                                    <div className={styles.foodFormItemDate}>
                                        <div className={styles.foodFormItemDateButtonInner}>
                                            <button
                                                className={styles.foodFormItemDateButton}
                                                onClick={() => setDateDeliveryPicker(true)}
                                            >
                                                <DateIcon />
                                                {t('choose_date')}
                                            </button>

                                            <DatePicker
                                                className={styles.modalCalendar}
                                                disabledDate={disabledDate}
                                                format={'DD.MM.YYYY'}
                                                value={dateDelivery ? dayjs(dateDelivery) : null}
                                                onChange={(date) => setDateDelivery(date.format('YYYY-MM-DD'))}
                                                open={dateDeliveryPicker}
                                                onOpenChange={(isOpen) => setDateDeliveryPicker(isOpen)}
                                            />
                                        </div>

                                        {dateDelivery && (
                                            <p className={styles.foodFormDateText}>
                                                {t('date_text')}{' '}
                                                <span className={styles.orderDate}>
                                                    {dayjs(dateDelivery).format('DD.MM.YYYY')}
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {dishtypesIsPending ? (
                                    <Preloader small offIndent page />
                                ) : dishtypesIsError ? (
                                    <NotContent />
                                ) : (
                                    <div className={styles.foodFormItem}>
                                        <div className={styles.foodFormItemName}>
                                            <p className={styles.foodFormItemNameText}>Выберите тип блюда:</p>
                                        </div>

                                        {!!dishtypes && (
                                            <div className={cn(styles.foodFormItemContent, styles.big)}>
                                                {dishtypes.map((type) => (
                                                    <button
                                                        key={type.id}
                                                        className={cn(styles.foodFormChoose, {
                                                            [styles.active]: activeDishTypeId === type.id,
                                                        })}
                                                        onClick={() => setActiveDishTypeId(type.id)}
                                                    >
                                                        {type.name[language]}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {isLoading ? (
                                <Preloader page small />
                            ) : isError ? (
                                <NotContent />
                            ) : !!data && !!data.dishes && !!data.dishes.length ? (
                                <div className={styles.personalDishes}>
                                    {data.dishes.map((dish) => (
                                        <DishIndiItem
                                            key={dish.id}
                                            data={dish}
                                            cart={cart}
                                            addToCart={() => addToCart(dish)}
                                            incrementQuantity={() => incrementQuantity(dish.id)}
                                            decrementQuantity={() => decrementQuantity(dish.id)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <NotContent text="Блюд не найдено" />
                            )}

                            {!!data && data.totalPages > 1 && (
                                <div className={styles.pagination}>
                                    {[...Array(data.totalPages)].map((_, id) => (
                                        <button
                                            key={id}
                                            className={cn(styles.paginationButton, {
                                                [styles.active]: id + 1 === data.page,
                                            })}
                                            onClick={() => setPage(id + 1)}
                                        >
                                            {id + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section
                className={cn(styles.cart, {
                    [styles.active]: !!cart.length && !!dateDelivery,
                })}
            >
                <div className={base.container}>
                    <div className={styles.cartInner}>
                        <div className={styles.cartTitleInner}>
                            <p className={styles.cartTitle}>Cкидка! не упускай возможность</p>

                            <p className={styles.cartText}>
                                Закажи скорее
                                {/* <span>(Какой-то подтекст)</span> */}
                            </p>
                        </div>

                        <div className={styles.cartPriceInner}>
                            {/* <div className={styles.cartPriceWrap}>
                                <p className={styles.cartPriceOld}>345 ₪</p>

                                <p className={styles.cartPrice}>Итого: 200 ₪</p>
                            </div> */}

                            <Button className={styles.cartButton} onClick={() => setOrderModal(true)}>
                                Оформить заказ за <span className={styles.orderPrice}>{getTotalPrice()}</span> ₪
                                <ArrowRight />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Modal value={deliveryModal} setValue={setDeliveryModal}>
                <>
                    <Text variant="h3" upper className={styles.modalDeliveryTitle}>
                        {t('delivery_cond')}
                    </Text>

                    <div className={styles.modalDeliveryTextInner}>
                        <p className={styles.modalDeliveryText}>{t('delivery_cond_text1')}</p>

                        <p className={styles.modalDeliveryText}>{t('delivery_cond_text2')}</p>

                        <p className={styles.modalDeliveryText}>{t('delivery_cond_text3')}</p>

                        <p className={styles.modalDeliveryText}>{t('delivery_cond_text4')}</p>
                    </div>
                </>
            </Modal>

            <IndiOrderModal
                value={orderModal}
                setValue={setOrderModal}
                dateDelivery={dateDelivery}
                resetOrder={() => {
                    setCart([]);
                    setDateDelivery('');
                }}
                cart={cart}
            />

            <Banner />

            <Team />

            <Reviews />

            <Delivery />
        </>
    );
};

export default MenuPage;
