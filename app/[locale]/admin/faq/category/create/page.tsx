'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from '../../index.module.scss';

import { FaqCategoryDTO } from '@/entities/faq';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { useFaq } from '@/features/faq';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';

const AdminCreateCategory = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FaqCategoryDTO>();

    const { createFaqCategory } = useFaq();
    const language = useAppSelector((state) => state.app.language);
    const router = useRouter();

    const onSubmit: SubmitHandler<FaqCategoryDTO> = (data) => {
        createFaqCategory(data, () => router.replace(`/${language}/admin/faq/category`));
    };

    return (
        <div className={styles.adminTeam}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.createForm}>
                <Text>Создание категории частых вопросов</Text>

                <Input
                    {...register('picture')}
                    error={!!errors.picture}
                    errorMessage={errors.picture?.message}
                    full
                    title={'Иконка'}
                    component="textarea"
                    value={watch('picture', '')}
                />

                <Input
                    {...register('nameRu')}
                    error={!!errors.nameRu}
                    errorMessage={errors.nameRu?.message}
                    full
                    title={'Название ru'}
                    value={watch('nameRu', '')}
                />

                <Input
                    {...register('nameHe')}
                    error={!!errors.nameHe}
                    errorMessage={errors.nameHe?.message}
                    full
                    title={'Название he'}
                    value={watch('nameHe', '')}
                />

                <Button full>Создать</Button>
            </form>
        </div>
    );
};

export default AdminCreateCategory;
