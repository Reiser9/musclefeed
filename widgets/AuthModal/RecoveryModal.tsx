'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './index.module.scss';

import { ArrowRight, Lock, Mail } from '@/shared/icons';

import { CODE, EMAIL, PASSWORD } from '@/shared/consts/VALIDATIONS_FORM';
import { useAuth } from '@/features/user';

import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';

type Props = {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    loginCallback?: () => void;
};

type FormData = {
    email: string;
    code: string;
    password: string;
};

const RecoveryModal: React.FC<Props> = ({ value, setValue, loginCallback = () => {} }) => {
    const [step, setStep] = React.useState(1);
    const [email, setEmail] = React.useState('');
    const [verifyCode, setVerifyCode] = React.useState('');
    const { sendRecoveryCode, verifyRecoveryCode, changeRecoveryPassword } = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const { email, code, password } = data || {};

        if (step === 1) {
            setEmail(email);
            sendRecoveryCode(email, () => setStep(2));
        } else if (step === 2) {
            const newCode = await verifyRecoveryCode(email, code, () => setStep(3));

            if (newCode) {
                setVerifyCode(newCode);
            }
        } else if (step === 3) {
            changeRecoveryPassword(email, verifyCode, password, () => {
                setValue(false);
                setEmail('');
                setVerifyCode('');
            });
        }
    };

    return (
        <Modal value={value} setValue={setValue}>
            <div className={styles.modalAuthForm}>
                <Text variant="h3" upper>
                    Восстановить пароль
                </Text>

                <div className={styles.modalAuthText}>
                    Вспомнили пароль? <button onClick={loginCallback}>Авторизация</button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
                    {step === 1 && (
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
                    )}

                    {step === 2 && (
                        <Input
                            {...register('code', CODE)}
                            error={!!errors.code}
                            errorMessage={errors.code?.message}
                            icon={<Mail />}
                            placeholder="123456"
                            full
                            title="Введите код подтверждения"
                            value={watch('code', '')}
                        />
                    )}

                    {step === 3 && (
                        <Input
                            {...register('password', PASSWORD)}
                            error={!!errors.password}
                            errorMessage={errors.password?.message}
                            icon={<Lock />}
                            placeholder="********"
                            full
                            type="password"
                            title="Придумайте новый пароль"
                            value={watch('password', '')}
                        />
                    )}

                    <Button full>
                        {step === 1 && 'Напомнить пароль'}
                        {step === 2 && 'Подтвердить'}
                        {step === 3 && 'Изменить пароль'}
                        <ArrowRight />
                    </Button>
                </form>

                {step === 2 && (
                    <button className={styles.recoveryPassword} onClick={() => sendRecoveryCode(email)}>
                        Выслать код повторно
                    </button>
                )}
            </div>
        </Modal>
    );
};

export default RecoveryModal;
