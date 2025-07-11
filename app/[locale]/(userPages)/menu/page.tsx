'use client';

import React from 'react';
import cn from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from 'antd';
import { useTranslations } from 'next-intl';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Element } from 'react-scroll';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ArrowRight, Date as DateIcon } from '@/shared/icons';
import { Banner } from '@/widgets/Banner';
import { Team } from '../ui/Team';
import { Reviews } from '../ui/Reviews';
import { Delivery } from '../ui/Delivery';
import { useAdminSettings } from '@/features/admin';
// import { useAppSelector } from '@/shared/hooks/useRedux';
import { usePersonal } from '@/features/personal';
import IndiOrderModal from './IndiOrderModal';
import DishIndiItem from './DishIndiItem';
import { Dish } from '@/entities/dish';

import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';

const MenuPage = () => {
    const [dateDelivery, setDateDelivery] = React.useState('');
    const [dateDeliveryPicker, setDateDeliveryPicker] = React.useState(false);
    const [deliveryModal, setDeliveryModal] = React.useState(false);
    const [orderModal, setOrderModal] = React.useState(false);
    const [orderSuccessModal, setOrderSuccessModal] = React.useState(false);
    // const [activeDishTypeId, setActiveDishTypeId] = React.useState<number | null>(null);

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

    // const language = useAppSelector((state) => state.app.language);
    // const { getDishTypes } = useAdminDish();
    const { getDishesIndi } = usePersonal();
    const { getSettings } = useAdminSettings();

    // const {
    //     data: dishtypes,
    //     isPending: dishtypesIsPending,
    //     isError: dishtypesIsError,
    // } = useQuery({
    //     queryKey: ['dish_types'],
    //     queryFn: getDishTypes,
    // });

    const { data, isLoading, isError } = useQuery({
        queryKey: ['indi_foods', dateDelivery],
        queryFn: () => getDishesIndi(dateDelivery, ''),
        // enabled: !!activeDishTypeId,
        placeholderData: keepPreviousData,
        enabled: !!dateDelivery,
    });

    const { data: settings } = useQuery({
        queryKey: ['settings'],
        queryFn: () => getSettings(),
    });

    const { cycleStartDate } = settings || {};

    const disabledDate = React.useCallback(
        (current: Dayjs) => {
            if (!current) return false;

            const startDate = dayjs(cycleStartDate);

            const today = dayjs().startOf('day');
            const diff = current.diff(startDate, 'day');

            return current.isBefore(today, 'day') || current.isSame(today, 'day') || (diff >= 0 && diff % 2 === 0);
        },
        [cycleStartDate],
    );

    const t = useTranslations('Menu');

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.dish.price * item.quantity, 0);
    };

    // React.useEffect(() => {
    //     if (!!dishtypes) {
    //         setActiveDishTypeId(dishtypes[0].id);
    //     }
    // }, [dishtypes]);

    return (
        <>
            <Element name="menu">
                <section className={styles.complex}>
                    <div className={base.container}>
                        <div className={styles.complexInner}>
                            <div className={styles.complexWrp}>
                                <div className={styles.foodTextInner}>
                                    <p className={styles.foodTextTitle}>{t('personal_title')}</p>

                                    <p className={styles.foodTextText}>{t('personal_text')}</p>
                                </div>

                                <div className={styles.foodForm}>
                                    <div className={styles.foodFormItem}>
                                        <div className={styles.foodFormItemName}>
                                            <p className={styles.foodFormItemNameText}>{t('date2')}</p>

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
                                                    onChange={(date) => {
                                                        setDateDelivery(date.format('YYYY-MM-DD'));
                                                        setCart([]);
                                                    }}
                                                    open={dateDeliveryPicker}
                                                    onOpenChange={(isOpen) => setDateDeliveryPicker(isOpen)}
                                                />
                                            </div>

                                            {dateDelivery ? (
                                                <p className={styles.foodFormDateText}>
                                                    {t('date_text')}{' '}
                                                    <span className={styles.orderDate}>
                                                        {dayjs(dateDelivery).format('DD.MM.YYYY')}
                                                    </span>
                                                </p>
                                            ) : (
                                                <p className={styles.foodFormDateTextRed}>{t('choose_date')}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* {dishtypesIsPending ? (
                                        <Preloader small offIndent page />
                                    ) : dishtypesIsError ? (
                                        <NotContent />
                                    ) : (
                                        <div className={styles.foodFormItem}>
                                            <div className={styles.foodFormItemName}>
                                                <p className={styles.foodFormItemNameText}>{t('dish_type')}</p>
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
                                    )} */}
                                </div>

                                {isLoading ? (
                                    <Preloader page small />
                                ) : isError ? (
                                    <NotContent />
                                ) : !!data && !!data.length ? (
                                    <div className={styles.personalDishes}>
                                        {data.map((dish) => (
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
                                    <NotContent text={t('dish_empty')} />
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </Element>

            <section
                className={cn(styles.cart, {
                    [styles.active]: !!cart.length && !!dateDelivery,
                })}
            >
                <div className={base.container}>
                    <div className={styles.cartInner}>
                        <div className={styles.cartPriceInner}>
                            <div className={styles.cartPriceWrap}>
                                <p className={styles.cartPrice}>
                                    {t('total')} {getTotalPrice()} ₪
                                </p>
                            </div>

                            <Button className={styles.cartButton} onClick={() => setOrderModal(true)}>
                                {t('order_button')} <span className={styles.orderPrice}>{getTotalPrice()}</span> ₪
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
                    setOrderSuccessModal(true);
                }}
                cart={cart}
            />

            <Banner />

            <Team />

            <Reviews />

            <Delivery />

            <Modal value={orderSuccessModal} setValue={setOrderSuccessModal}>
                <>
                    <Text variant="h3" upper className={styles.modalDeliveryTitle}>
                        {t('success_title')}
                    </Text>

                    <div className={styles.modalDeliveryTextInner}>
                        <p className={styles.modalDeliveryText}>{t('success_text')}</p>
                    </div>
                </>
            </Modal>
        </>
    );
};

export default MenuPage;
