'use client';

import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

import styles from './index.module.scss';

import type { Menu } from '../model';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Delete } from '@/shared/icons';

import { Text } from '@/shared/ui/Text';
import { ConfirmModal } from '@/shared/ui/Modal';

type Props = {
    data: Menu;
    deleteCallback?: () => void;
};

const MenuAdminItem: React.FC<Props> = ({ data, deleteCallback = () => {} }) => {
    const [deleteModal, setDeleteModal] = React.useState(false);

    const { id, isPublished, adminName, calories, cycleStartDate, daysCount } = data || {};
    const language = useAppSelector((state) => state.app.language);

    return (
        <>
            <div className={styles.menuAdminItem}>
                <Link href={`/${language}/admin/menu/edit/${id}`}>{adminName}</Link>

                <Text variant="text2">Калории: {calories}</Text>

                <Text variant="text2">Цикл с: {dayjs(cycleStartDate).format('DD.MM.YYYY')}</Text>

                <Text variant="text2">Дней: {daysCount}</Text>

                <Text variant="text2">Опубликовано: {isPublished ? 'Да' : 'Нет'}</Text>

                <button className={styles.deleteButton} onClick={() => setDeleteModal(true)}>
                    <Delete />
                </button>
            </div>

            <ConfirmModal
                value={deleteModal}
                setValue={setDeleteModal}
                callback={deleteCallback}
                title={`Вы действительно хотите удалить отзыв ${adminName}`}
            />
        </>
    );
};

export default MenuAdminItem;
