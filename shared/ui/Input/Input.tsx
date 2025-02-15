'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

import { Error } from '@/shared/icons';

type Props = {
    value?: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
    title?: string;
    icon?: React.ReactNode;
    placeholder?: string;
    type?: 'text' | 'password' | 'number';
    error?: boolean;
    errorMessage?: string;
    full?: boolean;
    component?: 'input' | 'textarea';
};

const Input: React.FC<Props> = ({
    value,
    setValue,
    title,
    icon,
    placeholder,
    type = 'text',
    error = false,
    errorMessage,
    full = false,
    component = 'input',
    ...props
}) => {
    return (
        <div
            className={cn(styles.inputInner, {
                [styles.full]: full,
            })}
        >
            {title && <p className={styles.inputTitle}>{title}</p>}

            <div className={styles.inputWrapper}>
                {icon && icon}

                {component === 'input' ? (
                    <input
                        type={type}
                        className={cn(styles.input, { [styles.withIcon]: !!icon })}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => setValue && setValue(e.target.value)}
                        {...props}
                    />
                ) : (
                    <textarea
                        className={cn(styles.input, styles.textarea, { [styles.withIcon]: !!icon })}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => setValue && setValue(e.target.value)}
                        {...props}
                    />
                )}
            </div>

            {error && errorMessage && (
                <p className={styles.inputMessage}>
                    <Error />
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export default Input;
