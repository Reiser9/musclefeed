'use client';

import React from 'react';
// import Image from 'next/image';
import Link from 'next/link';

import styles from './index.module.scss';

import type { Dish } from '../model';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Copy, Delete } from '@/shared/icons';

import { Text } from '@/shared/ui/Text';
import { ConfirmModal } from '@/shared/ui/Modal';

type Props = {
    data: Dish;
    copyCallback?: () => void;
    deleteCallback?: () => void;
};

const DishAdminItem: React.FC<Props> = ({ data, copyCallback = () => {}, deleteCallback = () => {} }) => {
    const [deleteModal, setDeleteModal] = React.useState(false);

    const { id, name, adminName, isPublished } = data || {};
    const language = useAppSelector((state) => state.app.language);

    return (
        <>
            <div className={styles.dishItem}>
                {/* <Link href={`/${language}/admin/dish/edit/${id}`} className={styles.dishItemImage}>
                    <Image src={picture} alt={name[language]} fill />
                </Link> */}

                <Link href={`/${language}/admin/dish/edit/${id}`} className={styles.dishItemTitle}>
                    {adminName}
                </Link>

                <Text variant="text2">Опубликован: {isPublished ? 'Да' : 'Нет'}</Text>

                <div className={styles.dishItemButtons}>
                    <button className={styles.copyButton} onClick={copyCallback}>
                        <Copy />
                    </button>

                    <button className={styles.deleteButton} onClick={() => setDeleteModal(true)}>
                        <Delete />
                    </button>
                </div>
            </div>

            <ConfirmModal
                value={deleteModal}
                setValue={setDeleteModal}
                callback={deleteCallback}
                title={`Вы действительно хотите удалить блюдо ${name[language]}`}
            />
        </>
    );
};

export default DishAdminItem;
