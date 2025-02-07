'use client';

import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

type Props = {
    icon?: React.ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'text1' | 'text2' | 'text3';
    color?: '' | 'error' | 'warn' | 'main' | 'white';
    center?: boolean;
    fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    upper?: boolean;
    children: React.ReactNode;
} & HTMLAttributes<HTMLParagraphElement>;

const Text: React.FC<Props> = ({
    variant = 'text1',
    color = '',
    center = false,
    fontWeight,
    upper,
    children,
    className,
}) => {
    return (
        <p
            className={cn(styles.text, styles[variant], styles[color], className, {
                [styles.center]: center,
                [styles.upper]: upper,
            })}
            style={{ fontWeight: fontWeight }}
        >
            {children}
        </p>
    );
};

export default Text;
