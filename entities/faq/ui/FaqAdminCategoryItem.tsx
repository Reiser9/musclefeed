'use client';

import React from 'react';
import Link from 'next/link';

import styles from './index.module.scss';

import type { FaqCategoryItem } from '../model';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Delete } from '@/shared/icons';

import { Text } from '@/shared/ui/Text';
import { ConfirmModal } from '@/shared/ui/Modal';

type Props = {
    data: FaqCategoryItem;
    deleteCallback?: () => void;
};

const FaqAdminCategoryItem: React.FC<Props> = ({ data, deleteCallback = () => {} }) => {
    const [deleteModal, setDeleteModal] = React.useState(false);

    const { faqCount, name, picture, id } = data || {};
    const language = useAppSelector((state) => state.app.language);

    return (
        <>
            <div className={styles.faqAdminItem}>
                <Link
                    href={`/${language}/admin/faq/category/edit/${id}`}
                    dangerouslySetInnerHTML={{ __html: picture }}
                    className={styles.faqAdminItemIcon}
                ></Link>

                <Text variant="text2">Название: {name?.ru}</Text>

                <Text variant="text2">Количество вопросов: {faqCount}</Text>

                <button className={styles.faqAdminDelete} onClick={() => setDeleteModal(true)}>
                    <Delete />
                </button>
            </div>

            <ConfirmModal
                value={deleteModal}
                setValue={setDeleteModal}
                callback={deleteCallback}
                title={`Вы действительно хотите удалить категорию ${name[language]}`}
            />
        </>
    );
};

export default FaqAdminCategoryItem;
