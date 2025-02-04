'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import Image from 'next/image';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ArrowBottom, Cross, Menu, Phone, Telegram, UserLogin, WhatsApp } from '@/shared/icons';
import { LoginModal, RecoveryModal, RegisterModal } from '../AuthModal';

const Header = () => {
    const [mobileMenu, setMobileMenu] = React.useState(false);
    const [loginModal, setLoginModal] = React.useState(false);
    const [registerModal, setRegisterModal] = React.useState(false);
    const [recoveryModal, setRecoveryModal] = React.useState(false);

    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerTop}>
                    <div className={base.container}>
                        <div className={styles.headerTopInner}>
                            <div className={styles.headerLang}>
                                <select className={styles.headerLangSelect}>
                                    <option value="ru" defaultChecked>
                                        RU
                                    </option>
                                    <option value="he">He</option>
                                </select>

                                <ArrowBottom />
                            </div>

                            <a href="tel:0515883719" className={styles.headerPhone}>
                                <Phone />
                                0515883719
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.headerBottom}>
                    <div className={base.container}>
                        <div className={styles.headerBottomInner}>
                            <Link href="/" className={styles.headerLogo}>
                                <Image src="/img/logo.png" alt="logo" fill />
                            </Link>

                            <nav className={styles.headerNav}>
                                <div className={styles.headerNavParent}>
                                    <a href="#" className={styles.headerNavLink}>
                                        Рационы
                                        <ArrowBottom />
                                    </a>

                                    <div className={styles.headerDropdown}>
                                        <a href="#" className={styles.headerDropdownLink}>
                                            Рацион сбалансированный
                                        </a>
                                        <a href="#" className={styles.headerDropdownLink}>
                                            Рацион детокс
                                        </a>
                                        <a href="#" className={styles.headerDropdownLink}>
                                            Рацион для похудения
                                        </a>
                                        <a href="#" className={styles.headerDropdownLink}>
                                            Рацион для набора массы
                                        </a>
                                    </div>
                                </div>

                                <Link href="/reviews" className={styles.headerNavLink}>
                                    Отзывы
                                </Link>

                                <a href="#" className={styles.headerNavLink}>
                                    Контакты
                                </a>

                                <a href="faq.html" className={styles.headerNavLink}>
                                    Покупателю
                                </a>
                            </nav>

                            <div className={styles.headerSocial}>
                                <a href="#" target="_blank" className={cn(styles.headerSocialLink, styles.blue)}>
                                    <Telegram />
                                </a>

                                <a
                                    href="https://wa.me/972515883719"
                                    target="_blank"
                                    className={cn(styles.headerSocialLink, styles.green)}
                                >
                                    <WhatsApp />
                                </a>

                                <button
                                    className={cn(styles.headerSocialLink, styles.orange, styles.mobileOff)}
                                    onClick={() => setLoginModal(true)}
                                >
                                    <UserLogin />
                                </button>

                                <button
                                    className={cn(styles.menuButton, styles.headerSocialLink, styles.orange)}
                                    onClick={() => setMobileMenu((prev) => !prev)}
                                >
                                    {mobileMenu ? <Cross /> : <Menu />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div
                className={cn(styles.menuMobile, {
                    [styles.active]: mobileMenu,
                })}
            >
                <div className={styles.menuMobileContent}>
                    <div className={styles.menuMobileWrap}>
                        <a href="#" className={styles.menuMobileLink}>
                            Рационы
                            <ArrowBottom />
                        </a>

                        <div className={styles.menuMobileDropdown}>
                            <a href="#" className={styles.menuMobileDropdownLink}>
                                Рацион сбалансированный
                            </a>

                            <a href="#" className={styles.menuMobileDropdownLink}>
                                Рацион детокс
                            </a>

                            <a href="#" className={styles.menuMobileDropdownLink}>
                                Рацион для похудения
                            </a>

                            <a href="#" className={styles.menuMobileDropdownLink}>
                                Рацион для набора массы
                            </a>
                        </div>
                    </div>

                    <a href="#" className={styles.menuMobileLink}>
                        Отзывы
                    </a>

                    <a href="#" className={styles.menuMobileLink}>
                        Контакты
                    </a>

                    <div className={styles.menuMobileWrap}>
                        <a href="#" className={styles.menuMobileLink}>
                            Покупателю
                            <ArrowBottom />
                        </a>

                        <div className={styles.menuMobileDropdown}>
                            <a href="#" className={styles.menuMobileDropdownLink}>
                                Рацион сбалансированный
                            </a>

                            <a href="#" className={styles.menuMobileDropdownLink}>
                                Рацион детокс
                            </a>

                            <a href="#" className={styles.menuMobileDropdownLink}>
                                Рацион для похудения
                            </a>

                            <a href="#" className={styles.menuMobileDropdownLink}>
                                Рацион для набора массы
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <LoginModal
                value={loginModal}
                setValue={setLoginModal}
                recoveryCallback={() => {
                    setLoginModal(false);
                    setRecoveryModal(true);
                }}
                registerCallback={() => {
                    setLoginModal(false);
                    setRegisterModal(true);
                }}
            />

            <RegisterModal
                value={registerModal}
                setValue={setRegisterModal}
                loginCallback={() => {
                    setRegisterModal(false);
                    setLoginModal(true);
                }}
            />

            <RecoveryModal
                value={recoveryModal}
                setValue={setRecoveryModal}
                loginCallback={() => {
                    setRecoveryModal(false);
                    setLoginModal(true);
                }}
            />
        </>
    );
};

export default Header;
