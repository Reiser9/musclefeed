'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './index.module.scss';

import { ArrowRight, Mail } from '@/shared/icons';
import { useAuth } from '@/features/user';
import { CODE } from '@/shared/consts/VALIDATIONS_FORM';

import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';

type Props = {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
};

const VerifyModal: React.FC<Props> = ({ value, setValue }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<{ code: string }>();

    const { verifyEmail, authIsLoading, logout, resendVerifyCode } = useAuth();

    const onSubmit: SubmitHandler<{ code: string }> = (data) => {
        verifyEmail(data.code);
    };

    return (
        <Modal value={value} setValue={setValue} withClose={false}>
            <div className={styles.modalAuthForm}>
                <Text variant="h3" upper>
                    Подтверждение почты
                </Text>

                <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        {...register('code', CODE)}
                        error={!!errors.code}
                        errorMessage={errors.code?.message}
                        icon={<Mail />}
                        placeholder="123456"
                        full
                        title="Введите код подтверждения"
                        value={watch('code')}
                    />

                    <Button full disabled={authIsLoading}>
                        Подтвердить
                        <ArrowRight />
                    </Button>
                </form>

                <button className={styles.recoveryPassword} disabled={authIsLoading} onClick={() => resendVerifyCode()}>
                    Выслать код повторно
                </button>

                <button className={styles.recoveryPassword} disabled={authIsLoading} onClick={() => logout()}>
                    Выйти из аккаунта
                </button>
            </div>
        </Modal>
    );
};

export default VerifyModal;
