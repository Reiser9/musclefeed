'use client';

import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';

import styles from './index.module.scss';

import type { FaqItem } from '../model';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Delete } from '@/shared/icons';

import { Text } from '@/shared/ui/Text';
import { ConfirmModal } from '@/shared/ui/Modal';

type Props = {
    data: FaqItem;
    deleteCallback?: () => void;
};

const FaqAdminItem: React.FC<Props> = ({ data, deleteCallback = () => {} }) => {
    const [deleteModal, setDeleteModal] = React.useState(false);

    const { question, answer, faqCategory, id } = data || {};
    const language = useAppSelector((state) => state.app.language);

    return (
        <>
            <div className={styles.faqAdminItem}>
                <Link href={`/${language}/admin/faq/edit/${id}`}>
                    <Text variant="text2">{question?.ru}</Text>
                </Link>

                <div className={styles.faqAdminItemAnswer}>
                    {parse(answer?.ru)}
                </div>

                <Text variant="text2">{faqCategory.name?.ru}</Text>

                <button className={styles.faqAdminDelete} onClick={() => setDeleteModal(true)}>
                    <Delete />
                </button>
            </div>

            <ConfirmModal
                value={deleteModal}
                setValue={setDeleteModal}
                callback={deleteCallback}
                title={`Вы действительно хотите удалить категорию ${question[language]}`}
            />
        </>
    );
};

export default FaqAdminItem;
