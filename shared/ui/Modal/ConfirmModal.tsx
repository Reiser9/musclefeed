'use client';

import React from 'react';

import styles from './index.module.scss';

import { Text } from '../Text';
import { Button } from '../Button';
import Modal from './Modal';

type Props = {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    title?: string;
    callback: () => void;
};

const ConfirmModal: React.FC<Props> = ({ value, setValue, title, callback = () => {} }) => {
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
                    Да
                </Button>

                <Button full onClick={() => setValue(false)}>
                    Нет
                </Button>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
