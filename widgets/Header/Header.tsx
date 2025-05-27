'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ArrowBottom, Cross, Exit, Menu, Phone, UserLogin } from '@/shared/icons';
import { LoginModal, RecoveryModal, RegisterModal, VerifyModal } from '../AuthModal';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useRedux';
import { useAdminSettings } from '@/features/admin';
import { useAuth } from '@/features/user';
import { setLanguage } from '@/store/slices/app';

const Header = () => {
    const [mobileMenu, setMobileMenu] = React.useState(false);
    const [loginModal, setLoginModal] = React.useState(false);
    const [registerModal, setRegisterModal] = React.useState(false);
    const [recoveryModal, setRecoveryModal] = React.useState(false);

    const dispatch = useAppDispatch();
    const { isAuth, isVerified } = useAppSelector((state) => state.app);
    const appLanguage = useAppSelector((state) => state.app.language);
    const { authIsLoading, logout } = useAuth();
    const language = useAppSelector((state) => state.app.language);
    const router = useRouter();

    const { getSettings } = useAdminSettings();

    const { data: settings } = useQuery({
        queryKey: ['settings'],
        queryFn: () => getSettings(),
        gcTime: 0,
        refetchOnMount: true,
    });

    const { socials, phoneNumber } = settings || {};

    const t = useTranslations('Header');

    const pathname = usePathname();
    const locale = React.useMemo(() => (pathname.split('/')[1] === 'he' ? 'he' : 'ru'), [pathname]);

    const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as 'ru' | 'he';

        dispatch(setLanguage(value));
        const newPath = pathname.replace(`/${locale}`, `/${value}`);
        router.replace(newPath);
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerTop}>
                    <div className={base.container}>
                        <div className={styles.headerTopInner}>
                            <div className={styles.headerLang}>
                                <select
                                    className={styles.headerLangSelect}
                                    value={appLanguage}
                                    onChange={changeLanguage}
                                >
                                    <option value="ru">Ru</option>
                                    <option value="he">He</option>
                                </select>

                                <ArrowBottom />
                            </div>

                            <a href={`tel:${phoneNumber}`} className={styles.headerPhone}>
                                <Phone />
                                {phoneNumber}
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.headerBottom}>
                    <div className={base.container}>
                        <div className={styles.headerBottomInner}>
                            <Link
                                href={`/${locale}`}
                                className={styles.headerLogo}
                                onClick={() => setMobileMenu(false)}
                            >
                                <Image src="/img/logo.png" alt="logo" fill />
                            </Link>

                            <nav className={styles.headerNav}>
                                {/* <div className={styles.headerNavParent}>
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
                                </div> */}

                                <Link href={`/${locale}/menu`} className={cn(styles.headerNavLink, styles.highlight)}>
                                    {t('menu')}
                                </Link>

                                <Link href={`/${locale}/reviews`} className={styles.headerNavLink}>
                                    {t('reviews')}
                                </Link>

                                {/* <a href="#" className={styles.headerNavLink}>
                                    {t('contacts')}
                                </a> */}

                                <Link href={`/${locale}/faq`} className={styles.headerNavLink}>
                                    {t('buyer')}
                                </Link>
                            </nav>

                            <div className={styles.headerSocial}>
                                {socials?.slice(0, 2).map((data) => (
                                    <a
                                        key={data.id}
                                        href={data.link}
                                        target="_blank"
                                        className={cn(styles.headerSocialLink, styles.headerSocialNav, styles.green)}
                                    >
                                        <Image src={data.icon} alt={data.name} fill />
                                    </a>
                                ))}

                                {!isAuth && (
                                    <button
                                        className={cn(styles.headerSocialLink, styles.orange)}
                                        onClick={() => setLoginModal(true)}
                                    >
                                        <UserLogin />
                                    </button>
                                )}

                                {isAuth && (
                                    <>
                                        <Link
                                            href={`/${locale}/account`}
                                            className={cn(styles.headerSocialLink, styles.orange)}
                                            onClick={() => setMobileMenu(false)}
                                        >
                                            <UserLogin />
                                        </Link>

                                        <button
                                            className={cn(styles.headerSocialLink, styles.orange, {
                                                [styles.disabled]: authIsLoading,
                                            })}
                                            onClick={() => logout(language)}
                                        >
                                            <Exit />
                                        </button>
                                    </>
                                )}

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
                    {/* <div className={styles.menuMobileWrap}>
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
                    </div> */}

                    <Link
                        href={`/${locale}/menu`}
                        className={cn(styles.menuMobileLink, styles.highlight)}
                        onClick={() => setMobileMenu(false)}
                    >
                        {t('menu')}
                    </Link>

                    <Link
                        href={`/${locale}/reviews`}
                        className={styles.menuMobileLink}
                        onClick={() => setMobileMenu(false)}
                    >
                        {t('reviews')}
                    </Link>

                    <Link
                        href={`/${locale}/faq`}
                        className={styles.menuMobileLink}
                        onClick={() => setMobileMenu(false)}
                    >
                        {t('buyer')}
                    </Link>
                </div>

                <div className={styles.headerSocialLinkMenu}>
                    {socials?.map((data) => (
                        <a
                            key={data.id}
                            href={data.link}
                            target="_blank"
                            className={cn(styles.headerSocialLink, styles.green)}
                        >
                            <Image src={data.icon} alt={data.name} fill />
                        </a>
                    ))}
                </div>
            </div>

            {!isAuth && (
                <>
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
            )}

            {isAuth && !isVerified && <VerifyModal value={true} setValue={() => {}} />}
        </>
    );
};

export default Header;
