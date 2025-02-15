'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import styles from '../index.module.scss';

import type { MenuTypeDTO } from '@/entities/menu';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { useMenu } from '@/features/menu';

import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { FileUpload } from '@/shared/ui/FileUpload';
import { Text } from '@/shared/ui/Text';
import { Checkbox } from '@/shared/ui/Checkbox';

const AdminTypeMenuCreate = () => {
    const [backgroundPicture, setBackgroundPicture] = React.useState('');

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<MenuTypeDTO>();

    const { createTypemenu } = useMenu();
    const language = useAppSelector((state) => state.app.language);
    const router = useRouter();

    const onSubmit: SubmitHandler<MenuTypeDTO> = (data) => {
        const menuTypeData = { ...data, backgroundPicture };

        createTypemenu(menuTypeData, () => router.replace(`/${language}/admin/typesmenu`));
    };

    return (
        <div className={styles.adminTeam}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.createForm}>
                <Text>Создание типа меню</Text>

                <FileUpload
                    title="Изображение"
                    id="menu_type_picture"
                    filePath={backgroundPicture}
                    setFilePath={setBackgroundPicture}
                    isAdmin={true}
                />

                <Checkbox id="create_menutype_publish" label="Опубликовать" {...register('isPublished')} />

                <Input
                    {...register('order')}
                    error={!!errors.order}
                    errorMessage={errors.order?.message}
                    full
                    title={'Позиция'}
                    value={watch('order', '0')}
                    type="number"
                />

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
                    title={'Имя ru'}
                    value={watch('nameRu', '')}
                />

                <Input
                    {...register('nameHe')}
                    error={!!errors.nameHe}
                    errorMessage={errors.nameHe?.message}
                    full
                    title={'Имя he'}
                    value={watch('nameHe', '')}
                />

                <Input
                    {...register('descriptionRu')}
                    error={!!errors.descriptionRu}
                    errorMessage={errors.descriptionRu?.message}
                    full
                    title={'Описание ru'}
                    value={watch('descriptionRu', '')}
                />

                <Input
                    {...register('descriptionHe')}
                    error={!!errors.descriptionHe}
                    errorMessage={errors.descriptionHe?.message}
                    full
                    title={'Описание he'}
                    value={watch('descriptionHe', '')}
                />

                <Input
                    {...register('shortDescriptionRu')}
                    error={!!errors.shortDescriptionRu}
                    errorMessage={errors.shortDescriptionRu?.message}
                    full
                    title={'Краткое описание ru'}
                    value={watch('shortDescriptionRu', '')}
                />

                <Input
                    {...register('shortDescriptionHe')}
                    error={!!errors.shortDescriptionHe}
                    errorMessage={errors.shortDescriptionHe?.message}
                    full
                    title={'Краткое описание he'}
                    value={watch('shortDescriptionHe', '')}
                />

                <Input
                    {...register('initialPriceRu')}
                    error={!!errors.initialPriceRu}
                    errorMessage={errors.initialPriceRu?.message}
                    full
                    title={'Цена ru'}
                    value={watch('initialPriceRu', '')}
                />

                <Input
                    {...register('initialPriceHe')}
                    error={!!errors.initialPriceHe}
                    errorMessage={errors.initialPriceHe?.message}
                    full
                    title={'Цена he'}
                    value={watch('initialPriceHe', '')}
                />

                <Button full>Создать</Button>
            </form>
        </div>
    );
};

export default AdminTypeMenuCreate;
