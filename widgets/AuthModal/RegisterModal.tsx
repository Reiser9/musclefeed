'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './index.module.scss';

import type { RegisterDTO } from '@/entities/user/auth';
import { EMAIL, PASSWORD } from '@/shared/consts/VALIDATIONS_FORM';
import { ArrowRight, Lock, Mail } from '@/shared/icons';
import { useAuth } from '@/features/user';

import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Modal } from '@/shared/ui/Modal';

type Props = {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    loginCallback?: () => void;
};

const RegisterModal: React.FC<Props> = ({ value, setValue, loginCallback = () => {} }) => {
    const [passwordAgain, setPasswordAgain] = React.useState('');
    const [passwordAgainError, setPasswordAgainError] = React.useState('');
    const [registerAgree, setRegisterAgree] = React.useState(true);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterDTO>();

    const { register: registerRequest, authIsLoading } = useAuth();

    const onSubmit: SubmitHandler<RegisterDTO> = (data) => {
        if (!registerAgree) return;

        const { password } = data;

        if (password !== passwordAgain) {
            return setPasswordAgainError('Пароли не совпадают');
        }

        setPasswordAgainError('');

        registerRequest({ ...data, language: 'RU' }, () => setValue(false));
    };

    return (
        <Modal value={value} setValue={setValue}>
            <div className={styles.modalAuthForm}>
                <Text variant="h3" upper>
                    Регистрация на сайте
                </Text>

                <div className={styles.modalAuthText}>
                    Вы уже зарегистрированы? <button onClick={loginCallback}>Авторизация</button>
                </div>

                <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
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
                        title="Придумайте пароль"
                        type="password"
                        value={watch('password', '')}
                    />

                    <Input
                        value={passwordAgain}
                        setValue={setPasswordAgain}
                        icon={<Lock />}
                        placeholder="********"
                        full
                        title="Повторите пароль"
                        type="password"
                        error={!!passwordAgainError}
                        errorMessage={passwordAgainError}
                    />

                    <Checkbox
                        id="registerAgree"
                        label="Я согласен на обработку Персональных данных"
                        value={registerAgree}
                        setValue={setRegisterAgree}
                    />

                    <Button full disabled={!registerAgree || authIsLoading}>
                        Зарегистрироваться
                        <ArrowRight />
                    </Button>
                </form>
            </div>
        </Modal>
    );
};

export default RegisterModal;
