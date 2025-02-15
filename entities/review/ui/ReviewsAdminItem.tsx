'use client';

import React from 'react';

import styles from './index.module.scss';
import { Text } from '@/shared/ui/Text';
import Image from 'next/image';
import { ReviewSend } from '../model';
import { Delete } from '@/shared/icons';

type Props = {
    data: ReviewSend;
    deleteCallback?: () => void;
};

const ReviewsAdminItem: React.FC<Props> = ({ data, deleteCallback = () => {} }) => {
    const { text, author, picture } = data || {};

    return (
        <div className={styles.reviewAdminItem}>
            <div className={styles.reviewAdminItemImg}>
                <Image src={picture} alt={author.ru} fill />
            </div>

            <Text variant="text2">Автор: {author.ru}</Text>

            <Text variant="text2">Отзыв: {text.ru}</Text>

            <button>
                <Delete />
            </button>
        </div>
    );
};

export default ReviewsAdminItem;
