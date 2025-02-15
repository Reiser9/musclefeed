'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

import { ArrowBottom, Error } from '@/shared/icons';

type Props = {
    value?: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
    options: { id: number; name: string }[];
    title?: string;
    icon?: React.ReactNode;
    error?: boolean;
    errorMessage?: string;
    full?: boolean;
};

const Select: React.FC<Props> = ({
    value,
    setValue,
    title,
    options,
    icon,
    error = false,
    errorMessage,
    full = false,
    ...props
}) => {
    return (
        <div
            className={cn(styles.selectInner, {
                [styles.full]: full,
            })}
        >
            {title && <p className={styles.selectTitle}>{title}</p>}

            <div className={styles.selectWrapper}>
                {icon && icon}

                <ArrowBottom className={styles.selectArrow} />

                <select
                    className={cn(styles.select, {
                        [styles.withIcon]: !!icon,
                    })}
                    value={value}
                    onChange={(e) => setValue && setValue(e.target.value)}
                    {...props}
                >
                    {options?.map((elem, key) => (
                        <option key={key} value={elem.id}>
                            {elem.name}
                        </option>
                    ))}
                </select>
            </div>

            {error && errorMessage && (
                <p className={styles.selectMessage}>
                    <Error />
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export default Select;
