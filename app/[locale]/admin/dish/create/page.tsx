'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import styles from '../index.module.scss';

import type { DishDTO } from '@/entities/dish';
import { useAdminDish } from '@/features/admin';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Foods } from '@/shared/icons';

import { FileUpload } from '@/shared/ui/FileUpload';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Select } from '@/shared/ui/Select';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';

const AdminCreatePage = () => {
    const [picture, setPicture] = React.useState('');

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<DishDTO>();

    const { createDish, getDishTypes } = useAdminDish();
    const language = useAppSelector((state) => state.app.language);
    const router = useRouter();

    const { data, isPending, isError } = useQuery({
        queryKey: ['dish_types'],
        queryFn: getDishTypes,
    });

    const onSubmit: SubmitHandler<DishDTO> = (data) => {
        const dishData = { ...data, picture };
        
        createDish(dishData, () => router.replace(`/${language}/admin/dish`));
    };

    return (
        <div className={styles.adminDish}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.createForm}>
                <Text>Создание блюда</Text>

                <FileUpload
                    title="Изображение"
                    id="dish_picture"
                    filePath={picture}
                    setFilePath={setPicture}
                    isAdmin={true}
                />

                <Checkbox id="create_dish_publish" label="Опубликовать" {...register('isPublished')} />

                {isPending ? (
                    <Preloader small page />
                ) : isError ? (
                    <NotContent text="Произошла ошибка при загрузке типов блюд" />
                ) : !!data && !!data.length ? (
                    <Select
                        {...register('dishTypeId')}
                        options={data?.map((elem) => ({
                            id: elem.id,
                            name: elem.name[language],
                        }))}
                        title="Тип блюда"
                        icon={<Foods />}
                        full
                    ></Select>
                ) : (
                    <NotContent text="Для начала создайте типы блюд" />
                )}

                <Input
                    {...register('adminName')}
                    error={!!errors.adminName}
                    errorMessage={errors.adminName?.message}
                    full
                    title={'Название для админа'}
                    value={watch('adminName', '')}
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

                <Input
                    {...register('descriptionRu')}
                    error={!!errors.descriptionRu}
                    errorMessage={errors.descriptionRu?.message}
                    full
                    title={'Описание ru'}
                    value={watch('descriptionRu', '')}
                    component="textarea"
                />

                <Input
                    {...register('descriptionHe')}
                    error={!!errors.descriptionHe}
                    errorMessage={errors.descriptionHe?.message}
                    full
                    title={'Описание he'}
                    value={watch('descriptionHe', '')}
                    component="textarea"
                />

                <Input
                    {...register('calories')}
                    error={!!errors.calories}
                    errorMessage={errors.calories?.message}
                    full
                    title={'Калории'}
                    value={watch('calories', '')}
                    type="number"
                />

                <Input
                    {...register('weight')}
                    error={!!errors.weight}
                    errorMessage={errors.weight?.message}
                    full
                    title={'Вес'}
                    value={watch('weight', '')}
                    type="number"
                />

                <Input
                    {...register('proteins')}
                    error={!!errors.proteins}
                    errorMessage={errors.proteins?.message}
                    full
                    title={'Белки'}
                    value={watch('proteins', '')}
                    type="number"
                />

                <Input
                    {...register('fats')}
                    error={!!errors.fats}
                    errorMessage={errors.fats?.message}
                    full
                    title={'Жиры'}
                    value={watch('fats', '')}
                    type="number"
                />

                <Input
                    {...register('carbohydrates')}
                    error={!!errors.carbohydrates}
                    errorMessage={errors.carbohydrates?.message}
                    full
                    title={'Углеводы'}
                    value={watch('carbohydrates', '')}
                    type="number"
                />

                <Input
                    {...register('benefit')}
                    error={!!errors.benefit}
                    errorMessage={errors.benefit?.message}
                    full
                    title={'Описание для модалки'}
                    value={watch('benefit', '')}
                    component="textarea"
                />

                <Button full>Создать</Button>
            </form>
        </div>
    );
};

export default AdminCreatePage;
