'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import styles from '../../index.module.scss';

import type { ReviewDTO } from '@/entities/review';
import { useReviews } from '@/features/reviews';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { FileUpload } from '@/shared/ui/FileUpload';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';

const AdminReviewEdit = () => {
    const { id } = useParams();
    const [picture, setPicture] = React.useState('');
    const [publish, setPublish] = React.useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ReviewDTO>();

    const { updateReview, getReviewById } = useReviews();
    const language = useAppSelector((state) => state.app.language);
    const router = useRouter();

    const { data, isPending, isError } = useQuery({
        queryKey: ['review_by_id', id],
        queryFn: () => getReviewById(String(id)),
        enabled: !!id,
        gcTime: 0,
        refetchOnMount: true,
    });

    const onSubmit: SubmitHandler<ReviewDTO> = (data) => {
        const dishData = { ...data, picture, isPublished: publish };

        updateReview(String(id), dishData, () => router.replace(`/${language}/admin/reviews`));
    };

    const { author, isPublished, picture: reviewPicture, text } = data || {};

    React.useEffect(() => {
        if (reviewPicture) {
            setPicture(reviewPicture);
        }
    }, [reviewPicture]);

    React.useEffect(() => {
        setPublish(!!isPublished);
    }, [isPublished]);

    if (isPending) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent />;
    }

    return (
        <div className={styles.adminTeam}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.createForm}>
                <Text>Редактирование отзыва</Text>

                <FileUpload
                    title="Изображение"
                    id="review_picture"
                    filePath={picture}
                    setFilePath={setPicture}
                    isAdmin={true}
                />

                <Checkbox id="create_review_publish" label="Опубликовать" value={publish} setValue={setPublish} />

                <Input
                    {...register('authorRu')}
                    error={!!errors.authorRu}
                    errorMessage={errors.authorRu?.message}
                    full
                    title={'Автор ru'}
                    value={watch('authorRu', author?.ru || "")}
                />

                <Input
                    {...register('authorHe')}
                    error={!!errors.authorHe}
                    errorMessage={errors.authorHe?.message}
                    full
                    title={'Автор he'}
                    value={watch('authorHe', author?.he || "")}
                />

                <Input
                    {...register('textRu')}
                    error={!!errors.textRu}
                    errorMessage={errors.textRu?.message}
                    full
                    title={'Текст ru'}
                    value={watch('textRu', text?.ru || "")}
                />

                <Input
                    {...register('textHe')}
                    error={!!errors.textHe}
                    errorMessage={errors.textHe?.message}
                    full
                    title={'Текст he'}
                    value={watch('textHe', text?.he || "")}
                />

                <Button full>Сохранить</Button>
            </form>
        </div>
    );
};

export default AdminReviewEdit;
