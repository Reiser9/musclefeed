'use client';

import React from 'react';
import Image from 'next/image';

import styles from './index.module.scss';
import { ReviewSend } from '../model';
import { useAppSelector } from '@/shared/hooks/useRedux';

type Props = {
    data: ReviewSend;
};

const ReviewItem: React.FC<Props> = ({ data }) => {
    const { author, text, picture } = data || {};

    const language = useAppSelector((state) => state.app.language);

    return (
        <div className={styles.reviewsItem}>
            <div className={styles.reviewsItemImg}>
                <Image src={picture} alt={author[language]} fill />
            </div>

            <div className={styles.reviewsItemContent}>
                {/* <p className={styles.reviewsItemPlan}>Рацион Балланс</p> */}

                <p className={styles.reviewsItemName}>{author[language]}</p>

                <div className={styles.reviewsItemTextInner}>
                    <p className={styles.reviewsItemText}>{text[language]}</p>

                    <button className={styles.reviewsItemTextFull}>Смотреть весь отзыв</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;
