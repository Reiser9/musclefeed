'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import styles from '../index.module.scss';

import { ArrowRight, Foods, Mail, Phone, User } from '@/shared/icons';
import { useUserInfo } from '@/features/user';
import { UserShortInfoDTO } from '@/entities/user/auth';

import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';

const ProfileInfo = () => {
    const { getShortInfo, updateUserInfo } = useUserInfo();
    const t = useTranslations("Profile");

    const { data, isPending, isError } = useQuery({
        queryKey: ['user_info'],
        queryFn: getShortInfo,
    });

    const { firstName, allergies, lastName, phone, email } = data || {};

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<UserShortInfoDTO>();

    const onSubmit: SubmitHandler<UserShortInfoDTO> = (data) => {
        updateUserInfo(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.profileSidebar}>
            {isPending ? (
                <Preloader page small />
            ) : isError ? (
                <NotContent />
            ) : (
                <>
                    <Text variant="h3" upper color="main">
                        {t('contact_title')}
                    </Text>

                    <div className={styles.profileForm}>
                        <Input
                            {...register('firstName')}
                            error={!!errors.firstName}
                            errorMessage={errors.firstName?.message}
                            title={t('input_name')}
                            icon={<User />}
                            full
                            value={watch('firstName', firstName || "")}
                        />

                        <Input
                            {...register('lastName')}
                            error={!!errors.lastName}
                            errorMessage={errors.lastName?.message}
                            title={t('input_surname')}
                            icon={<User />}
                            full
                            value={watch('lastName', lastName || "")}
                        />

                        <Input
                            {...register('allergies')}
                            error={!!errors.allergies}
                            errorMessage={errors.allergies?.message}
                            title={t('input_allerg')}
                            icon={<Foods />}
                            full
                            value={watch('allergies', allergies || "")}
                        />

                        <Input
                            {...register('phone')}
                            error={!!errors.phone}
                            errorMessage={errors.phone?.message}
                            title={t('input_phone')}
                            icon={<Phone />}
                            full
                            value={watch('phone', phone || "")}
                        />

                        <Input title={t('input_email')} icon={<Mail />} full disabled value={email} />
                    </div>

                    <Button full>
                        {t('save')}
                        <ArrowRight />
                    </Button>
                </>
            )}
        </form>
    );
};

export default ProfileInfo;
