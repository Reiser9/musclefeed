'use client';

import React from 'react';

import { Banner } from '@/widgets/Banner';

import { Delivery } from './ui/Delivery';
import { Team } from './ui/Team';
import { Reviews } from './ui/Reviews';
import { MainBlock } from './ui/MainBlock';
import { MenusBlock } from './ui/MenusBlock';

const MainPage = () => {
    return (
        <>
            <MainBlock />

            <MenusBlock />

            <Banner />

            <Team />

            <Reviews />

            <Delivery />

            {/* <div className="modal" data-modal="order__cart">
                <div className="modal__inner big">
                    <div className="modal__content calc__content">
                        <button className="button modal__close">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18 6L6 18M6 6L18 18"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </button>

                        <p className="modal__delivery--title">Ваш заказ</p>

                        <p className="order__warn">
                            Минимальная сумма заказа <span>200 ₪</span>
                        </p>

                        <div className="order__list">
                            <div className="swap__item">
                                <div className="swap__item--img">
                                    <img src="/img/food.png" alt="food" />
                                </div>

                                <div className="swap__item--content">
                                    <div className="swap__item--wrapper">
                                        <p className="swap__item--name">Овощное рагу с фрикадельками</p>

                                        <p className="swap__item--text">
                                            Филе телятины, кабачок, лук репчатый, томатная паста, морковь, перец
                                            болгарский, масло (оливковое / растительное), зелень по вкусу, соль/специи,
                                            картофель, вода
                                        </p>
                                    </div>

                                    <p className="order__list--item--price">799 ₪</p>
                                </div>
                            </div>

                            <div className="swap__item">
                                <div className="swap__item--img">
                                    <img src="/img/food.png" alt="food" />
                                </div>

                                <div className="swap__item--content">
                                    <div className="swap__item--wrapper">
                                        <p className="swap__item--name">Овощное рагу с фрикадельками</p>

                                        <p className="swap__item--text">
                                            Филе телятины, кабачок, лук репчатый, томатная паста, морковь, перец
                                            болгарский, масло (оливковое / растительное), зелень по вкусу, соль/специи,
                                            картофель, вода
                                        </p>
                                    </div>

                                    <p className="order__list--item--price">799 ₪</p>
                                </div>
                            </div>
                        </div>

                        <div className="order__block">
                            <div className="food__form--item">
                                <div className="food__form--item--name">
                                    <p className="food__form--item--name--text">Способы оплаты:</p>
                                </div>

                                <div className="food__form--item--content big">
                                    <button className="button food__form--choose">Картой курьеру</button>

                                    <button className="button food__form--choose active">Наличными курьеру</button>

                                    <button className="button food__form--choose">Картой онлайн</button>
                                </div>
                            </div>

                            <div className="order__promo">
                                <div className="order__promo--title--inner">
                                    <p className="food__form--item--name--text">У вас есть промокод:</p>

                                    <p className="promo__subtitle">
                                        Скидка по промокоду не суммируется с другими скидками
                                    </p>
                                </div>

                                <div className="order__promo--wrap">
                                    <div className="order__promo--input--wrap">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12 6V22M12 6H8.46429C7.94332 6 7.4437 5.78929 7.07533 5.41421C6.70695 5.03914 6.5 4.53043 6.5 4C6.5 3.46957 6.70695 2.96086 7.07533 2.58579C7.4437 2.21071 7.94332 2 8.46429 2C11.2143 2 12 6 12 6ZM12 6H15.5357C16.0567 6 16.5563 5.78929 16.9247 5.41421C17.293 5.03914 17.5 4.53043 17.5 4C17.5 3.46957 17.293 2.96086 16.9247 2.58579C16.5563 2.21071 16.0567 2 15.5357 2C12.7857 2 12 6 12 6ZM20 11V18.8C20 19.9201 20 20.4802 19.782 20.908C19.5903 21.2843 19.2843 21.5903 18.908 21.782C18.4802 22 17.9201 22 16.8 22L7.2 22C6.07989 22 5.51984 22 5.09202 21.782C4.71569 21.5903 4.40973 21.2843 4.21799 20.908C4 20.4802 4 19.9201 4 18.8V11M2 7.6L2 9.4C2 9.96005 2 10.2401 2.10899 10.454C2.20487 10.6422 2.35785 10.7951 2.54601 10.891C2.75992 11 3.03995 11 3.6 11L20.4 11C20.9601 11 21.2401 11 21.454 10.891C21.6422 10.7951 21.7951 10.6422 21.891 10.454C22 10.2401 22 9.96005 22 9.4V7.6C22 7.03995 22 6.75992 21.891 6.54601C21.7951 6.35785 21.6422 6.20487 21.454 6.10899C21.2401 6 20.9601 6 20.4 6L3.6 6C3.03995 6 2.75992 6 2.54601 6.10899C2.35785 6.20487 2.20487 6.35785 2.10899 6.54601C2 6.75992 2 7.03995 2 7.6Z"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>

                                        <input
                                            type="text"
                                            className="input reviewform__form--input"
                                            placeholder="Ввести промокод и нажать Enter"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="calc__result">
                            <div className="order__text--inner">
                                <p className="calc__result--count">Итого: 2 500 ₪</p>

                                <div className="order__text--sale">Скидка 25% за длительность заказа</div>
                            </div>

                            <button className="button calc__result--button order1step">
                                Далее
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12H20M20 12L14 6M20 12L14 18"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal" data-modal="swap">
                <div className="modal__inner big">
                    <div className="modal__content calc__content">
                        <button className="button modal__close">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18 6L6 18M6 6L18 18"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </button>

                        <p className="modal__delivery--title">Хотите заменить блюдо?</p>

                        <div className="swap__modal--content">
                            <div className="swap__modal--item">
                                <div className="food__item--img">
                                    <img src="/img/food.png" alt="food" />
                                </div>

                                <div className="food__item--text--inner">
                                    <p className="food__item--tag">Завтрак</p>

                                    <p className="food__item--name">Овощное рагу с фрикадельками</p>

                                    <p className="food__item--text">
                                        Филе телятины, кабачок, лук репчатый, томатная паста, морковь, перец болгарский,
                                        масло (оливковое / растительное), зелень по вкусу, соль/специи, картофель, вода
                                    </p>

                                    <div className="food__item--params">
                                        <p className="food__item--param">
                                            <span>Ккал</span> 200
                                        </p>
                                        <p className="food__item--param">
                                            <span>Б</span> 20
                                        </p>
                                        <p className="food__item--param">
                                            <span>Ж</span> 20
                                        </p>
                                        <p className="food__item--param">
                                            <span>У</span> 200
                                        </p>
                                    </div>

                                    <button className="button food__item--button">
                                        <svg
                                            width="25"
                                            height="25"
                                            viewBox="0 0 25 25"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g clip-path="url(#clip0_14407_7256)">
                                                <path
                                                    d="M12.6 20.7C17.2944 20.7 21.1 16.8945 21.1 12.2C21.1 9.37451 19.7213 6.87098 17.6 5.32545M13.6 22.6L11.6 20.6L13.6 18.6M12.6 3.70005C7.90559 3.70005 4.10001 7.50563 4.10001 12.2C4.10001 15.0256 5.47867 17.5291 7.60001 19.0746M11.6 5.80005L13.6 3.80005L11.6 1.80005"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_14407_7256">
                                                    <rect
                                                        width="24"
                                                        height="24"
                                                        fill="white"
                                                        transform="translate(0.600006 0.199951)"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        Выбрать это
                                    </button>
                                </div>
                            </div>

                            <div className="swap__modal--item">
                                <div className="food__item--img">
                                    <img src="/img/food.png" alt="food" />
                                </div>

                                <div className="food__item--text--inner">
                                    <p className="food__item--tag">Завтрак</p>

                                    <p className="food__item--name">Овощное рагу с фрикадельками</p>

                                    <p className="food__item--text">
                                        Филе телятины, кабачок, лук репчатый, томатная паста, морковь, перец болгарский,
                                        масло (оливковое / растительное), зелень по вкусу, соль/специи, картофель, вода
                                    </p>

                                    <div className="food__item--params">
                                        <p className="food__item--param">
                                            <span>Ккал</span> 200
                                        </p>
                                        <p className="food__item--param">
                                            <span>Б</span> 20
                                        </p>
                                        <p className="food__item--param">
                                            <span>Ж</span> 20
                                        </p>
                                        <p className="food__item--param">
                                            <span>У</span> 200
                                        </p>
                                    </div>

                                    <button className="button food__item--button">
                                        <svg
                                            width="25"
                                            height="25"
                                            viewBox="0 0 25 25"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g clip-path="url(#clip0_14407_7256)">
                                                <path
                                                    d="M12.6 20.7C17.2944 20.7 21.1 16.8945 21.1 12.2C21.1 9.37451 19.7213 6.87098 17.6 5.32545M13.6 22.6L11.6 20.6L13.6 18.6M12.6 3.70005C7.90559 3.70005 4.10001 7.50563 4.10001 12.2C4.10001 15.0256 5.47867 17.5291 7.60001 19.0746M11.6 5.80005L13.6 3.80005L11.6 1.80005"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_14407_7256">
                                                    <rect
                                                        width="24"
                                                        height="24"
                                                        fill="white"
                                                        transform="translate(0.600006 0.199951)"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        Выбрать это
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal" data-modal="makeorder">
                <div className="modal__inner">
                    <div className="modal__content">
                        <button className="button modal__close">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18 6L6 18M6 6L18 18"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </button>

                        <p className="modal__delivery--title">Оформление заказа</p>

                        <p className="calc__text">Выберите удобный для вас способ:</p>

                        <div className="makeorder__buttons">
                            <button className="button makeorder__button">
                                Сделать заказ на сайте
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12H20M20 12L14 6M20 12L14 18"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </button>

                            <button className="button makeorder__button modal__show" data-modal="call">
                                Вам перезвонит менеджер
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12H20M20 12L14 6M20 12L14 18"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal" data-modal="call">
                <div className="modal__inner">
                    <div className="modal__content">
                        <button className="button modal__close">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18 6L6 18M6 6L18 18"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </button>

                        <p className="modal__delivery--title">Оформление заказа</p>

                        <p className="calc__text">Выберите удобный для вас способ:</p>

                        <div className="call__form">
                            <div className="reviewform__form--input--inner full">
                                <p className="reviewform__form--input--text">Ваш телефон</p>

                                <div className="reviewform__form--input--wrap">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M14.0497 6C15.0264 6.19057 15.924 6.66826 16.6277 7.37194C17.3314 8.07561 17.8091 8.97326 17.9997 9.95M14.0497 2C16.0789 2.22544 17.9713 3.13417 19.4159 4.57701C20.8606 6.01984 21.7717 7.91101 21.9997 9.94M10.2266 13.8631C9.02506 12.6615 8.07627 11.3028 7.38028 9.85323C7.32041 9.72854 7.29048 9.66619 7.26748 9.5873C7.18576 9.30695 7.24446 8.96269 7.41447 8.72526C7.46231 8.65845 7.51947 8.60129 7.63378 8.48698C7.98338 8.13737 8.15819 7.96257 8.27247 7.78679C8.70347 7.1239 8.70347 6.26932 8.27247 5.60643C8.15819 5.43065 7.98338 5.25585 7.63378 4.90624L7.43891 4.71137C6.90747 4.17993 6.64174 3.91421 6.35636 3.76987C5.7888 3.4828 5.11854 3.4828 4.55098 3.76987C4.2656 3.91421 3.99987 4.17993 3.46843 4.71137L3.3108 4.86901C2.78117 5.39863 2.51636 5.66344 2.31411 6.02348C2.08969 6.42298 1.92833 7.04347 1.9297 7.5017C1.93092 7.91464 2.01103 8.19687 2.17124 8.76131C3.03221 11.7947 4.65668 14.6571 7.04466 17.045C9.43264 19.433 12.295 21.0575 15.3284 21.9185C15.8928 22.0787 16.1751 22.1588 16.588 22.16C17.0462 22.1614 17.6667 22 18.0662 21.7756C18.4263 21.5733 18.6911 21.3085 19.2207 20.7789L19.3783 20.6213C19.9098 20.0898 20.1755 19.8241 20.3198 19.5387C20.6069 18.9712 20.6069 18.3009 20.3198 17.7333C20.1755 17.448 19.9098 17.1822 19.3783 16.6508L19.1835 16.4559C18.8339 16.1063 18.6591 15.9315 18.4833 15.8172C17.8204 15.3862 16.9658 15.3862 16.3029 15.8172C16.1271 15.9315 15.9523 16.1063 15.6027 16.4559C15.4884 16.5702 15.4313 16.6274 15.3644 16.6752C15.127 16.8453 14.7828 16.904 14.5024 16.8222C14.4235 16.7992 14.3612 16.7693 14.2365 16.7094C12.7869 16.0134 11.4282 15.0646 10.2266 13.8631Z"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>

                                    <input
                                        type="text"
                                        className="input reviewform__form--input"
                                        placeholder="+7 (---) --- -- --"
                                    />
                                </div>
                            </div>

                            <div className="reviewform__agree">
                                <input type="checkbox" className="checkbox" id="call__agree" checked />

                                <label htmlFor="call__agree" className="reviewform__label">
                                    Нажимая на кнопку &quot;Отправить&quot;, я соглашаюсь с условиями политики
                                    конфиденциальности.
                                </label>
                            </div>

                            <button className="button makeorder__button green">
                                Отправить
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12H20M20 12L14 6M20 12L14 18"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default MainPage;
