'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import styles from '../../index.module.scss';

import type { MenuTypeDTO } from '@/entities/menu';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { useMenu } from '@/features/menu';

import { FileUpload } from '@/shared/ui/FileUpload';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';

const AdminTypeMenuEdit = () => {
    const { id } = useParams();
    const [backgroundPicture, setBackgroundPicture] = React.useState('');
    const [publish, setPublish] = React.useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<MenuTypeDTO>();

    const { updateTypemenu, getTypemenuById } = useMenu();
    const language = useAppSelector((state) => state.app.language);
    const router = useRouter();

    const { data, isPending, isError } = useQuery({
        queryKey: ['menutype_by_id', id],
        queryFn: () => getTypemenuById(String(id)),
        enabled: !!id,
        gcTime: 0,
        refetchOnMount: true,
    });

    const onSubmit: SubmitHandler<MenuTypeDTO> = (data) => {
        const menuTypeData = { ...data, backgroundPicture, isPublished: publish };

        updateTypemenu(String(id), menuTypeData, () => router.replace(`/${language}/admin/typesmenu`));
    };

    const { adminName, menuType, description, initialPrice, isPublished, name, order, shortDescription } = data || {};

    React.useEffect(() => {
        if (menuType?.backgroundPicture) {
            setBackgroundPicture(menuType?.backgroundPicture);
        }
    }, [menuType?.backgroundPicture]);

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
                <Text>Редактирование типа меню</Text>

                <FileUpload
                    title="Изображение"
                    id="menu_type_picture"
                    filePath={backgroundPicture}
                    setFilePath={setBackgroundPicture}
                    isAdmin={true}
                />

                <Checkbox id="create_menutype_publish" label="Опубликовать" value={publish} setValue={setPublish} />

                <Input
                    {...register('order')}
                    error={!!errors.order}
                    errorMessage={errors.order?.message}
                    full
                    title={'Позиция'}
                    value={watch('order', String(order))}
                    type="number"
                />

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
                    title={'Имя ru'}
                    value={watch('nameRu', name?.ru)}
                />

                <Input
                    {...register('nameHe')}
                    error={!!errors.nameHe}
                    errorMessage={errors.nameHe?.message}
                    full
                    title={'Имя he'}
                    value={watch('nameHe', name?.he)}
                />

                <Input
                    {...register('descriptionRu')}
                    error={!!errors.descriptionRu}
                    errorMessage={errors.descriptionRu?.message}
                    full
                    title={'Описание ru'}
                    value={watch('descriptionRu', description?.ru)}
                />

                <Input
                    {...register('descriptionHe')}
                    error={!!errors.descriptionHe}
                    errorMessage={errors.descriptionHe?.message}
                    full
                    title={'Описание he'}
                    value={watch('descriptionHe', description?.he)}
                />

                <Input
                    {...register('shortDescriptionRu')}
                    error={!!errors.shortDescriptionRu}
                    errorMessage={errors.shortDescriptionRu?.message}
                    full
                    title={'Краткое описание ru'}
                    value={watch('shortDescriptionRu', shortDescription?.ru)}
                />

                <Input
                    {...register('shortDescriptionHe')}
                    error={!!errors.shortDescriptionHe}
                    errorMessage={errors.shortDescriptionHe?.message}
                    full
                    title={'Краткое описание he'}
                    value={watch('shortDescriptionHe', shortDescription?.he)}
                />

                <Input
                    {...register('initialPriceRu')}
                    error={!!errors.initialPriceRu}
                    errorMessage={errors.initialPriceRu?.message}
                    full
                    title={'Цена ru'}
                    value={watch('initialPriceRu', initialPrice?.ru)}
                />

                <Input
                    {...register('initialPriceHe')}
                    error={!!errors.initialPriceHe}
                    errorMessage={errors.initialPriceHe?.message}
                    full
                    title={'Цена he'}
                    value={watch('initialPriceHe', initialPrice?.he)}
                />

                <Button full>Сохранить</Button>
            </form>
        </div>
    );
};

export default AdminTypeMenuEdit;
