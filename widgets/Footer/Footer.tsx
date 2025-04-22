'use client';

import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Email, Facebook, Instagram, Phone, Telegram, WhatsApp } from '@/shared/icons';
import { useAppSelector } from '@/shared/hooks/useRedux';

const Footer = () => {
    const t = useTranslations('Footer');
    const language = useAppSelector((state) => state.app.language);

    return (
        <footer className={styles.footer}>
            <div className={styles.footerTop}>
                <div className={base.container}>
                    <div className={styles.footerTopInner}>
                        <div className={cn(styles.footerItem, styles.footerContacts)}>
                            <div className={styles.footerLogo}>
                                <Image src="/img/logo.png" alt="logo" fill />
                            </div>

                            <div className={styles.footerContact}>
                                <Phone />

                                <div className={styles.footerContactWrap}>
                                    <p className={styles.footerContactSuptitle}>{t('our_phone')}</p>

                                    <a href="tel:0515883719" className={styles.footerContactLink}>
                                        0515883719
                                    </a>

                                    {/* <button className={styles.footerContactButton}>{t('request_call')}</button> */}
                                </div>
                            </div>

                            <div className={styles.footerContact}>
                                <Email />

                                <div className={styles.footerContactWrap}>
                                    <p className={styles.footerContactSuptitle}>{t('our_email')}</p>

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
                            {/* <p className={styles.footerItemTitle}>Наши рационы</p> */}

                            <nav className={styles.footerItemNav}>
                                <Link href={`/${language}/faq`} className={styles.footerItemNavLink}>
                                    {t('link1')}
                                </Link>

                                <Link href={`/${language}/`} className={styles.footerItemNavLink}>
                                    {t('link2')}
                                </Link>

                                <Link href={`/${language}/reviews`} className={styles.footerItemNavLink}>
                                    {t('link3')}
                                </Link>
                            </nav>
                        </div>

                        {/* <div className={styles.footerItem}>
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
                            </div> */}
                    </div>
                </div>
            </div>

            <div className={styles.footerBottom}>
                <div className={base.container}>
                    <div className={styles.footerBottomInner}>
                        <p className={styles.footerCopy}>&copy; {t('copy')}</p>

                        <p className={styles.footerText}>{t('photo')}</p>

                        <div className={styles.footerLinks}>
                            <a download target="_blank" href={`/agree-${language}.docx`} className={styles.footerLink}>
                                {t('offer')}
                            </a>

                            <a download target="_blank" href={`/policy-${language}.docx`} className={styles.footerLink}>
                                {t('privacy')}
                            </a>
                        </div>
                    </div>
                </div>

                <div className={base.container}>
                    <div className={styles.footerTextes}>
                        <p className={styles.footerText}>{t('text1')}</p>
                        <p className={styles.footerText}>{t('text2')}</p>
                        <p className={styles.footerText}>{t('text3')}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
