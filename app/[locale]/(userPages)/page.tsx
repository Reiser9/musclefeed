'use client';

import React from 'react';

import { Banner } from '@/widgets/Banner';
import { Cart } from '@/widgets/Cart';

import { Delivery } from './ui/Delivery';
import { Team } from './ui/Team';
import { Reviews } from './ui/Reviews';
import { MainBlock } from './ui/MainBlock';
import { MenusBlock } from './ui/MenusBlock';

// import { Modal } from '@/shared/ui/Modal';

const MainPage = () => {
    // const [deliveryModal, setDeliveryModal] = React.useState(false);
    // const [calcNormModal, setCalcNormModal] = React.useState(false);

    return (
        <>
            <MainBlock />

            <MenusBlock />

            <Cart />

            <Banner />

            <Team />

            <Reviews />

            <Delivery />

            {/* <Modal active={deliveryModal} setActive={setDeliveryModal}>
                <>
                    <p className={styles.modalDeliveryTitle}>Условия доставки</p>

                    <div className={styles.modalDeliveryTextInner}>
                        <p className={styles.modalDeliveryText}>
                            Мы бережем ваше время, поэтому привозим еду с запасом на 2 дня.
                        </p>

                        <p className={styles.modalDeliveryText}>
                            Заказы доставляются в выбранный вами временной интервал.
                        </p>

                        <p className={styles.modalDeliveryText}>
                            Если вы выбрали программу на 5 дней, доставка осуществляется только по будням: в понедельник
                            и среду — еда на 2 дня, в пятницу — еда на 1 день (выходные исключены).
                        </p>

                        <p className={styles.modalDeliveryText}>
                            Сделайте заказ до 12:00, чтобы вам привезли еду в ближайший доступный для заказа день.
                        </p>
                    </div>
                </>
            </Modal>

            <Modal active={calcNormModal} setActive={setCalcNormModal}>
                <p className={styles.modalDeliveryTitle}>Рассчитать норму калорий</p>

                <p className={styles.calcText}>
                    Наше меню разработано профессиональными диетологами, приготовлено только из натуральных продуктов и
                    рассчитано на каждого человека под его цели.
                </p>

                <div className={styles.calcForm}>
                    <div className={styles.calcFormItem}>
                        <p className={styles.calcFormItemTitle}>Ваши данные:</p>

                        <div className={styles.calcFormItemContent}>
                            <input
                                type="number"
                                className={cn(styles.calcFormItemElem, styles.calcFormItemInput)}
                                placeholder="Год рождения"
                            />
                            <input
                                type="number"
                                className={cn(styles.calcFormItemElem, styles.calcFormItemInput)}
                                placeholder="Рост, см"
                            />
                            <input
                                type="number"
                                className={cn(styles.calcFormItemElem, styles.calcFormItemInput)}
                                placeholder="Вес, кг"
                            />
                        </div>
                    </div>

                    <div className={styles.calcFormItem}>
                        <p className={styles.calcFormItemTitle}>Ваш пол:</p>

                        <div className={styles.calcFormItemContent}>
                            <button className={cn(styles.calcFormItemElem, styles.calcFormItemButton, styles.active)}>
                                Женский
                            </button>
                            <button className={cn(styles.calcFormItemElem, styles.calcFormItemButton)}>Мужской</button>
                        </div>
                    </div>

                    <div className="calc__form--item">
                        <p className="calc__form--item--title">Уровень активности:</p>

                        <div className="calc__form--item--content">
                            <button
                                className="button calc__form--item--elem calc__form--item--button big active"
                                data-form="activity"
                                data-value="1.2"
                            >
                                Нет физической активности
                            </button>
                            <button
                                className="button calc__form--item--elem calc__form--item--button big"
                                data-form="activity"
                                data-value="1.3"
                            >
                                1-2 тренировки в неделю
                            </button>
                            <button
                                className="button calc__form--item--elem calc__form--item--button big"
                                data-form="activity"
                                data-value="1.7"
                            >
                                Каждодневные тренировки
                            </button>
                            <button
                                className="button calc__form--item--elem calc__form--item--button big"
                                data-form="activity"
                                data-value="1.9"
                            >
                                3-4 тренировки в неделю
                            </button>
                        </div>
                    </div>

                    <div className="calc__form--item">
                        <p className="calc__form--item--title">Ваша цель:</p>

                        <div className="calc__form--item--content">
                            <button
                                className="button calc__form--item--elem calc__form--item--button big active"
                                data-form="target"
                                data-value="0.8"
                            >
                                Сбросить вес
                            </button>
                            <button
                                className="button calc__form--item--elem calc__form--item--button big"
                                data-form="target"
                                data-value="1"
                            >
                                Поддерживать вес
                            </button>
                            <button
                                className="button calc__form--item--elem calc__form--item--button big"
                                data-form="target"
                                data-value="1.25"
                            >
                                Набор веса
                            </button>
                        </div>
                    </div>
                </div>

                <div className="calc__result">
                    <p className="calc__result--count">
                        Результат: <span className="calc__result--value">-</span> ККал/день
                    </p>

                    <button className="button calc__result--button calc__confirm">
                        Применить
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            </Modal>

            <div className="modal" data-modal="date">
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

                        <p className="modal__date--title">Выбор даты</p>

                        <p className="calc__text">Выберите удобный для вас способ:</p>

                        <div className="modal__calendar--inner">
                            <div className="modal__calendar"></div>
                        </div>

                        <button className="button modal__calendar--button">
                            Выбрать дату
                            <svg
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4.5 12H20.5M20.5 12L14.5 6M20.5 12L14.5 18"
                                    stroke="white"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="modal" data-modal="order">
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

                        <p className="calc__text">
                            Тут можно посмотреть опции заказа и оплатить его, с вами свяжется наш оператор для уточнения
                            деталей заказа
                        </p>

                        <div className="order__items">
                            <div className="order__item">
                                <p className="order__item--name">Рацион</p>

                                <p className="order__item--title">Сбалансированный</p>
                            </div>

                            <div className="order__item">
                                <p className="order__item--name">Калорийность, ККал</p>

                                <p className="order__item--title order__value" data-order="calories">
                                    750
                                </p>
                            </div>

                            <div className="order__item">
                                <p className="order__item--name">Длительность</p>

                                <p className="order__item--title">
                                    <span className="order__value" data-order="duration">
                                        14 дней
                                    </span>{' '}
                                    <span className="order__highlight" data-highlight="duration"></span>
                                </p>

                                <p className="order__item--subtext order__subvalue" data-subvalue="duration"></p>
                            </div>

                            <div className="order__item">
                                <p className="order__item--name">Доставка</p>

                                <p className="order__item--title">
                                    Начало доставки: <span className="order__dilivery">15.12.2024</span>
                                </p>
                            </div>

                            <div className="order__item">
                                <p className="order__item--name">Формат питания</p>

                                <p className="order__item--title order__value" data-order="mode">
                                    Будни
                                </p>
                            </div>
                        </div>

                        <div className="order__allergy">
                            <div className="order__allergy--block">
                                <p className="order__item--title">У вас есть аллергии:</p>

                                <p className="order__allergy--text">
                                    С вами свяжется наш специалист и уточнит возможные замены продуктов
                                </p>
                            </div>

                            <div className="order__allergy--switch" id="allergy_switch">
                                <div className="order__allergy--switch--circle"></div>
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
                                <p className="calc__result--count">
                                    Итого: <span className="cart__price--value">0</span> ₪
                                </p>

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

            <div className="modal" data-modal="order2">
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

                        <p className="calc__text">
                            Тут можно посмотреть опции заказа и оплатить его, с вами свяжется наш оператор для уточнения
                            деталей заказа
                        </p>

                        <div className="order__items">
                            <div className="order__item">
                                <p className="order__item--name">Рацион</p>

                                <p className="order__item--title">Сбалансированный</p>
                            </div>

                            <div className="order__item">
                                <p className="order__item--name">Калорийность, ККал</p>

                                <p className="order__item--title order__value" data-order="calories">
                                    750
                                </p>
                            </div>

                            <div className="order__item">
                                <p className="order__item--name">Длительность</p>

                                <p className="order__item--title">
                                    <span className="order__value" data-order="duration">
                                        14 дней
                                    </span>{' '}
                                    <span className="order__highlight" data-highlight="duration"></span>
                                </p>

                                <p className="order__item--subtext order__subvalue" data-subvalue="duration"></p>
                            </div>

                            <div className="order__item">
                                <p className="order__item--name">Доставка</p>

                                <p className="order__item--title">
                                    Начало доставки: <span className="order__dilivery">15.12.2024</span>
                                </p>
                            </div>

                            <div className="order__item">
                                <p className="order__item--name">Формат питания</p>

                                <p className="order__item--title order__value" data-order="mode">
                                    Будни
                                </p>
                            </div>
                        </div>

                        <div className="order__allergy">
                            <div className="order__allergy--block">
                                <p className="order__item--title">У вас есть аллергии:</p>

                                <p className="order__allergy--text">
                                    С вами свяжется наш специалист и уточнит возможные замены продуктов
                                </p>
                            </div>

                            <div className="order__allergy--switch active">
                                <div className="order__allergy--switch--circle"></div>
                            </div>
                        </div>

                        <div className="order__allergy--form">
                            <div className="reviewform__form--input--inner full">
                                <p className="reviewform__form--input--text">Комментарии к заказу</p>

                                <div className="reviewform__form--input--wrap">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10 15L6.92474 18.1137C6.49579 18.548 6.28131 18.7652 6.09695 18.7805C5.93701 18.7938 5.78042 18.7295 5.67596 18.6076C5.55556 18.4672 5.55556 18.162 5.55556 17.5515V15.9916C5.55556 15.444 5.10707 15.0477 4.5652 14.9683V14.9683C3.25374 14.7762 2.22378 13.7463 2.03168 12.4348C2 12.2186 2 11.9605 2 11.4444V6.8C2 5.11984 2 4.27976 2.32698 3.63803C2.6146 3.07354 3.07354 2.6146 3.63803 2.32698C4.27976 2 5.11984 2 6.8 2H14.2C15.8802 2 16.7202 2 17.362 2.32698C17.9265 2.6146 18.3854 3.07354 18.673 3.63803C19 4.27976 19 5.11984 19 6.8V11M19 22L16.8236 20.4869C16.5177 20.2742 16.3647 20.1678 16.1982 20.0924C16.0504 20.0255 15.8951 19.9768 15.7356 19.9474C15.5558 19.9143 15.3695 19.9143 14.9969 19.9143H13.2C12.0799 19.9143 11.5198 19.9143 11.092 19.6963C10.7157 19.5046 10.4097 19.1986 10.218 18.8223C10 18.3944 10 17.8344 10 16.7143V14.2C10 13.0799 10 12.5198 10.218 12.092C10.4097 11.7157 10.7157 11.4097 11.092 11.218C11.5198 11 12.0799 11 13.2 11H18.8C19.9201 11 20.4802 11 20.908 11.218C21.2843 11.4097 21.5903 11.7157 21.782 12.092C22 12.5198 22 13.0799 22 14.2V16.9143C22 17.8462 22 18.3121 21.8478 18.6797C21.6448 19.1697 21.2554 19.5591 20.7654 19.762C20.3978 19.9143 19.9319 19.9143 19 19.9143V22Z"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>

                                    <input
                                        type="text"
                                        className="input reviewform__form--input"
                                        placeholder="Ваши комментарии к заказу"
                                    />
                                </div>
                            </div>

                            <div className="reviewform__form--input--inner">
                                <p className="reviewform__form--input--text">Ваша фамилия</p>

                                <div className="reviewform__form--input--wrap">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>

                                    <input
                                        type="text"
                                        className="input reviewform__form--input"
                                        placeholder="Ваша фамилия"
                                    />
                                </div>
                            </div>

                            <div className="reviewform__form--input--inner">
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
                                        placeholder="Номер вашего телефона"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="calc__result">
                            <div className="order__text--inner">
                                <p className="calc__result--count">
                                    Итого: <span className="cart__price--value">0</span> ₪
                                </p>

                                <div className="order__text--sale">Скидка 25% за длительность заказа</div>
                            </div>

                            <button className="button calc__result--button">
                                Пусть мне перезвонит оператор
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

            <div className="modal" data-modal="order3">
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

                        <p className="modal__delivery--title">Оформление заказа</p>

                        <p className="calc__text">
                            Тут можно посмотреть опции заказа и оплатить его, с вами свяжется наш оператор для уточнения
                            деталей заказа
                        </p>

                        <div className="order__final--form">
                            <div className="reviewform__form--input--inner full">
                                <p className="reviewform__form--input--text">Сохраненный адрес</p>

                                <div className="reviewform__form--input--wrap">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8.12602 14C8.57006 15.7252 10.1362 17 12 17C13.8638 17 15.4299 15.7252 15.874 14M11.0177 2.764L4.23539 8.03912C3.78202 8.39175 3.55534 8.56806 3.39203 8.78886C3.24737 8.98444 3.1396 9.20478 3.07403 9.43905C3 9.70352 3 9.9907 3 10.5651V17.8C3 18.9201 3 19.4801 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4801 21 18.9201 21 17.8V10.5651C21 9.9907 21 9.70352 20.926 9.43905C20.8604 9.20478 20.7526 8.98444 20.608 8.78886C20.4447 8.56806 20.218 8.39175 19.7646 8.03913L12.9823 2.764C12.631 2.49075 12.4553 2.35412 12.2613 2.3016C12.0902 2.25526 11.9098 2.25526 11.7387 2.3016C11.5447 2.35412 11.369 2.49075 11.0177 2.764Z"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>

                                    <svg
                                        className="reviewform__form--select--arrow"
                                        width="16"
                                        height="17"
                                        viewBox="0 0 16 17"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M4 6.49902L8 10.499L12 6.49902"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>

                                    <select className="input reviewform__form--input">
                                        <option disabled selected>
                                            Выберите адрес
                                        </option>
                                        <option>
                                            Хайфа, ул. имени 1750 летия взятия Моссады, дом 15 кв. 25, вход со двора
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="reviewform__form--input--inner">
                                <p className="reviewform__form--input--text">Ваша фамилия</p>

                                <div className="reviewform__form--input--wrap">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>

                                    <input
                                        type="text"
                                        className="input reviewform__form--input"
                                        placeholder="Ваша фамилия"
                                    />
                                </div>
                            </div>

                            <div className="reviewform__form--input--inner">
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
                                        placeholder="Номер вашего телефон"
                                    />
                                </div>
                            </div>

                            <div className="reviewform__form--input--inner">
                                <p className="reviewform__form--input--text">Ваша почта</p>

                                <div className="reviewform__form--input--wrap">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M21.5 18L14.8571 12M9.14286 12L2.50003 18M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>

                                    <input
                                        type="text"
                                        className="input reviewform__form--input"
                                        placeholder="Ваша электронная почта"
                                    />
                                </div>
                            </div>

                            <div className="reviewform__form--input--inner">
                                <p className="reviewform__form--input--text">Город</p>

                                <div className="reviewform__form--input--wrap">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 12.5C13.6569 12.5 15 11.1569 15 9.5C15 7.84315 13.6569 6.5 12 6.5C10.3431 6.5 9 7.84315 9 9.5C9 11.1569 10.3431 12.5 12 12.5Z"
                                            stroke="#00A31E"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M12 22C14 18 20 15.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 15.4183 10 18 12 22Z"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>

                                    <svg
                                        className="reviewform__form--select--arrow"
                                        width="16"
                                        height="17"
                                        viewBox="0 0 16 17"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M4 6.49902L8 10.499L12 6.49902"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>

                                    <select className="input reviewform__form--input">
                                        <option disabled selected>
                                            Выберите или начните вводить
                                        </option>
                                        <option>Москва</option>
                                    </select>
                                </div>
                            </div>

                            <div className="reviewform__form--input--inner third">
                                <p className="reviewform__form--input--text">Улица</p>

                                <div className="reviewform__form--input--wrap">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M21.5 18L14.8571 12M9.14286 12L2.50003 18M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>

                                    <input
                                        type="text"
                                        className="input reviewform__form--input"
                                        placeholder="Выберите или начните вводить"
                                    />
                                </div>
                            </div>

                            <div className="reviewform__form--input--inner third">
                                <p className="reviewform__form--input--text">Дом</p>

                                <div className="reviewform__form--input--wrap">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12.9823 2.764C12.631 2.49075 12.4553 2.35412 12.2613 2.3016C12.0902 2.25526 11.9098 2.25526 11.7387 2.3016C11.5447 2.35412 11.369 2.49075 11.0177 2.764L4.23539 8.03912C3.78202 8.39175 3.55534 8.56806 3.39203 8.78886C3.24737 8.98444 3.1396 9.20478 3.07403 9.43905C3 9.70352 3 9.9907 3 10.5651V17.8C3 18.9201 3 19.4801 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21H8.2C8.48003 21 8.62004 21 8.727 20.9455C8.82108 20.8976 8.89757 20.8211 8.9455 20.727C9 20.62 9 20.48 9 20.2V13.6C9 13.0399 9 12.7599 9.10899 12.546C9.20487 12.3578 9.35785 12.2049 9.54601 12.109C9.75992 12 10.0399 12 10.6 12H13.4C13.9601 12 14.2401 12 14.454 12.109C14.6422 12.2049 14.7951 12.3578 14.891 12.546C15 12.7599 15 13.0399 15 13.6V20.2C15 20.48 15 20.62 15.0545 20.727C15.1024 20.8211 15.1789 20.8976 15.273 20.9455C15.38 21 15.52 21 15.8 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4801 21 18.9201 21 17.8V10.5651C21 9.9907 21 9.70352 20.926 9.43905C20.8604 9.20478 20.7526 8.98444 20.608 8.78886C20.4447 8.56806 20.218 8.39175 19.7646 8.03913L12.9823 2.764Z"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>

                                    <input
                                        type="text"
                                        className="input reviewform__form--input"
                                        placeholder="Номер дома"
                                    />
                                </div>
                            </div>

                            <div className="reviewform__form--input--inner third">
                                <p className="reviewform__form--input--text">Этаж (необязательно, если у вас дом)</p>

                                <div className="reviewform__form--input--wrap">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 12.5C13.6569 12.5 15 11.1569 15 9.5C15 7.84315 13.6569 6.5 12 6.5C10.3431 6.5 9 7.84315 9 9.5C9 11.1569 10.3431 12.5 12 12.5Z"
                                            stroke="#00A31E"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M12 22C14 18 20 15.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 15.4183 10 18 12 22Z"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>

                                    <input type="text" className="input reviewform__form--input" placeholder="Этаж" />
                                </div>
                            </div>

                            <div className="reviewform__form--input--inner">
                                <p className="reviewform__form--input--text">
                                    Квартира (необязательно, если у вас дом)
                                </p>

                                <div className="reviewform__form--input--wrap">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 12.5C13.6569 12.5 15 11.1569 15 9.5C15 7.84315 13.6569 6.5 12 6.5C10.3431 6.5 9 7.84315 9 9.5C9 11.1569 10.3431 12.5 12 12.5Z"
                                            stroke="#00A31E"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M12 22C14 18 20 15.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 15.4183 10 18 12 22Z"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>

                                    <input
                                        type="text"
                                        className="input reviewform__form--input"
                                        placeholder="Квартира"
                                    />
                                </div>
                            </div>

                            <div className="reviewform__form--input--inner">
                                <p className="reviewform__form--input--text">Комментарии к заказу</p>

                                <div className="reviewform__form--input--wrap">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10 15L6.92474 18.1137C6.49579 18.548 6.28131 18.7652 6.09695 18.7805C5.93701 18.7938 5.78042 18.7295 5.67596 18.6076C5.55556 18.4672 5.55556 18.162 5.55556 17.5515V15.9916C5.55556 15.444 5.10707 15.0477 4.5652 14.9683V14.9683C3.25374 14.7762 2.22378 13.7463 2.03168 12.4348C2 12.2186 2 11.9605 2 11.4444V6.8C2 5.11984 2 4.27976 2.32698 3.63803C2.6146 3.07354 3.07354 2.6146 3.63803 2.32698C4.27976 2 5.11984 2 6.8 2H14.2C15.8802 2 16.7202 2 17.362 2.32698C17.9265 2.6146 18.3854 3.07354 18.673 3.63803C19 4.27976 19 5.11984 19 6.8V11M19 22L16.8236 20.4869C16.5177 20.2742 16.3647 20.1678 16.1982 20.0924C16.0504 20.0255 15.8951 19.9768 15.7356 19.9474C15.5558 19.9143 15.3695 19.9143 14.9969 19.9143H13.2C12.0799 19.9143 11.5198 19.9143 11.092 19.6963C10.7157 19.5046 10.4097 19.1986 10.218 18.8223C10 18.3944 10 17.8344 10 16.7143V14.2C10 13.0799 10 12.5198 10.218 12.092C10.4097 11.7157 10.7157 11.4097 11.092 11.218C11.5198 11 12.0799 11 13.2 11H18.8C19.9201 11 20.4802 11 20.908 11.218C21.2843 11.4097 21.5903 11.7157 21.782 12.092C22 12.5198 22 13.0799 22 14.2V16.9143C22 17.8462 22 18.3121 21.8478 18.6797C21.6448 19.1697 21.2554 19.5591 20.7654 19.762C20.3978 19.9143 19.9319 19.9143 19 19.9143V22Z"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>

                                    <input
                                        type="text"
                                        className="input reviewform__form--input"
                                        placeholder="Ваши комментарии к заказу"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="calc__result">
                            <div className="order__text--inner">
                                <p className="calc__result--count">
                                    Итого: <span className="cart__price--value">0</span> ₪
                                </p>

                                <div className="order__text--sale">Скидка 25% за длительность заказа</div>
                            </div>

                            <button className="button calc__result--button">
                                Оплатить
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

            <div className="modal" data-modal="order__cart">
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
