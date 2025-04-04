'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import styles from '../index.module.scss';

import type { ReviewDTO } from '@/entities/review';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { useReviews } from '@/features/reviews';

import { FileUpload } from '@/shared/ui/FileUpload';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Checkbox } from '@/shared/ui/Checkbox';

const AdminCreateReview = () => {
    const [picture, setPicture] = React.useState('');

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ReviewDTO>();

    const { createReview } = useReviews();
    const language = useAppSelector((state) => state.app.language);
    const router = useRouter();

    const onSubmit: SubmitHandler<ReviewDTO> = (data) => {
        const reviewData = { ...data, picture };

        createReview(reviewData, () => router.replace(`/${language}/admin/reviews`));
    };

    return (
        <div className={styles.adminTeam}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.createForm}>
                <Text>Создание отзыва</Text>

                <FileUpload
                    title="Изображение"
                    id="review_picture"
                    filePath={picture}
                    setFilePath={setPicture}
                    isAdmin={true}
                />

                <Checkbox id="create_review_publish" label="Опубликовать" {...register('isPublished')} />

                <Input
                    {...register('authorRu')}
                    error={!!errors.authorRu}
                    errorMessage={errors.authorRu?.message}
                    full
                    title={'Автор ru'}
                    value={watch('authorRu', '')}
                />

                <Input
                    {...register('authorHe')}
                    error={!!errors.authorHe}
                    errorMessage={errors.authorHe?.message}
                    full
                    title={'Автор he'}
                    value={watch('authorHe', '')}
                />

                <Input
                    {...register('textRu')}
                    error={!!errors.textRu}
                    errorMessage={errors.textRu?.message}
                    full
                    title={'Текст ru'}
                    value={watch('textRu', '')}
                    component="textarea"
                />

                <Input
                    {...register('textHe')}
                    error={!!errors.textHe}
                    errorMessage={errors.textHe?.message}
                    full
                    title={'Текст he'}
                    value={watch('textHe', '')}
                    component="textarea"
                />

                <Button full>Создать</Button>
            </form>
        </div>
    );
};

export default AdminCreateReview;
