'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

import { Cross } from '@/shared/icons';

type Props = {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    size?: 'default' | 'big';
    contentClass?: string;
    children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ value, setValue, size = 'default', contentClass, children }) => {
    return (
        <div
            className={cn(styles.modal, {
                [styles.active]: value,
            })}
            onClick={() => setValue(false)}
        >
            <div className={cn(styles.modalInner, styles[size])}>
                <div className={cn(styles.modalContent, contentClass)} onClick={(e) => e.stopPropagation()}>
                    <button className={styles.modalClose} onClick={() => setValue(false)}>
                        <Cross />
                    </button>

                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
