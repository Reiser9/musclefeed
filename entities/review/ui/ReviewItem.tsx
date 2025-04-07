'use client';

import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

import styles from './index.module.scss';

import type { ReviewSend } from '../model';
import { useAppSelector } from '@/shared/hooks/useRedux';

type Props = {
    data: ReviewSend;
};

const showRu = 'Смотреть весь отзыв';
const showHe = 'צפו בביקורת כולה';
const hideRu = 'Скрыть';
const hideHe = 'הסתר';

const ReviewItem: React.FC<Props> = ({ data }) => {
    const [seeFull, setSeeFull] = React.useState(false);
    const [isOverflowing, setIsOverflowing] = React.useState(false);
    const textRef = React.useRef<HTMLParagraphElement>(null);

    const { author, text, picture } = data || {};

    const language = useAppSelector((state) => state.app.language);

    React.useEffect(() => {
        if (textRef.current) {
            setIsOverflowing(textRef.current.scrollHeight > 120);
        }
    }, [text]);

    return (
        <div className={styles.reviewsItem}>
            <div className={styles.reviewsItemImg}>
                <Image src={picture} alt={author[language]} fill />
            </div>

            <div className={styles.reviewsItemContent}>
                {/* <p className={styles.reviewsItemPlan}>Рацион Балланс</p> */}

                <p className={styles.reviewsItemName}>{author[language]}</p>

                <div className={styles.reviewsItemTextInner}>
                    <p
                        className={cn(styles.reviewsItemText, {
                            [styles.active]: seeFull,
                        })}
                        ref={textRef}
                    >
                        {text[language]}
                    </p>

                    {isOverflowing && (
                        <button className={styles.reviewsItemTextFull} onClick={() => setSeeFull((prev) => !prev)}>
                            {seeFull ? (language === 'ru' ? hideRu : hideHe) : language === 'ru' ? showRu : showHe}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;
