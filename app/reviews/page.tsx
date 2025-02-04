'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ArrowRightShort, Home } from '@/shared/icons';

const ReviewsPage = () => {
    return (
        <>
            <div className={styles.breadcrumbs}>
                <div className={base.container}>
                    <div className={styles.breadcrumbsInner}>
                        <Link href="/" className={styles.breadcrumbsLink}>
                            <Home />
                        </Link>

                        <ArrowRightShort className={styles.breadcrumbsArrow} />

                        <p className={styles.breadcrumbsText}>Отзывы</p>
                    </div>
                </div>
            </div>

            <div className={styles.reviewpage}>
                <div className={base.container}>
                    <div className={styles.reviewpageInner}>
                        <h1 className={styles.reviewpageTitle}>Отзывы наших покупателей</h1>

                        <div className={styles.reviewpageTitleInner}>
                            <div className={styles.reviewsTitleWrap}>
                                <h2 className={styles.reviewsTitle}>реальные отзывы наших клиентов</h2>

                                <p className={styles.reviewsText}>
                                    Наше меню разработано профессиональными диетологами, приготовлено только из
                                    натуральных продуктов и рассчитано на каждого человека под его цели.
                                </p>
                            </div>

                            <button className={styles.reviewpageLink}>
                                Оставить отзыв
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

                        <div className={styles.reviewsContent}>
                            <div className={styles.reviewsItem}>
                                <div className={styles.reviewsItemImg}>
                                    <img src="img/review1.png" alt="img" />
                                </div>

                                <div className={styles.reviewsItemContent}>
                                    <p className={styles.reviewsItemPlan}>Рацион Балланс</p>

                                    <p className={styles.reviewsItemName}>Марина кузякина</p>

                                    <div className={styles.reviewsItemTextInner}>
                                        <p className={styles.reviewsItemText}>
                                            Я играю в теннис и использую программу баланс. Тренер посоветовал заказывать
                                            готовые рационы, чтобы не париться. В спорте важно, чтобы не только калории
                                            считались, но и еда была сбалансированной и полезной, а еще с доставкой на
                                            дом. Работаешь, тренируешься, а про еду не заморачиваешься.
                                        </p>

                                        <button className={styles.reviewsItemTextFull}>
                                            Смотреть весь отзыв
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className={styles.reviewform}>
                <div className={base.container}>
                    <div className={styles.reviewformInner}>
                        <div className={styles.reviewformForm}>
                            <div className={styles.reviewformFormWrapper}>
                                <p className={styles.reviewformFormText}>Нам важно ваше мнение</p>

                                <p className={styles.reviewformFormTitle}>Хотите оставить отзыв?</p>
                            </div>

                            <div className={styles.reviewformFormContent}>
                                <div className={styles.reviewformFormInputInner}>
                                    <p className={styles.reviewformFormInputText}>Как вас зовут</p>

                                    <div className={styles.reviewformFormInputWrap}>
                                        <svg
                                            width="24"
                                            height="25"
                                            viewBox="0 0 24 25"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M20 21.499C20 20.1035 20 19.4057 19.8278 18.8379C19.44 17.5595 18.4395 16.5591 17.1611 16.1713C16.5933 15.999 15.8956 15.999 14.5 15.999H9.5C8.10444 15.999 7.40665 15.999 6.83886 16.1713C5.56045 16.5591 4.56004 17.5595 4.17224 18.8379C4 19.4057 4 20.1035 4 21.499M16.5 7.99902C16.5 10.4843 14.4853 12.499 12 12.499C9.51472 12.499 7.5 10.4843 7.5 7.99902C7.5 5.51374 9.51472 3.49902 12 3.49902C14.4853 3.49902 16.5 5.51374 16.5 7.99902Z"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>

                                        <input
                                            type="text"
                                            className={styles.reviewformFormInput}
                                            placeholder="Михаил Кузякин"
                                        />
                                    </div>
                                </div>

                                <div className={styles.reviewformFormInputInner}>
                                    <p className={styles.reviewformFormInputText}>Какой рацион вы пробовали</p>

                                    <div className={styles.reviewformFormInputWrap}>
                                        <svg
                                            width="24"
                                            height="25"
                                            viewBox="0 0 24 25"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M20.5 8.49902V16.699C20.5 18.3792 20.5 19.2193 20.173 19.861C19.8854 20.4255 19.4265 20.8844 18.862 21.172C18.2202 21.499 17.3802 21.499 15.7 21.499H8.3C6.61984 21.499 5.77976 21.499 5.13803 21.172C4.57354 20.8844 4.1146 20.4255 3.82698 19.861C3.5 19.2193 3.5 18.3792 3.5 16.699V8.49902M3.6 3.49902H20.4C20.9601 3.49902 21.2401 3.49902 21.454 3.60802C21.6422 3.70389 21.7951 3.85687 21.891 4.04503C22 4.25894 22 4.53897 22 5.09902V6.89902C22 7.45908 22 7.7391 21.891 7.95301C21.7951 8.14118 21.6422 8.29416 21.454 8.39003C21.2401 8.49902 20.9601 8.49902 20.4 8.49902H3.6C3.03995 8.49902 2.75992 8.49902 2.54601 8.39003C2.35785 8.29416 2.20487 8.14118 2.10899 7.95301C2 7.7391 2 7.45908 2 6.89902V5.09902C2 4.53897 2 4.25894 2.10899 4.04503C2.20487 3.85687 2.35785 3.70389 2.54601 3.60802C2.75992 3.49902 3.03995 3.49902 3.6 3.49902ZM9.6 11.999H14.4C14.9601 11.999 15.2401 11.999 15.454 12.108C15.6422 12.2039 15.7951 12.3569 15.891 12.545C16 12.7589 16 13.039 16 13.599V14.399C16 14.9591 16 15.2391 15.891 15.453C15.7951 15.6412 15.6422 15.7942 15.454 15.89C15.2401 15.999 14.9601 15.999 14.4 15.999H9.6C9.03995 15.999 8.75992 15.999 8.54601 15.89C8.35785 15.7942 8.20487 15.6412 8.10899 15.453C8 15.2391 8 14.9591 8 14.399V13.599C8 13.039 8 12.7589 8.10899 12.545C8.20487 12.3569 8.35785 12.2039 8.54601 12.108C8.75992 11.999 9.03995 11.999 9.6 11.999Z"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>

                                        <svg
                                            className={styles.reviewformFormSelectArrow}
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

                                        <select className={styles.reviewformFormInput}>
                                            <option disabled selected>
                                                Выберите рацион
                                            </option>
                                            <option>Рацион сбалансированный</option>
                                            <option>Рацион детокс</option>
                                            <option>Рацион для похудения</option>
                                            <option>Рацион для набора массы</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={cn(styles.reviewformFormInputInner, styles.full)}>
                                    <p className={styles.reviewformFormInputText}>Что вы можете рассказать о нас</p>

                                    <div className={styles.reviewformFormInputWrap}>
                                        <svg
                                            width="24"
                                            height="25"
                                            viewBox="0 0 24 25"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M10 15.499L6.92474 18.6127C6.49579 19.047 6.28131 19.2642 6.09695 19.2795C5.93701 19.2928 5.78042 19.2285 5.67596 19.1067C5.55556 18.9662 5.55556 18.661 5.55556 18.0506V16.4906C5.55556 15.943 5.10707 15.5467 4.5652 15.4673V15.4673C3.25374 15.2752 2.22378 14.2453 2.03168 12.9338C2 12.7176 2 12.4595 2 11.9435V7.29902C2 5.61887 2 4.77879 2.32698 4.13705C2.6146 3.57257 3.07354 3.11362 3.63803 2.826C4.27976 2.49902 5.11984 2.49902 6.8 2.49902H14.2C15.8802 2.49902 16.7202 2.49902 17.362 2.826C17.9265 3.11362 18.3854 3.57257 18.673 4.13705C19 4.77879 19 5.61887 19 7.29902V11.499M19 22.499L16.8236 20.9859C16.5177 20.7732 16.3647 20.6669 16.1982 20.5915C16.0504 20.5245 15.8951 20.4758 15.7356 20.4464C15.5558 20.4133 15.3695 20.4133 14.9969 20.4133H13.2C12.0799 20.4133 11.5198 20.4133 11.092 20.1953C10.7157 20.0036 10.4097 19.6976 10.218 19.3213C10 18.8935 10 18.3334 10 17.2133V14.699C10 13.5789 10 13.0189 10.218 12.591C10.4097 12.2147 10.7157 11.9088 11.092 11.717C11.5198 11.499 12.0799 11.499 13.2 11.499H18.8C19.9201 11.499 20.4802 11.499 20.908 11.717C21.2843 11.9088 21.5903 12.2147 21.782 12.591C22 13.0189 22 13.5789 22 14.699V17.4133C22 18.3452 22 18.8111 21.8478 19.1787C21.6448 19.6687 21.2554 20.0581 20.7654 20.2611C20.3978 20.4133 19.9319 20.4133 19 20.4133V22.499Z"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>

                                        <textarea
                                            className={styles.reviewformFormTextarea}
                                            placeholder="Поделитесь своими впечатлениями"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="reviewform__agree">
                                    <input type="checkbox" className={styles.checkbox} id="reviewform__agree" checked />

                                    <label htmlFor="reviewform__agree" className={styles.reviewformLabel}>
                                        Я согласен на обработку Персональных данных
                                    </label>
                                </div>

                                <div className="reviewform__buttons">
                                    <button className={cn(styles.reviewformButton, styles.media)}>
                                        Добавить к отзыву фото
                                        <svg
                                            width="25"
                                            height="25"
                                            viewBox="0 0 25 25"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13 3.49902H8.3C6.61984 3.49902 5.77976 3.49902 5.13803 3.826C4.57354 4.11362 4.1146 4.57257 3.82698 5.13705C3.5 5.77879 3.5 6.61887 3.5 8.29902V16.699C3.5 18.3792 3.5 19.2193 3.82698 19.861C4.1146 20.4255 4.57354 20.8844 5.13803 21.172C5.77976 21.499 6.61984 21.499 8.3 21.499H17.5C18.43 21.499 18.895 21.499 19.2765 21.3968C20.3117 21.1194 21.1204 20.3108 21.3978 19.2755C21.5 18.894 21.5 18.429 21.5 17.499M19.5 8.49902V2.49902M16.5 5.49902H22.5M11 8.99902C11 10.1036 10.1046 10.999 9 10.999C7.89543 10.999 7 10.1036 7 8.99902C7 7.89445 7.89543 6.99902 9 6.99902C10.1046 6.99902 11 7.89445 11 8.99902ZM15.49 12.4172L7.03115 20.1071C6.55536 20.5396 6.31747 20.7559 6.29643 20.9432C6.27819 21.1056 6.34045 21.2667 6.46319 21.3746C6.60478 21.499 6.92628 21.499 7.56929 21.499H16.956C18.3951 21.499 19.1147 21.499 19.6799 21.2572C20.3894 20.9537 20.9547 20.3885 21.2582 19.6789C21.5 19.1138 21.5 18.3942 21.5 16.955C21.5 16.4708 21.5 16.2287 21.4471 16.0032C21.3805 15.7198 21.253 15.4544 21.0733 15.2254C20.9303 15.0432 20.7412 14.892 20.3631 14.5895L17.5658 12.3517C17.1874 12.0489 16.9982 11.8976 16.7898 11.8441C16.6061 11.797 16.4129 11.8031 16.2325 11.8617C16.0279 11.9282 15.8486 12.0912 15.49 12.4172Z"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    </button>

                                    <button className={styles.reviewformButton}>
                                        Оставить отзыв
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4 11.999H20M20 11.999L14 5.99902M20 11.999L14 17.999"
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

                        <div className={styles.reviewformImg}>
                            <img src="img/reviewform-img.png" alt="img" />
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.banner}>
                <div className={base.container}>
                    <div className={styles.banner2Inner}>
                        <img src="img/foods.png" alt="img" className={cn(styles.banner__food, styles.small)} />

                        <div className={styles.bannerContent}>
                            <h2 className={styles.bannerTitle}>
                                <span>Заказать еду легко Выбирайте</span>
                                <span>
                                    программу <span className={styles.green}>и достигайте цели</span>
                                </span>
                            </h2>

                            <p className={styles.bannerText}>
                                Меню с КБЖУ: креветки, авокадо, свежие ягоды и другие премиальные продукты.
                            </p>

                            <button className={styles.bannerLink}>
                                Узнать подробнее
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
            </section>
        </>
    );
};

export default ReviewsPage;
