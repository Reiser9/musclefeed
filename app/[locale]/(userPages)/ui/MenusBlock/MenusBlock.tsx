'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { DatePicker } from 'antd';
import cn from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { useTranslations } from 'next-intl';
import { Element } from 'react-scroll';

import 'swiper/css';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import type { MenuType, MenuUser, PriceItem } from '@/entities/menu';
import { ArrowLeft, ArrowRight, Date as DateIcon } from '@/shared/icons';
import { DishItem } from '@/entities/dish/ui';
import { useMenu } from '@/features/menu';
import { useAppSelector } from '@/shared/hooks/useRedux';
import CalcCaloriesForm from './CalcCaloriesForm';
import { getDayDeclension } from '@/shared/utils/getDayDeclension';
import OrderModal from './OrderModal';
import { DATE_OF_DELIVERY } from '@/shared/consts/DATE_OF_DELIVERY';

import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { NotContent } from '@/shared/ui/NotContent';
import { Preloader } from '@/shared/ui/Preloader';
import { Text } from '@/shared/ui/Text';

const getNextWeek = (): { date: string; day: string; fullDate: string }[] => {
    const dates: { date: string; day: string; fullDate: string }[] = [];
    const today = new Date();
    const weekDays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

    for (let i = 1; i <= 7; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        dates.push({
            date: nextDay.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }),
            day: weekDays[nextDay.getDay()],
            fullDate: nextDay.toISOString().split('T')[0],
        });
    }

    return dates;
};

const startDate = dayjs(DATE_OF_DELIVERY);
const disabledDate = (current: Dayjs) => {
    if (!current) return false;

    const today = dayjs().startOf('day');
    const diff = current.diff(startDate, 'day');

    return current.isBefore(today, 'day') || (diff >= 0 && diff % 2 === 1);
};

const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];

const MenusBlock = () => {
    const swiperIntance = React.useRef<SwiperClass | null>(null);

    // Выбранный тип меню
    const [activeMenuTypeId, setActiveMenuTypeId] = React.useState<number | null>(null);
    const [currentMenuType, setCurrentMenuType] = React.useState<MenuType | null>(null);
    // Выбранное меню
    const [activeMenuId, setActiveMenuId] = React.useState<number | null>(null);
    const [currentMenu, setCurrentMenu] = React.useState<MenuUser | null>(null);
    // Выбранное кол-во дней
    const [activePrice, setActivePrice] = React.useState<PriceItem | null>(null);
    // Пропускаемые дни
    const [disabledDays, setDisabledDays] = React.useState<number[]>([6, 7]);
    // Дата начала доставки
    const [dateDelivery, setDateDelivery] = React.useState('');
    const [dateDeliveryPicker, setDateDeliveryPicker] = React.useState(false);
    const [deliveryModal, setDeliveryModal] = React.useState(false);

    const [swapDishTypeId, setSwapDishTypeId] = React.useState<number | null>(null);
    const [swapModal, setSwapModal] = React.useState(false);

    const [orderModal, setOrderModal] = React.useState(false);

    const [calcNormModal, setCalcNormModal] = React.useState(false);
    const [calcNorm, setCalcNorm] = React.useState(0);

    // Выбранный день недели
    const [selectedDay, setSelectedDay] = React.useState(tomorrow);

    const { getTypesmenuUser, getMenuUser, getMenuDishesUser, getSwapMenuDishesUser } = useMenu();
    const language = useAppSelector((state) => state.app.language);
    const t = useTranslations('Menu');

    const { data, isPending, isError } = useQuery({
        queryKey: ['typesmenu'],
        queryFn: getTypesmenuUser,
    });

    const chooseProgram = (menu: MenuUser) => {
        const { id, menuType } = menu || {};

        if (data) {
            const currentMenuType = data?.findIndex((el) => el.id === menuType.id);

            setActiveMenuTypeId(menuType.id);
            setCurrentMenuType(data[currentMenuType]);

            setTimeout(() => {
                setActiveMenuId(id);
                setCurrentMenu(menu);
            }, 300);

            setCalcNormModal(false);
        }
    };

    const {
        data: menus,
        isPending: menusIsPending,
        isError: menusIsError,
    } = useQuery({
        queryKey: ['menus', activeMenuTypeId],
        queryFn: () => getMenuUser(activeMenuTypeId),
        enabled: !!activeMenuTypeId,
    });

    const {
        data: dishes,
        isLoading: dishesIsLoading,
        isError: dishesIsError,
    } = useQuery({
        queryKey: ['menu_dishes', activeMenuId, selectedDay],
        queryFn: () => getMenuDishesUser(activeMenuId, selectedDay),
        enabled: !!activeMenuId,
        placeholderData: keepPreviousData,
    });

    const {
        data: swapDishes,
        isLoading: swapDishesIsLoading,
        isError: swapDishesIsError,
    } = useQuery({
        queryKey: ['menu_swap_dishes', activeMenuId, selectedDay, swapDishTypeId],
        queryFn: () => getSwapMenuDishesUser(activeMenuId, selectedDay, swapDishTypeId),
        enabled: !!activeMenuId && !!selectedDay && !!swapDishTypeId && swapModal,
    });

    const resetOrder = () => {
        setActiveMenuId(null);
        setDateDelivery('');
        setDisabledDays([6, 7]);
        setSelectedDay(tomorrow);
    };

    React.useEffect(() => {
        if (data && data.length) {
            setActiveMenuTypeId(data[0].id);
        }
    }, [data]);

    React.useEffect(() => {
        setActiveMenuId(null);
        setCurrentMenu(null);

        if (activeMenuTypeId && data) {
            const index = data.findIndex((el) => el.id === activeMenuTypeId);
            setCurrentMenuType(data[index]);
        }
    }, [activeMenuTypeId, data]);

    React.useEffect(() => {
        setActivePrice(null);

        if (activeMenuId && menus) {
            const index = menus.menus.findIndex((el) => el.id === activeMenuId);
            setCurrentMenu(menus.menus[index]);
        }
    }, [activeMenuId, menus]);

    if (isPending) {
        return <Preloader page small />;
    }

    if (isError) {
        return <NotContent />;
    }

    return (
        <>
            <Element name="menu">
                <section className={styles.complex}>
                    <div className={base.container}>
                        <div className={styles.complexInner}>
                            <h2 className={styles.complexTitle}>{t('title')}</h2>

                            {!!data && !!data.length ? (
                                <Swiper
                                    spaceBetween={24}
                                    slidesPerView={3}
                                    className={styles.complexSlider}
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 1.1,
                                            spaceBetween: 8,
                                        },
                                        480: {
                                            slidesPerView: 1.1,
                                            spaceBetween: 12,
                                        },
                                        768: {
                                            slidesPerView: 1.5,
                                            spaceBetween: 20,
                                        },
                                        1065: {
                                            slidesPerView: 2,
                                        },
                                        1270: {
                                            slidesPerView: 2.5,
                                        },
                                        1630: {
                                            slidesPerView: 3,
                                        },
                                    }}
                                >
                                    {data.map((type) => {
                                        const { id, name, shortDescription, backgroundPicture, initialPrice } =
                                            type || {};

                                        return (
                                            <SwiperSlide
                                                key={id}
                                                className={cn(styles.complexItem, {
                                                    [styles.active]: activeMenuTypeId === id,
                                                })}
                                                onClick={() => setActiveMenuTypeId(id)}
                                            >
                                                <div className={styles.complexTextInner}>
                                                    <p className={styles.complexTextTitle}>{name[language]}</p>

                                                    <p className={styles.complexTextText}>
                                                        {shortDescription[language]}
                                                    </p>

                                                    <p className={styles.complexTextPrice}>
                                                        от {initialPrice[language]} ₪
                                                    </p>
                                                </div>

                                                <div className="complexItemImg">
                                                    <Image src={backgroundPicture} alt={name[language]} fill />
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                            ) : (
                                <NotContent text="Типы меню еще не созданы" />
                            )}

                            {activeMenuTypeId && (
                                <div className={styles.complexWrp}>
                                    <div className={styles.foodTextInner}>
                                        <p className={styles.foodTextTitle}>{currentMenuType?.name[language]}</p>

                                        <p className={styles.foodTextText}>{currentMenuType?.description[language]}</p>
                                    </div>

                                    <div className={styles.foodForm}>
                                        {menusIsPending ? (
                                            <Preloader page small offIndent />
                                        ) : menusIsError ? (
                                            <NotContent />
                                        ) : (
                                            <div className={styles.foodFormItem}>
                                                <div className={styles.foodFormItemName}>
                                                    <p className={styles.foodFormItemNameText}>{t('program')}</p>

                                                    <button
                                                        className={styles.foodFormButton}
                                                        onClick={() => setCalcNormModal(true)}
                                                    >
                                                        {t('calc_norm')}
                                                    </button>
                                                </div>

                                                <div className={styles.foodFormItemContent}>
                                                    {menus &&
                                                        menus.menus.map((menu) => (
                                                            <button
                                                                key={menu.id}
                                                                className={cn(
                                                                    styles.foodFormChoose,
                                                                    styles.foodCalories,
                                                                    {
                                                                        [styles.active]: activeMenuId === menu.id,
                                                                    },
                                                                )}
                                                                onClick={() => setActiveMenuId(menu.id)}
                                                            >
                                                                {menu.name[language]}
                                                                <span className={styles.foodSign}>
                                                                    {menu.mealsCount[language]}
                                                                </span>
                                                            </button>
                                                        ))}
                                                </div>
                                            </div>
                                        )}

                                        {currentMenu && activeMenuId && (
                                            <div className={styles.foodFormItem}>
                                                <div className={styles.foodFormItemName}>
                                                    <p className={styles.foodFormItemNameText}>{t('program')}</p>
                                                </div>

                                                <div className={styles.foodFormItemContent}>
                                                    {currentMenu?.prices &&
                                                        currentMenu.prices.map((day) => (
                                                            <button
                                                                key={day.id}
                                                                className={cn(styles.foodFormChoose, {
                                                                    [styles.active]: day.id === activePrice?.id,
                                                                })}
                                                                onClick={() => setActivePrice(day)}
                                                            >
                                                                {day.daysCount} дней
                                                            </button>
                                                        ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className={styles.foodFormItem}>
                                            <div className={styles.foodFormItemName}>
                                                <p className={styles.foodFormItemNameText}>{t('format')}</p>
                                            </div>

                                            <div className={cn(styles.foodFormItemContent, styles.big)}>
                                                <button
                                                    className={cn(styles.foodFormChoose, {
                                                        [styles.active]:
                                                            disabledDays.length === 2 &&
                                                            disabledDays.includes(6) &&
                                                            disabledDays.includes(7),
                                                    })}
                                                    onClick={() => setDisabledDays([6, 7])}
                                                >
                                                    {t('format1')}
                                                </button>

                                                <button
                                                    className={cn(styles.foodFormChoose, {
                                                        [styles.active]:
                                                            disabledDays.length === 1 && disabledDays.includes(5),
                                                    })}
                                                    onClick={() => setDisabledDays([5])}
                                                >
                                                    {t('format2')}
                                                </button>

                                                <button
                                                    className={cn(styles.foodFormChoose, {
                                                        [styles.active]:
                                                            disabledDays.length === 2 &&
                                                            disabledDays.includes(5) &&
                                                            disabledDays.includes(6),
                                                    })}
                                                    onClick={() => setDisabledDays([5, 6])}
                                                >
                                                    {t('format3')}
                                                </button>
                                            </div>
                                        </div>

                                        <div className={styles.foodFormItem}>
                                            <div className={styles.foodFormItemName}>
                                                <p className={styles.foodFormItemNameText}>{t('date')}</p>

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

                                        {currentMenu && activeMenuId && (
                                            <div className={styles.foodFormItem}>
                                                <div className={styles.foodFormItemName}>
                                                    <p className={styles.foodFormItemNameText}>{t('example')}</p>
                                                </div>

                                                <div className={styles.foodFormItemContent}>
                                                    {getNextWeek().map((item, index) => (
                                                        <button
                                                            key={index}
                                                            className={cn(styles.foodFormChoose, {
                                                                [styles.active]: selectedDay === item.fullDate,
                                                            })}
                                                            onClick={() => setSelectedDay(item.fullDate)}
                                                        >
                                                            {item.day} {item.date}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {activeMenuId &&
                                        (dishesIsLoading ? (
                                            <Preloader small page />
                                        ) : dishesIsError ? (
                                            <NotContent />
                                        ) : !!dishes ? (
                                            <div className={styles.foodWrap}>
                                                <Swiper
                                                    slidesPerView={5}
                                                    breakpoints={{
                                                        0: {
                                                            slidesPerView: 1.5,
                                                        },
                                                        768: {
                                                            slidesPerView: 2,
                                                        },
                                                        1065: {
                                                            slidesPerView: 3,
                                                        },
                                                        1270: {
                                                            slidesPerView: 4,
                                                        },
                                                        1630: {
                                                            slidesPerView: 5,
                                                        },
                                                    }}
                                                    className={styles.foodContent}
                                                    onSwiper={(swiper) => {
                                                        swiperIntance.current = swiper;
                                                    }}
                                                >
                                                    {dishes.dishes.map((dish) => (
                                                        <SwiperSlide key={dish.id} className={styles.menuItemDishSlide}>
                                                            <DishItem
                                                                data={dish}
                                                                buttonCallback={() => {
                                                                    setSwapModal(true);
                                                                    setSwapDishTypeId(dish.dishType.id);
                                                                }}
                                                            />
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>

                                                <button
                                                    className={cn(styles.sliderArrow, styles.foodPrev)}
                                                    onClick={() => swiperIntance.current?.slidePrev()}
                                                >
                                                    <ArrowLeft />
                                                </button>

                                                <button
                                                    className={cn(styles.sliderArrow, styles.foodNext)}
                                                    onClick={() => swiperIntance.current?.slideNext()}
                                                >
                                                    <ArrowRight />
                                                </button>
                                            </div>
                                        ) : (
                                            <NotContent text="Блюд на этот день не создано" />
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </Element>

            <section
                className={cn(styles.cart, {
                    [styles.active]: !!activePrice && !!dateDelivery,
                })}
            >
                <div className={base.container}>
                    <div className={styles.cartInner}>
                        <div className={styles.cartTitleInner}>
                            <p className={styles.cartTitle}>Cкидка! не упускай возможность</p>

                            <p className={styles.cartText}>
                                Рацион на {getDayDeclension(activePrice?.daysCount)}{' '}
                                <span>({currentMenu?.mealsCount[language]})</span>
                            </p>
                        </div>

                        <div className={styles.cartPriceInner}>
                            <div className={styles.cartPriceWrap}>
                                {/* <p className={styles.cartPriceOld}>345 ₪</p> */}

                                <p className={styles.cartPrice}>Итого: {activePrice?.pricePerDay[language]}</p>
                            </div>

                            <Button className={styles.cartButton} onClick={() => setOrderModal(true)}>
                                Оформить заказ за <span className={styles.orderPrice}>{activePrice?.price}</span> ₪
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

            {!!swapDishes && (
                <Modal value={swapModal} setValue={setSwapModal} size="big">
                    <>
                        <Text variant="h3" upper className={styles.modalDeliveryTitle}>
                            Блюда для замены
                        </Text>

                        {swapDishesIsLoading ? (
                            <Preloader small page />
                        ) : swapDishesIsError ? (
                            <NotContent />
                        ) : !!swapDishes.length ? (
                            <div className={styles.swapModalContent}>
                                {swapDishes.map((elem) => (
                                    <DishItem key={elem.id} data={elem} />
                                ))}
                            </div>
                        ) : (
                            <NotContent text="Блюд для замен нет" />
                        )}
                    </>
                </Modal>
            )}

            {!!activePrice && !!dateDelivery && (
                <OrderModal
                    value={orderModal}
                    setValue={setOrderModal}
                    currentMenuType={currentMenuType}
                    currentMenu={currentMenu}
                    activePrice={activePrice}
                    disabledDays={disabledDays}
                    dateDelivery={dateDelivery}
                    resetOrder={resetOrder}
                />
            )}

            <CalcCaloriesForm
                value={calcNormModal}
                setValue={setCalcNormModal}
                calories={calcNorm}
                setCalories={setCalcNorm}
                chooseProgram={chooseProgram}
            />
        </>
    );
};

export default MenusBlock;
