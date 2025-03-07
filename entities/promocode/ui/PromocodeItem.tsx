'use client';

import React from 'react';

import styles from './index.module.scss';

import type { Promocode } from '../model';
import { ConfirmModal } from '@/shared/ui/Modal';

import { Text } from '@/shared/ui/Text';
import { Delete } from '@/shared/icons';

type Props = {
    data: Promocode;
    deleteCallback: () => void;
};

const PromocodeItem: React.FC<Props> = ({ data, deleteCallback }) => {
    const [deleteModal, setDeleteModal] = React.useState(false);

    const { code, discount } = data || {};

    return (
        <>
            <div className={styles.promoItem}>
                <Text variant="text2" fontWeight={600}>
                    Промокод: {code}
                </Text>
                <Text variant="text2" fontWeight={600}>
                    Скидка: {discount}%
                </Text>

                <div className={styles.dishItemButtons}>
                    <button className={styles.deleteButton} onClick={() => setDeleteModal(true)}>
                        <Delete />
                    </button>
                </div>
            </div>

            <ConfirmModal
                value={deleteModal}
                setValue={setDeleteModal}
                callback={deleteCallback}
                title={`Вы действительно хотите удалить промокод ${code}`}
            />
        </>
    );
};

export default PromocodeItem;
