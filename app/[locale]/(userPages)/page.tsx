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

            {/* <div className="modal" data-modal="makeorder">
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
            </div> */}
        </>
    );
};

export default MainPage;
