'use client';

import React from 'react';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from '@tanstack/react-query';

import 'swiper/css';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ArrowLeft, ArrowRight, Date } from '@/shared/icons';
import { useMenu } from '@/features/menu';
import { DishItem } from '@/entities/dish/ui';

import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { useAppSelector } from '@/shared/hooks/useRedux';
import Image from 'next/image';

const MenusBlock = () => {
    const { getTypesmenuUser } = useMenu();
    const language = useAppSelector((state) => state.app.language);

    const { data, isPending, isError } = useQuery({
        queryKey: ['typesmenu'],
        queryFn: getTypesmenuUser,
    });

    if (isPending) {
        return <Preloader page small />;
    }

    if (isError) {
        return <NotContent />;
    }

    return (
        <section className={styles.complex}>
            <div className={base.container}>
                <div className={styles.complexInner}>
                    <h2 className={styles.complexTitle}>Ваше меню — ваши правила: настройте под себя</h2>

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
                                const { id, name, shortDescription, backgroundPicture, initialPrice } = type || {};

                                return (
                                    <SwiperSlide key={id} className={cn(styles.complexItem, styles.active)}>
                                        <div className={styles.complexTextInner}>
                                            <p className={styles.complexTextTitle}>{name[language]}</p>

                                            <p className={styles.complexTextText}>{shortDescription[language]}</p>

                                            <p className={styles.complexTextPrice}>от {initialPrice[language]} ₪</p>
                                        </div>

                                        <div className={styles.complexItemImg}>
                                            <Image src={backgroundPicture} alt={name[language]} fill />
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    ) : (
                        <NotContent text="Типы меню еще не созданы" />
                    )}

                    <div className={cn(styles.complexWrp, styles.active)}>
                        <div className={styles.foodTextInner}>
                            <p className={styles.foodTextTitle}>Сбалансированные программы питания на каждый день</p>

                            <p className={styles.foodTextText}>
                                Для тех, кто ценит своё время и здоровье: готовые решения для похудения, набора массы
                                или просто правильного питания. Мы продумали всё, чтобы вы могли наслаждаться и
                                достигать своих целей. Наши программы разработаны с учетом индивидуальных потребностей,
                                чтобы каждый мог найти подходящий вариант. Присоединяйтесь к нам и начните свой путь к
                                здоровью уже сегодня!
                            </p>
                        </div>

                        <div className={styles.foodForm}>
                            <div className={styles.foodFormItem}>
                                <div className={styles.foodFormItemName}>
                                    <p className={styles.foodFormItemNameText}>Калорийность, ккал:</p>

                                    <button className={styles.foodFormButton}>Рассчитать норму калорий</button>
                                </div>

                                <div className={styles.foodFormItemContent}>
                                    <button className={cn(styles.foodFormChoose, styles.foodCalories, styles.active)}>
                                        750 ккал
                                        <span className={styles.foodSign}>4 приема</span>
                                    </button>

                                    <button className={cn(styles.foodFormChoose, styles.foodCalories)}>
                                        1 000 ккал
                                        <span className={styles.foodSign}>5 приема</span>
                                    </button>

                                    <button className={cn(styles.foodFormChoose, styles.foodCalories)}>
                                        1 500 ккал
                                        <span className={styles.foodSign}>6 приема</span>
                                    </button>

                                    <button className={cn(styles.foodFormChoose, styles.foodCalories)}>
                                        2 500 ккал
                                        <span className={styles.foodSign}>6 приема</span>
                                    </button>

                                    <button className={cn(styles.foodFormChoose, styles.foodCalories)}>
                                        3 500 ккал
                                        <span className={styles.foodSign}>6 приема</span>
                                    </button>

                                    <button className={cn(styles.foodFormChoose, styles.foodCalories)}>
                                        4 500 ккал
                                        <span className={styles.foodSign}>6 приема</span>
                                    </button>
                                </div>
                            </div>

                            <div className={styles.foodFormItem}>
                                <div className={styles.foodFormItemName}>
                                    <p className={styles.foodFormItemNameText}>Длительность:</p>
                                </div>

                                <div className={styles.foodFormItemContent}>
                                    <button className={cn(styles.foodFormChoose, styles.cn)}>1 день</button>

                                    <button className={styles.foodFormChoose}>2 дня</button>

                                    <button className={styles.foodFormChoose}>5 дней</button>

                                    <button className={styles.foodFormChoose}>
                                        Неделя
                                        <span className={cn(styles.foodSale, styles.block)}>3 дня в подарок</span>
                                    </button>

                                    <button className={styles.foodFormChoose}>
                                        2 недели
                                        <span className={styles.foodSale}>-10%</span>
                                    </button>

                                    <button className={styles.foodFormChoose}>
                                        Месяц
                                        <span className={styles.foodSale}>-20%</span>
                                    </button>
                                </div>
                            </div>

                            <div className={styles.foodFormItem}>
                                <div className={styles.foodFormItemName}>
                                    <p className={styles.foodFormItemNameText}>Формат питания:</p>
                                </div>

                                <div className={cn(styles.foodFormItemContent, styles.big)}>
                                    <button className={cn(styles.foodFormChoose, styles.active)}>Будни</button>

                                    <button className={styles.foodFormChoose}>Пропускаем пятницу</button>

                                    <button className={styles.foodFormChoose}>Пропускаем пятницу и субботу</button>
                                </div>
                            </div>

                            <div className={styles.foodFormItem}>
                                <div className={styles.foodFormItemName}>
                                    <p className={styles.foodFormItemNameText}>С какого дня начинаем:</p>

                                    <button className={styles.foodFormButton}>Условия доставки</button>
                                </div>

                                <div className={styles.foodFormItemDate}>
                                    <button className={styles.foodFormItemDateButton}>
                                        <Date />
                                        Выберите дату
                                    </button>

                                    <p className={styles.foodFormDateText}>
                                        Мы привезем еду: <span className={styles.orderDate}>15.12.2024 года</span>
                                    </p>
                                </div>
                            </div>

                            <div className={styles.foodFormItem}>
                                <div className={styles.foodFormItemName}>
                                    <p className={styles.foodFormItemNameText}>Пример меню:</p>
                                </div>

                                <div className={styles.foodFormItemContent}>
                                    <button className={styles.foodFormChoose}>Пн</button>

                                    <button className={cn(styles.foodFormChoose, styles.active)}>Вт</button>

                                    <button className={styles.foodFormChoose}>Ср</button>

                                    <button className={styles.foodFormChoose}>Чт</button>

                                    <button className={styles.foodFormChoose}>Пт</button>

                                    <button className={styles.foodFormChoose}>Сб</button>

                                    <button className={styles.foodFormChoose}>Вс</button>
                                </div>
                            </div>
                        </div>

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
                            >
                                <SwiperSlide>
                                    <DishItem />
                                </SwiperSlide>
                            </Swiper>

                            <button className={cn(styles.sliderArrow, styles.foodPrev)}>
                                <ArrowLeft />
                            </button>

                            <button className={cn(styles.sliderArrow, styles.foodNext)}>
                                <ArrowRight />
                            </button>
                        </div>
                    </div>

                    <div className={styles.complexWrp}>
                        <div className={styles.foodTextInner}>
                            <p className={styles.foodTextTitle}>свобода выбора: Создайте свой идеальный набор блюд</p>

                            <p className={styles.foodTextText}>
                                Эта программа для тех, кто хочет питаться правильно и устал от фастфуда. Выберите любые
                                блюда на свой вкус из нашего меню и составьте свой идеальный заказ. Минимальная сумма —
                                200 шекелей, а вы получаете только то, что действительно хотите, без лишних компромиссов
                            </p>
                        </div>

                        <div className={styles.foodForm}>
                            <div className={styles.foodFormItem}>
                                <div className={styles.foodFormItemName}>
                                    <p className={styles.foodFormItemNameText}>Когда привезти:</p>

                                    <button className={cn(styles.foodFormButton, styles.deliveryButton)}>
                                        Условия доставки
                                    </button>
                                </div>

                                <div className={styles.foodFormItemDate}>
                                    <button className={styles.foodFormItemDateButton}>
                                        <Date />
                                        Выберите дату
                                    </button>

                                    <p className={styles.foodFormDateText}>
                                        Мы привезем еду: <span className={styles.orderDate}>15.12.2024 года</span>
                                    </p>
                                </div>
                            </div>

                            <div className={styles.foodFormItem}>
                                <div className={styles.foodFormItemName}>
                                    <p className={styles.foodFormItemNameText}>Выберите тип блюда</p>
                                </div>

                                <div className={styles.foodFormItemContent}>
                                    <button className={cn(styles.foodFormChoose, styles.active)}>На завтрак</button>

                                    <button className={styles.foodFormChoose}>На обед</button>

                                    <button className={styles.foodFormChoose}>На ужин</button>

                                    <button className={styles.foodFormChoose}>Напитки</button>

                                    <button className={styles.foodFormChoose}>Закуски</button>
                                </div>
                            </div>
                        </div>

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
                            className={styles.foodMenu}
                        >
                            <SwiperSlide>
                                <DishItem />
                            </SwiperSlide>

                            <SwiperSlide>
                                <DishItem />
                            </SwiperSlide>

                            <SwiperSlide>
                                <DishItem />
                            </SwiperSlide>

                            <SwiperSlide>
                                <DishItem />
                            </SwiperSlide>

                            <SwiperSlide>
                                <DishItem />
                            </SwiperSlide>

                            <SwiperSlide>
                                <DishItem />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MenusBlock;
