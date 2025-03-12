'use client';

import React from 'react';

import styles from './index.module.scss';

import { Text } from '../Text';
import { Button } from '../Button';
import Modal from './Modal';
import { useAppSelector } from '@/shared/hooks/useRedux';

type Props = {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    title?: string;
    callback: () => void;
};

const ConfirmModal: React.FC<Props> = ({ value, setValue, title, callback = () => {} }) => {
    const language = useAppSelector((state) => state.app.language);

    return (
        <Modal value={value} setValue={setValue}>
            {title && <Text>{title}</Text>}

            <div className={styles.modalButtons}>
                <Button
                    onClick={() => {
                        callback();
                        setValue(false);
                    }}
                    full
                >
                    {language === 'ru' ? 'Да' : 'כן.'}
                </Button>

                <Button full onClick={() => setValue(false)}>
                    {language === 'ru' ? 'Нет' : 'לא.'}
                </Button>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
