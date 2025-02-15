'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import styles from './index.module.scss';

import type { RegisterDTO } from '@/entities/user/auth';
import { ArrowRight, Lock, Mail } from '@/shared/icons';
import { useAuth } from '@/features/user';
import { useValidationMessages } from '@/shared/consts/VALIDATIONS_FORM';

import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Modal } from '@/shared/ui/Modal';
import { useAppSelector } from '@/shared/hooks/useRedux';

type Props = {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    loginCallback?: () => void;
};

const RegisterModal: React.FC<Props> = ({ value, setValue, loginCallback = () => {} }) => {
    const [passwordAgain, setPasswordAgain] = React.useState('');
    const [passwordAgainError, setPasswordAgainError] = React.useState('');
    const [registerAgree, setRegisterAgree] = React.useState(true);

    const language = useAppSelector((state) => state.app.language);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterDTO>();

    const { register: registerRequest, authIsLoading } = useAuth();
    const t = useTranslations('Register');
    const validation = useTranslations('Validation');
    const { EMAIL, PASSWORD } = useValidationMessages();

    const onSubmit: SubmitHandler<RegisterDTO> = (data) => {
        if (!registerAgree) return;

        const { password } = data;

        if (password !== passwordAgain) {
            return setPasswordAgainError(validation('passwords_dont_match'));
        }

        setPasswordAgainError('');

        registerRequest({ ...data, language: (language.toUpperCase() as 'RU') || 'HE' }, () => setValue(false));
    };

    return (
        <Modal value={value} setValue={setValue}>
            <div className={styles.modalAuthForm}>
                <Text variant="h3" upper>
                    {t('register_title')}
                </Text>

                <div className={styles.modalAuthText}>
                    {t('already_registered')} <button onClick={loginCallback}>{t('auth')}</button>
                </div>

                <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
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
                        title={t('generate_password')}
                        type="password"
                        value={watch('password', '')}
                    />

                    <Input
                        value={passwordAgain}
                        setValue={setPasswordAgain}
                        icon={<Lock />}
                        placeholder="********"
                        full
                        title={t('repeat_password')}
                        type="password"
                        error={!!passwordAgainError}
                        errorMessage={passwordAgainError}
                    />

                    <Checkbox id="registerAgree" label={t('agree')} value={registerAgree} setValue={setRegisterAgree} />

                    <Button full disabled={!registerAgree || authIsLoading}>
                        {t('register')}
                        <ArrowRight />
                    </Button>
                </form>
            </div>
        </Modal>
    );
};

export default RegisterModal;
