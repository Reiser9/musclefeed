'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './index.module.scss';

import type { Review } from '../model';
import { Delete } from '@/shared/icons';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Text } from '@/shared/ui/Text';
import { ConfirmModal } from '@/shared/ui/Modal';

type Props = {
    data: Review;
    deleteCallback?: () => void;
};

const ReviewsAdminItem: React.FC<Props> = ({ data, deleteCallback = () => {} }) => {
    const [deleteModal, setDeleteModal] = React.useState(false);

    const { id, text, author, picture, isPublished } = data || {};
    const language = useAppSelector((state) => state.app.language);

    return (
        <>
            <div className={styles.reviewAdminItem}>
                <Link href={`/${language}/admin/reviews/edit/${id}`} className={styles.reviewAdminItemImg}>
                    {picture ? <Image src={picture} alt={author.ru} fill /> : <p>Фото отсутствует</p>}
                </Link>

                <Text variant="text2">Автор ru: {author.ru}</Text>
                <Text variant="text2">Автор he: {author.he}</Text>

                <Text variant="text2">Отзыв ru: {text.ru}</Text>
                <Text variant="text2">Отзыв he: {text.he}</Text>

                <Text variant="text2">Опубликован: {isPublished ? 'Да' : 'Нет'}</Text>

                <button className={styles.teamAdminDelete} onClick={() => setDeleteModal(true)}>
                    <Delete />
                </button>
            </div>

            <ConfirmModal
                value={deleteModal}
                setValue={setDeleteModal}
                callback={deleteCallback}
                title={`Вы действительно хотите удалить отзыв ${author[language]}`}
            />
        </>
    );
};

export default ReviewsAdminItem;
