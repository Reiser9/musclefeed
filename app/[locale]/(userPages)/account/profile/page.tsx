'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { AuthWrapper } from '@/shared/wrappers/InitialWrapper';
import { ArrowRight, ArrowRightShort, Home, Check2 } from '@/shared/icons';
import { useAppSelector } from '@/shared/hooks/useRedux';
import AddressItem from './ui/AddressItem';
import ProfileInfo from './ui/ProfileInfo';
import { useUserInfo } from '@/features/user';

import { BreadcrumbLink, Breadcrumbs, BreadcrumbText } from '@/shared/ui/Breadcrumbs';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { BackLink } from '@/shared/ui/BackLink';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import CreateAddressForm from './ui/CreateAddressForm';

const AccountProfile = () => {
    const [showNewAddress, setShowNewAddress] = React.useState(false);

    const queryClient = useQueryClient();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['user_addresses'] });
    };

    const language = useAppSelector((state) => state.app.language);
    const t = useTranslations('Profile');

    const { getUserAddresses, deleteUserAddress, togglePrimaryAddress } = useUserInfo();

    const { data, isPending, isError } = useQuery({
        queryKey: ['user_addresses'],
        queryFn: getUserAddresses,
    });

    const { primaryAddress, otherAddresses } = data || {};

    return (
        <AuthWrapper>
            <Breadcrumbs>
                <BreadcrumbLink href={`/${language}`}>
                    <Home />
                </BreadcrumbLink>

                <ArrowRightShort />

                <BreadcrumbLink href={`/${language}/account`}>{t('account')}</BreadcrumbLink>

                <ArrowRightShort />

                <BreadcrumbText>{t('profile')}</BreadcrumbText>
            </Breadcrumbs>

            <div className={styles.profile}>
                <div className={base.container}>
                    <div className={styles.profileInner}>
                        <Text variant="h2" upper>
                            {t('title')}
                        </Text>

                        <BackLink href={`/${language}/account`} text={t('back_text')}></BackLink>

                        <div className={styles.profileContent}>
                            <ProfileInfo />

                            <div className={styles.profileWrapper}>
                                {isPending ? (
                                    <Preloader small page />
                                ) : isError ? (
                                    <NotContent />
                                ) : (
                                    <>
                                        <Text variant="h3" upper color="main">
                                            {t('addresses_title')}
                                        </Text>

                                        <div className={styles.profileMain}>
                                            <Text>{t('main_address')}</Text>

                                            {primaryAddress ? (
                                                <div className={styles.profileAddress}>
                                                    <Check2 />

                                                    {`${primaryAddress.city.name[language]}, ${primaryAddress.street}, ${primaryAddress.house}, ${primaryAddress.floor}, ${primaryAddress.apartment}`}
                                                </div>
                                            ) : (
                                                <NotContent text="Основной адрес не создан" />
                                            )}
                                        </div>

                                        <div className={styles.profileAddresses}>
                                            <Text>{t('other_address')}</Text>

                                            {!!otherAddresses && !!otherAddresses.length ? (
                                                <div className={styles.profileAddressesInner}>
                                                    {otherAddresses.map((address) => (
                                                        <AddressItem
                                                            key={address.id}
                                                            data={address}
                                                            deleteCallback={() =>
                                                                deleteUserAddress(address.id, revalidateRequest)
                                                            }
                                                            primaryCallback={() =>
                                                                togglePrimaryAddress(address.id, revalidateRequest)
                                                            }
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                <NotContent text="Других адресов не создано" />
                                            )}

                                            {showNewAddress && (
                                                <CreateAddressForm successCallback={() => setShowNewAddress(false)} />
                                            )}

                                            {!showNewAddress && (
                                                <Button full onClick={() => setShowNewAddress(true)}>
                                                    {t('create_address')}
                                                    <ArrowRight />
                                                </Button>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthWrapper>
    );
};

export default AccountProfile;
