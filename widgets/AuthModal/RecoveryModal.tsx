'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import styles from './index.module.scss';

import { ArrowRight, Lock, Mail } from '@/shared/icons';
import { useAuth } from '@/features/user';
import { useValidationMessages } from '@/shared/consts/VALIDATIONS_FORM';
import { useAppSelector } from '@/shared/hooks/useRedux';

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
    const t = useTranslations('Recovery');
    const { CODE, EMAIL, PASSWORD } = useValidationMessages();
    const language = useAppSelector(state => state.app.language);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const { email, code, password } = data || {};

        if (step === 1) {
            setEmail(email);
            sendRecoveryCode(language, email, () => setStep(2));
        } else if (step === 2) {
            const newCode = await verifyRecoveryCode(language, email, code, () => setStep(3));

            if (newCode) {
                setVerifyCode(newCode);
            }
        } else if (step === 3) {
            changeRecoveryPassword(language, email, verifyCode, password, () => {
                setValue(false);
                setEmail('');
                setVerifyCode('');
                setStep(1);
                reset();
            });
        }
    };

    return (
        <Modal value={value} setValue={setValue}>
            <div className={styles.modalAuthForm}>
                <Text variant="h3" upper>
                    {t('recovery_title')}
                </Text>

                <div className={styles.modalAuthText}>
                    {t('remember_password')} <button onClick={loginCallback}>{t('auth')}</button>
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
                            title={t('email')}
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
                            title={t('enter_code')}
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
                            title={t('new_password')}
                            value={watch('password', '')}
                        />
                    )}

                    <Button full>
                        {step === 1 && t('remind_password')}
                        {step === 2 && t('comfirm')}
                        {step === 3 && t('change_password')}
                        <ArrowRight />
                    </Button>
                </form>

                {step === 2 && (
                    <button className={styles.recoveryPassword} onClick={() => sendRecoveryCode(language, email)}>
                        {t('resend_code')}
                    </button>
                )}
            </div>
        </Modal>
    );
};

export default RecoveryModal;
