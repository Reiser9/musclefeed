'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './index.module.scss';

import type { LoginDTO } from '@/entities/user/auth';
import { ArrowRight, Lock, Mail } from '@/shared/icons';
import { useAuth } from '@/features/user';
import { EMAIL, PASSWORD } from '@/shared/consts/VALIDATIONS_FORM';

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

    const onSubmit: SubmitHandler<LoginDTO> = (data) => {
        login(data, () => setValue(false));
    };

    return (
        <Modal value={value} setValue={setValue}>
            <div className={styles.modalAuthForm}>
                <Text variant="h3" upper>
                    Войти в личный кабинет
                </Text>

                <div className={styles.modalAuthText}>
                    Еще не создали аккаунт? <button onClick={registerCallback}>Регистрация</button>
                </div>

                <form onClick={handleSubmit(onSubmit)} className={styles.authForm}>
                    <Input
                        {...register('email', EMAIL)}
                        error={!!errors.email}
                        errorMessage={errors.email?.message}
                        icon={<Mail />}
                        placeholder="mail@mail.cpm"
                        full
                        title="Ваша почта"
                        value={watch('email', '')}
                    />

                    <Input
                        {...register('password', PASSWORD)}
                        error={!!errors.password}
                        errorMessage={errors.password?.message}
                        icon={<Lock />}
                        placeholder="********"
                        full
                        title="Ваш пароль"
                        type="password"
                        value={watch('password', '')}
                    />

                    <Button full>
                        Войти
                        <ArrowRight />
                    </Button>
                </form>

                <button className={styles.recoveryPassword} onClick={recoveryCallback} disabled={authIsLoading}>
                    Забыли пароль?
                </button>
            </div>
        </Modal>
    );
};

export default LoginModal;
