'use client';

import React from 'react';
import Link from 'next/link';

import styles from './index.module.scss';

import type { City } from '../model';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Delete } from '@/shared/icons';
import { ConfirmModal } from '@/shared/ui/Modal';

type Props = {
    data: City;
    deleteCallback: () => void;
};

const CityAdminItem: React.FC<Props> = ({ data, deleteCallback }) => {
    const [deleteModal, setDeleteModal] = React.useState(false);

    const { id, name } = data || {};

    const language = useAppSelector((state) => state.app.language);

    return (
        <>
            <div className={styles.cityAdminItem}>
                <Link href={`/${language}/admin/cities/edit/${id}`}>{name[language]}</Link>

                <button className={styles.cityAdminItemDelete} onClick={() => setDeleteModal(true)}>
                    <Delete />
                </button>
            </div>

            <ConfirmModal
                value={deleteModal}
                setValue={setDeleteModal}
                callback={deleteCallback}
                title={`Вы действительно хотите удалить город ${name[language]}`}
            />
        </>
    );
};

export default CityAdminItem;
