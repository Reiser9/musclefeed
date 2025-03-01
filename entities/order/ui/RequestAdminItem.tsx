'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

import type { OrderRequest } from '../model';

import { Text } from '@/shared/ui/Text';
import Link from 'next/link';
import { useAppSelector } from '@/shared/hooks/useRedux';

type Props = {
    data: OrderRequest;
};

const RequestAdminItem: React.FC<Props> = ({ data }) => {
    const language = useAppSelector(state => state.app.language);
    const { comment, isProcessed, id, order } = data || {};
    const { email, phone } = order || {};

    return (
        <div
            className={cn(styles.orderRequestItem, {
                [styles.disabled]: isProcessed,
            })}
        >
            <Link href={`/${language}/admin/request/edit/${id}`}>
                ID: {id}
            </Link>

            <Text variant="text2">
                Почта: {email}
            </Text>

            <Text variant="text2">
                Телефон: {phone}
            </Text>

            <Text variant="text2">
                Комментарий: {comment}
            </Text>
        </div>
    );
};

export default RequestAdminItem;
