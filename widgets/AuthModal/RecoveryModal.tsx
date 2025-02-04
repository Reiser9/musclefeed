'use client';

import React from 'react';

import styles from './index.module.scss';

import { ArrowRight, Mail } from '@/shared/icons';

import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';

type Props = {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    loginCallback?: () => void;
};

const RecoveryModal: React.FC<Props> = ({ value, setValue, loginCallback = () => {} }) => {
    const [email, setEmail] = React.useState('');

    return (
        <Modal value={value} setValue={setValue}>
            <div className={styles.modalAuthForm}>
                <Text variant="h3" upper>
                    Войти в личный кабинет
                </Text>

                <div className={styles.modalAuthText}>
                    Вспомнили пароль? <button onClick={loginCallback}>Авторизация</button>
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

                    <Button full>
                        Напомнить пароль
                        <ArrowRight />
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default RecoveryModal;
