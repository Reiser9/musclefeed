'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import styles from './index.module.scss';

import type { LoginDTO } from '@/entities/user/auth';
import { ArrowRight, Lock, Mail } from '@/shared/icons';
import { useAuth } from '@/features/user';
import { useValidationMessages } from '@/shared/consts/VALIDATIONS_FORM';

import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';

type Props = {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    registerCallback?: () => void;
    recoveryCallback?: () => void;
};

const LoginModal: React.FC<Props> = ({ value, setValue, registerCallback = () => {}, recoveryCallback = () => {} }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginDTO>();

    const { login, authIsLoading } = useAuth();
    const t = useTranslations('Login');
    const { EMAIL, PASSWORD } = useValidationMessages();

    const onSubmit: SubmitHandler<LoginDTO> = (data) => {
        login(data, () => setValue(false));
    };

    return (
        <Modal value={value} setValue={setValue}>
            <div className={styles.modalAuthForm}>
                <Text variant="h3" upper>
                    {t('login_title')}
                </Text>

                <div className={styles.modalAuthText}>
                    {t('login_dont_have_account')} <button onClick={registerCallback}>{t('register')}</button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
                    <Input
                        {...register('email', EMAIL)}
                        error={!!errors.email}
                        errorMessage={errors.email?.message}
                        icon={<Mail />}
                        placeholder="mail@mail.cpm"
                        full
                        title={t('email')}
                        value={watch('email', '')}
                    />

                    <Input
                        {...register('password', PASSWORD)}
                        error={!!errors.password}
                        errorMessage={errors.password?.message}
                        icon={<Lock />}
                        placeholder="********"
                        full
                        title={t('password')}
                        type="password"
                        value={watch('password', '')}
                    />

                    <Button full>
                        {t('login')}
                        <ArrowRight />
                    </Button>
                </form>

                <button className={styles.recoveryPassword} onClick={recoveryCallback} disabled={authIsLoading}>
                    {t('forgot_password')}
                </button>
            </div>
        </Modal>
    );
};

export default LoginModal;
