'use client';

import React from 'react';

import styles from './index.module.scss';

import { ArrowRight, Lock, Mail } from '@/shared/icons';

import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';

type Props = {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    registerCallback?: () => void;
    recoveryCallback?: () => void;
};

const LoginModal: React.FC<Props> = ({ value, setValue, registerCallback = () => {}, recoveryCallback = () => {} }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <Modal value={value} setValue={setValue}>
            <div className={styles.modalAuthForm}>
                <Text variant="h3" upper>
                    Войти в личный кабинет
                </Text>

                <div className={styles.modalAuthText}>
                    Еще не создали аккаунт? <button onClick={registerCallback}>Регистрация</button>
                </div>

                <div className={styles.authForm}>
                    <Input
                        value={email}
                        setValue={setEmail}
                        icon={<Mail />}
                        placeholder="mail@mail.cpm"
                        full
                        title="Ваша почта"
                    />

                    <Input
                        value={password}
                        setValue={setPassword}
                        icon={<Lock />}
                        placeholder="********"
                        full
                        title="Ваш пароль"
                        type="password"
                    />

                    <Button full>
                        Войти
                        <ArrowRight />
                    </Button>

                    <button className={styles.recoveryPassword} onClick={recoveryCallback}>
                        Забыли пароль?
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default LoginModal;
