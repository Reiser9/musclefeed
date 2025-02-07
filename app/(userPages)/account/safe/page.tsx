'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ArrowRight, ArrowRightShort, Home, Password } from '@/shared/icons';
import { AuthWrapper } from '@/shared/wrappers/InitialWrapper';
import type { ChangePasswordDTO } from '@/entities/user/auth';
import { useAuth } from '@/features/user';

import { BreadcrumbLink, Breadcrumbs, BreadcrumbText } from '@/shared/ui/Breadcrumbs';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { BackLink } from '@/shared/ui/BackLink';
import { Input } from '@/shared/ui/Input';
import { PASSWORD } from '@/shared/consts/VALIDATIONS_FORM';

const AccountSafe = () => {
    const [passwordAgain, setPasswordAgain] = React.useState('');
    const [passwordAgainError, setPasswordAgainError] = React.useState('');

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
                <BreadcrumbLink href="/">
                    <Home />
                </BreadcrumbLink>

                <ArrowRightShort />

                <BreadcrumbLink href="/account">Личный кабинет</BreadcrumbLink>

                <ArrowRightShort />

                <BreadcrumbText>Безопасность</BreadcrumbText>
            </Breadcrumbs>

            <div className={styles.safe}>
                <div className={base.container}>
                    <div className={styles.safeInner}>
                        <Text variant="h2" upper>
                            Безопасность
                        </Text>

                        <BackLink href="/account" text="Назад в Личный кабинет"></BackLink>

                        <div className={styles.safeContent}>
                            <form onSubmit={handleSubmit(onSubmit)} className={styles.safeSidebar}>
                                <Text variant="h4" upper color="main">
                                    Сменить пароль
                                </Text>

                                <div className={styles.safeForm}>
                                    <Input
                                        {...register('oldPassword', PASSWORD)}
                                        error={!!errors.oldPassword}
                                        errorMessage={errors.oldPassword?.message}
                                        title="Ваш старый пароль"
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
                                        title="Новый пароль"
                                        placeholder="********"
                                        type="password"
                                        icon={<Password />}
                                        full
                                        value={watch('newPassword', '')}
                                    />

                                    <Input
                                        title="Повторите новый пароль"
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
                                    Сохранить изменения
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
