'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Email, Facebook, Instagram, Phone, Telegram, WhatsApp } from '@/shared/icons';

const Footer = () => {
    return (
            <footer className={styles.footer}>
                <div className={styles.footerTop}>
                    <div className={base.container}>
                        <div className={styles.footerTopInner}>
                            <div className={cn(styles.footerItem, styles.footerContacts)}>
                                <div className={styles.footerLogo}>
                                    <img src="img/logo.png" alt="logo" />
                                </div>

                                <div className={styles.footerContact}>
                                    <Phone />

                                    <div className={styles.footerContactWrap}>
                                        <p className={styles.footerContactSuptitle}>Наш телефон</p>

                                        <a href="tel:0515883719" className={styles.footerContactLink}>
                                            0515883719
                                        </a>

                                        <button className={styles.footerContactButton}>заказать звонок</button>
                                    </div>
                                </div>

                                <div className={styles.footerContact}>
                                    <Email />

                                    <div className={styles.footerContactWrap}>
                                        <p className={styles.footerContactSuptitle}>Наша почта</p>

                                        <a href="mailto:info@muscle-feed.il" className={styles.footerContactLink}>
                                            info@muscle-feed.il
                                        </a>
                                    </div>
                                </div>

                                <div className={styles.footerSocial}>
                                    <a
                                        href="https://wa.me/972515883719"
                                        target="_blank"
                                        className={cn(styles.footerSocialLink, styles.green)}
                                    >
                                        <WhatsApp />
                                    </a>

                                    <a
                                        href="https://facebook.com/musclefeed.il"
                                        target="_blank"
                                        className={styles.footerSocialLink}
                                    >
                                        <Facebook />
                                    </a>

                                    <a href="#" target="_blank" className={cn(styles.footerSocialLink, styles.blue)}>
                                        <Telegram />
                                    </a>

                                    <a
                                        href="https://instagram.com/_u/musclefd_il"
                                        target="_blank"
                                        className={styles.footerSocialLink}
                                    >
                                        <Instagram />
                                    </a>
                                </div>
                            </div>

                            <div className={styles.footerItem}>
                                <p className={styles.footerItemTitle}>Наши рационы</p>

                                <nav className={styles.footerItemNav}>
                                    <a href="#" className={styles.footerItemNavLink}>
                                        Стандартный
                                    </a>
                                    <a href="#" className={styles.footerItemNavLink}>
                                        Детокс
                                    </a>
                                    <a href="#" className={styles.footerItemNavLink}>
                                        Для набора массы
                                    </a>
                                    <a href="#" className={styles.footerItemNavLink}>
                                        Для сушки
                                    </a>
                                </nav>
                            </div>

                            <div className={styles.footerItem}>
                                <p className={styles.footerItemTitle}>Информация</p>

                                <nav className={styles.footerItemNav}>
                                    <a href="#" className={styles.footerItemNavLink}>
                                        Доставка
                                    </a>
                                    <a href="#" className={styles.footerItemNavLink}>
                                        Сертификаты
                                    </a>
                                    <a href="#" className={styles.footerItemNavLink}>
                                        Акции и скидки
                                    </a>
                                    <a href="#" className={styles.footerItemNavLink}>
                                        Меню и тарифы
                                    </a>
                                </nav>
                            </div>

                            <div className={styles.footerItem}>
                                <p className={styles.footerItemTitle}>Информация</p>

                                <nav className={styles.footerItemNav}>
                                    <a href="#" className={styles.footerItemNavLink}>
                                        Кабинет партнера
                                    </a>
                                    <a href="#" className={styles.footerItemNavLink}>
                                        Публичная оферта
                                    </a>
                                    <a href="#" className={styles.footerItemNavLink}>
                                        Способы оплаты
                                    </a>
                                    <a href="#" className={styles.footerItemNavLink}>
                                        Политика обработки персональных данных
                                    </a>
                                    <a href="#" className={styles.footerItemNavLink}>
                                        Карта сайта
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <div className={styles.container}>
                        <div className={styles.footerBottomInner}>
                            <p className={styles.footer__copy}>&copy; 2021 Copyright: MUSCLE-FEED.CO.IL</p>

                            <p className={styles.footer__text}>
                                Фотографии блюд являются вариантом сервировки блюда. Внешний вид блюда может отличаться
                                от фотографий на сайте
                            </p>

                            <div className={styles.footerLinks}>
                                <a href="#" className={styles.footerLink}>
                                    Публичная оферта
                                </a>

                                <a href="#" className={styles.footerLink}>
                                    Политика обработки персональных данных
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
    );
};

export default Footer;
