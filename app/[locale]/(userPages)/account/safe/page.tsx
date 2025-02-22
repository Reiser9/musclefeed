'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { useTranslations } from 'next-intl';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { ChangePasswordDTO } from '@/entities/user/auth';
import { ArrowRight, ArrowRightShort, Home, Password } from '@/shared/icons';
import { AuthWrapper } from '@/shared/wrappers/InitialWrapper';
import { useAuth } from '@/features/user';
import { useValidationMessages } from '@/shared/consts/VALIDATIONS_FORM';

import { BreadcrumbLink, Breadcrumbs, BreadcrumbText } from '@/shared/ui/Breadcrumbs';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { BackLink } from '@/shared/ui/BackLink';
import { Input } from '@/shared/ui/Input';

const AccountSafe = () => {
    const [passwordAgain, setPasswordAgain] = React.useState('');
    const [passwordAgainError, setPasswordAgainError] = React.useState('');

    const { PASSWORD } = useValidationMessages();

    const language = useAppSelector((state) => state.app.language);
    const t = useTranslations("Safe");

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<ChangePasswordDTO>();

    const { changePassword } = useAuth();

    const onSubmit: SubmitHandler<ChangePasswordDTO> = (data) => {
        const { newPassword } = data;

        if (newPassword !== passwordAgain) {
            return setPasswordAgainError('Пароли не совпадают');
        }

        setPasswordAgainError('');

        changePassword(data, () => {
            reset();
            setPasswordAgain('');
        });
    };

    return (
        <AuthWrapper>
            <Breadcrumbs>
                <BreadcrumbLink href={`/${language}`}>
                    <Home />
                </BreadcrumbLink>

                <ArrowRightShort />

                <BreadcrumbLink href={`/${language}/account`}>{t('account')}</BreadcrumbLink>

                <ArrowRightShort />

                <BreadcrumbText>{t('title')}</BreadcrumbText>
            </Breadcrumbs>

            <div className={styles.safe}>
                <div className={base.container}>
                    <div className={styles.safeInner}>
                        <Text variant="h2" upper>
                            {t('title')}
                        </Text>

                        <BackLink href={`/${language}/account`} text={t('back_text')}></BackLink>

                        <div className={styles.safeContent}>
                            <form onSubmit={handleSubmit(onSubmit)} className={styles.safeSidebar}>
                                <Text variant="h4" upper color="main">
                                    {t('change_title')}
                                </Text>

                                <div className={styles.safeForm}>
                                    <Input
                                        {...register('oldPassword', PASSWORD)}
                                        error={!!errors.oldPassword}
                                        errorMessage={errors.oldPassword?.message}
                                        title={t('old_password')}
                                        placeholder="********"
                                        type="password"
                                        icon={<Password />}
                                        full
                                        value={watch('oldPassword', '')}
                                    />

                                    <Input
                                        {...register('newPassword', PASSWORD)}
                                        error={!!errors.newPassword}
                                        errorMessage={errors.newPassword?.message}
                                        title={t('new_password')}
                                        placeholder="********"
                                        type="password"
                                        icon={<Password />}
                                        full
                                        value={watch('newPassword', '')}
                                    />

                                    <Input
                                        title={t('repeat_new_password')}
                                        placeholder="********"
                                        type="password"
                                        icon={<Password />}
                                        full
                                        value={passwordAgain}
                                        setValue={setPasswordAgain}
                                        error={!!passwordAgainError}
                                        errorMessage={passwordAgainError}
                                    />
                                </div>

                                <Button full>
                                    {t('save')}
                                    <ArrowRight />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthWrapper>
    );
};

export default AccountSafe;
