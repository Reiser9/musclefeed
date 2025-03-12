'use client';

import React, { HTMLAttributes } from 'react';
import cn from 'classnames';
import { useTranslations } from 'next-intl';

import styles from './index.module.scss';

import { Cross } from '@/shared/icons';

import { Text } from '../Text';

type Props = {
    text?: string;
    icon?: React.ReactNode;
    danger?: boolean;
    small?: boolean;
    children?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const NotContent: React.FC<Props> = ({
    text,
    icon,
    danger = false,
    small = true,
    children,
    ...props
}) => {
    const t =  useTranslations("Validation");
    
    return (
        <div
            className={cn(styles.emptyContent, {
                [styles.danger]: danger,
            })}
            {...props}
        >
            <div
                className={cn(styles.emptyImgInner, {
                    [styles.small]: small,
                })}
            >
                {icon ? icon : <Cross />}
            </div>

            <Text center variant="text2">
                {text ? text : t('not_content')}
            </Text>

            {children}
        </div>
    );
};

export default NotContent;
