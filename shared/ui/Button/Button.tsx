'use client';

import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import Link from 'next/link';

import styles from './index.module.scss';

type Props = {
    disabled?: boolean;
    href?: string;
    full?: boolean;
    small?: boolean;
    color?: 'default' | 'green' | 'grey';
    children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement> &
    AnchorHTMLAttributes<HTMLAnchorElement>;

const Button: React.FC<Props> = ({
    disabled = false,
    full = false,
    small = false,
    href,
    color = 'default',
    children,
    className,
    ...props
}) => {
    const defaultClasses = cn(styles.button, styles[color], className, {
        [styles.disabled]: disabled,
        [styles.full]: full,
        [styles.small]: small,
    });

    if (disabled) {
        return <button className={defaultClasses}>{children}</button>;
    }

    if (href) {
        return (
            <Link prefetch={false} href={href} className={defaultClasses} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button className={defaultClasses} {...props}>
            {children}
        </button>
    );
};

export default Button;
