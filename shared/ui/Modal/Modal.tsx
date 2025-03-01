'use client';

import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

import styles from './index.module.scss';

import { Cross } from '@/shared/icons';

type Props = {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    size?: 'default' | 'big';
    withClose?: boolean;
    contentClass?: string;
    children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ value, setValue, size = 'default', withClose = true, contentClass, children }) => {
    if (!value) return;

    return ReactDOM.createPortal(
        <div className={styles.modal} onClick={() => setValue(false)}>
            <div className={cn(styles.modalInner, styles[size])}>
                <div className={cn(styles.modalContent, contentClass)} onClick={(e) => e.stopPropagation()}>
                    {withClose && (
                        <button className={styles.modalClose} onClick={() => setValue(false)}>
                            <Cross />
                        </button>
                    )}

                    {children}
                </div>
            </div>
        </div>,
        document.body,
    );
};

export default Modal;
