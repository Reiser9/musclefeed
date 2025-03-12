'use client';

import Image from 'next/image';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import styles from '../index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { ReviewSendDTO } from '@/entities/review';
import { ArrowRight, Chat, PhotoAdd, User } from '@/shared/icons';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { useReviews } from '@/features/reviews';

import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { FileUpload } from '@/shared/ui/FileUpload';

const ReviewForm = () => {
    const [reviewAgree, setReviewAgree] = React.useState(true);
    const [picture, setPicture] = React.useState('');

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<ReviewSendDTO>();

    const { sendReview } = useReviews();
    const language = useAppSelector((state) => state.app.language);
    const t = useTranslations('Reviews');

    const onSubmit: SubmitHandler<ReviewSendDTO> = (data) => {
        if (!reviewAgree) {
            return;
        }

        const reviewData = { ...data, picture, language: language.toUpperCase() as 'RU' | 'HE' };

        sendReview(reviewData, () => {
            alert('Отзыв успешно отправлен');
            reset();
            setPicture('');
        });
    };

    return (
        <section className={styles.reviewform}>
            <div className={base.container}>
                <div className={styles.reviewformInner}>
                    <div className={styles.reviewformForm}>
                        <div className={styles.reviewformFormWrapper}>
                            <p className={styles.reviewformFormText}>{t('form_suptitle')}</p>

                            <Text variant="h1" upper>
                                {t('form_title')}
                            </Text>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className={styles.reviewformFormContent}>
                            <Input
                                {...register('author')}
                                required
                                error={!!errors.author}
                                errorMessage={errors.author?.message}
                                title={t('form_name')}
                                placeholder={t('form_name_placeholder')}
                                icon={<User />}
                                full
                                value={watch('author', '')}
                            />

                            <Input
                                {...register('text')}
                                required
                                error={!!errors.text}
                                errorMessage={errors.text?.message}
                                title={t('form_comment')}
                                placeholder={t('form_comment_placeholder')}
                                icon={<Chat />}
                                full
                                component="textarea"
                                value={watch('text', '')}
                            />

                            <Checkbox
                                value={reviewAgree}
                                setValue={setReviewAgree}
                                id="reviewform__agree"
                                label={t('form_agree')}
                            />

                            <div className={styles.reviewformButtons}>
                                <FileUpload
                                    id="review_form"
                                    filePath={picture}
                                    setFilePath={setPicture}
                                    labelClassName={styles.reviewformButtonWrapper}
                                >
                                    <span className={styles.reviewformButton}>
                                        {picture ? t('form_photo_choosed') : t('form_photo')}
                                        <PhotoAdd />
                                    </span>
                                </FileUpload>

                                <Button disabled={!reviewAgree}>
                                    {t('form_send')}
                                    <ArrowRight />
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div className={styles.reviewformImg}>
                        <Image src="/img/reviewform-img.png" alt="img" fill />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewForm;
