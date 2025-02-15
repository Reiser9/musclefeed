'use client';

import React, { SetStateAction } from 'react';

import styles from './index.module.scss';

type Props = {
    id: string;
    label?: string;
    value?: boolean;
    setValue?: React.Dispatch<SetStateAction<boolean>>;
};

const Checkbox: React.FC<Props> = ({ id, label, value, setValue, ...props }) => {
    return (
        <div className={styles.checkboxInner}>
            <input
                type="checkbox"
                className={styles.checkbox}
                id={id}
                checked={value}
                onChange={(e) => setValue && setValue(e.target.checked)}
                {...props}
            />

            <label htmlFor={id} className={styles.checkboxLabel}>
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
