'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import styles from '../../index.module.scss';

import type { DishDTO } from '@/entities/dish';
import { useAdminDish } from '@/features/admin';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { FileUpload } from '@/shared/ui/FileUpload';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Select } from '@/shared/ui/Select';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { Foods } from '@/shared/icons';

const AdminEditDish = () => {
    const { id } = useParams();
    const [picture, setPicture] = React.useState('');
    const [publish, setPublish] = React.useState(false);
    const [dishTypeId, setDishTypeId] = React.useState('');

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<DishDTO>();

    const { updateDish, getDishTypes, getDishById } = useAdminDish();
    const language = useAppSelector((state) => state.app.language);
    const router = useRouter();

    const {
        data: dish,
        isPending: dishIsPending,
        isError: dishIsError,
    } = useQuery({
        queryKey: ['dish_by_id', id],
        queryFn: () => getDishById(String(id)),
        enabled: !!id,
        gcTime: 0,
        refetchOnMount: true,
    });

    const { data, isPending, isError } = useQuery({
        queryKey: ['dish_types'],
        queryFn: getDishTypes,
    });

    const onSubmit: SubmitHandler<DishDTO> = (data) => {
        const dishData = { ...data, picture, isPublished: publish, dishTypeId };

        updateDish(String(id), dishData, () => router.replace(`/${language}/admin/dish`));
    };

    const {
        adminName,
        dishType,
        benefit,
        calories,
        carbohydrates,
        description,
        fats,
        isPublished,
        name,
        picture: dishPicture,
        proteins,
        weight,
        price,
        isIndividualOrderAvailable,
    } = dish || {};

    React.useEffect(() => {
        if (dishPicture) {
            setPicture(dishPicture);
        }
    }, [dishPicture]);

    React.useEffect(() => {
        setPublish(!!isPublished);
    }, [isPublished]);

    React.useEffect(() => {
        if (dishType && dishType.id) {
            setDishTypeId(String(dishType.id));
        }
    }, [dishType]);

    if (dishIsPending) {
        return <Preloader page />;
    }

    if (dishIsError) {
        return <NotContent />;
    }

    return (
        <div className={styles.adminDish}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.createForm}>
                <Text>Редактирование блюда</Text>

                <FileUpload
                    title="Изображение"
                    id="dish_picture"
                    filePath={picture}
                    setFilePath={setPicture}
                    isAdmin={true}
                />

                <Checkbox id="edit_dish_publish" label="Опубликовать" value={publish} setValue={setPublish} />
                <Checkbox
                    id="edit_dish_indi"
                    label="Блюдо для индивидуального заказа"
                    {...register('isIndividualOrderAvailable')}
                    value={watch('isIndividualOrderAvailable', isIndividualOrderAvailable)}
                />

                {isPending ? (
                    <Preloader small page />
                ) : isError ? (
                    <NotContent text="Произошла ошибка при загрузке типов блюд" />
                ) : !!data && !!data.length ? (
                    <Select
                        value={dishTypeId}
                        setValue={setDishTypeId}
                        options={data?.map((elem) => ({
                            id: elem.id,
                            name: elem.name[language],
                        }))}
                        icon={<Foods />}
                        title="Тип блюда"
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
                    value={watch('adminName', adminName)}
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

                <Input
                    {...register('descriptionRu')}
                    error={!!errors.descriptionRu}
                    errorMessage={errors.descriptionRu?.message}
                    full
                    title={'Описание ru'}
                    value={watch('descriptionRu', description?.ru)}
                    component="textarea"
                />

                <Input
                    {...register('descriptionHe')}
                    error={!!errors.descriptionHe}
                    errorMessage={errors.descriptionHe?.message}
                    full
                    title={'Описание he'}
                    value={watch('descriptionHe', description?.he)}
                    component="textarea"
                />

                <Input
                    {...register('calories')}
                    error={!!errors.calories}
                    errorMessage={errors.calories?.message}
                    full
                    title={'Калории'}
                    value={watch('calories', String(calories))}
                    type="number"
                />

                <Input
                    {...register('weight')}
                    error={!!errors.weight}
                    errorMessage={errors.weight?.message}
                    full
                    title={'Вес'}
                    value={watch('weight', String(weight))}
                    type="number"
                />

                <Input
                    {...register('proteins')}
                    error={!!errors.proteins}
                    errorMessage={errors.proteins?.message}
                    full
                    title={'Белки'}
                    value={watch('proteins', String(proteins))}
                    type="number"
                />

                <Input
                    {...register('fats')}
                    error={!!errors.fats}
                    errorMessage={errors.fats?.message}
                    full
                    title={'Жиры'}
                    value={watch('fats', String(fats))}
                    type="number"
                />

                <Input
                    {...register('carbohydrates')}
                    error={!!errors.carbohydrates}
                    errorMessage={errors.carbohydrates?.message}
                    full
                    title={'Углеводы'}
                    value={watch('carbohydrates', String(carbohydrates))}
                    type="number"
                />

                <Input
                    {...register('price')}
                    error={!!errors.price}
                    errorMessage={errors.price?.message}
                    full
                    title={'Цена'}
                    value={watch('price', String(price))}
                    type="number"
                />

                <Input
                    {...register('benefitRu')}
                    error={!!errors.benefitRu}
                    errorMessage={errors.benefitRu?.message}
                    full
                    title={'Описание для модалки'}
                    value={watch('benefitRu', benefit?.ru)}
                    component="textarea"
                />

                <Input
                    {...register('benefitHe')}
                    error={!!errors.benefitHe}
                    errorMessage={errors.benefitHe?.message}
                    full
                    title={'Описание для модалки'}
                    value={watch('benefitHe', benefit?.he)}
                    component="textarea"
                />

                <Button full>Сохранить</Button>
            </form>
        </div>
    );
};

export default AdminEditDish;
