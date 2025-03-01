'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from '../../../index.module.scss';

import type { FaqCategoryDTO } from '@/entities/faq';
import { useFaq } from '@/features/faq';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { NotContent } from '@/shared/ui/NotContent';
import { Preloader } from '@/shared/ui/Preloader';
import { Text } from '@/shared/ui/Text';

const AdminFaqCategoryEdit = () => {
    const { id } = useParams();

    const { getFaqCategoryById, updateFaqCategory } = useFaq();
    const router = useRouter();
    const language = useAppSelector((state) => state.app.language);

    const { data, isPending, isError } = useQuery({
        queryKey: ['faq_category_by_id', id],
        queryFn: () => getFaqCategoryById(String(id)),
        enabled: !!id,
        gcTime: 0,
        refetchOnMount: true
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FaqCategoryDTO>();

    const onSubmit: SubmitHandler<FaqCategoryDTO> = (data) => {
        updateFaqCategory(String(id), data, () => router.replace(`/${language}/admin/faq/category`));
    };

    const { name, picture } = data || {};

    if (isPending) {
        return <Preloader page />;
    }

    if (!id || isError) {
        return <NotContent />;
    }

    return (
        <div className={styles.adminTeam}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.createForm}>
                <Text>Редактирование категории вопросов</Text>

                <Input
                    {...register('picture')}
                    error={!!errors.picture}
                    errorMessage={errors.picture?.message}
                    full
                    title={'Иконка'}
                    component="textarea"
                    value={watch('picture', picture)}
                />

                <Input
                    {...register('nameRu')}
                    error={!!errors.nameRu}
                    errorMessage={errors.nameRu?.message}
                    full
                    title={'Название ru'}
                    value={watch('nameRu', name?.ru)}
                />

                <Input
                    {...register('nameHe')}
                    error={!!errors.nameHe}
                    errorMessage={errors.nameHe?.message}
                    full
                    title={'Название he'}
                    value={watch('nameHe', name?.he)}
                />

                <Button full>Сохранить</Button>
            </form>
        </div>
    );
};

export default AdminFaqCategoryEdit;
