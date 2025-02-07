'use client';

import React from 'react';
import Image from 'next/image';

import styles from './index.module.scss';

const ReviewItem = () => {
    return (
        <div className={styles.reviewsItem}>
            <div className={styles.reviewsItemImg}>
                <Image src="/img/review3.png" alt="img" fill />
            </div>

            <div className={styles.reviewsItemContent}>
                <p className={styles.reviewsItemPlan}>Рацион Балланс</p>

                <p className={styles.reviewsItemName}>Марина кузякина</p>

                <div className={styles.reviewsItemTextInner}>
                    <p className={styles.reviewsItemText}>
                        Я играю в теннис и использую программу баланс. Тренер посоветовал заказывать готовые рационы,
                        чтобы не париться. В спорте важно, чтобы не только калории считались, но и еда была
                        сбалансированной и полезной, а еще с доставкой на дом. Работаешь, тренируешься, а про еду не
                        заморачиваешься.
                    </p>

                    <button className={styles.reviewsItemTextFull}>Смотреть весь отзыв</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;
