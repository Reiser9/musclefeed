'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import styles from '../index.module.scss';

import type { MenuDTO } from '@/entities/menu';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Foods } from '@/shared/icons';
import { useMenu } from '@/features/menu';

import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Select } from '@/shared/ui/Select';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';

const AdminMenuCreate = () => {
    const [cycleDate, setCycleDate] = React.useState<Dayjs | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<MenuDTO>();

    const { createMenu, getTypesmenu } = useMenu();
    const language = useAppSelector((state) => state.app.language);
    const router = useRouter();

    const { data, isPending, isError } = useQuery({
        queryKey: ['typesmenu'],
        queryFn: getTypesmenu,
    });

    const onSubmit: SubmitHandler<MenuDTO> = (data) => {
        if (!cycleDate) return;

        const menuData = { ...data, cycleStartDate: cycleDate?.toDate() };

        console.log(menuData);

        createMenu(menuData, () => router.replace(`/${language}/admin/menu`));
    };

    return (
        <div className={styles.adminTeam}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.createForm}>
                <Text>Создание меню</Text>

                <Checkbox id="create_menu_publish" label="Опубликовать" {...register('isPublished')} />

                {isPending ? (
                    <Preloader small page />
                ) : isError ? (
                    <NotContent text="Произошла ошибка при загрузке типов меню" />
                ) : !!data && !!data.length ? (
                    <Select
                        {...register('menuTypeId')}
                        options={data?.map((elem) => ({
                            id: elem.id,
                            name: elem.name[language],
                        }))}
                        title="Тип меню"
                        icon={<Foods />}
                        full
                    ></Select>
                ) : (
                    <NotContent text="Для начала создайте тип меню" />
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
                    {...register('calories')}
                    error={!!errors.calories}
                    errorMessage={errors.calories?.message}
                    full
                    title={'Калории'}
                    value={watch('calories', '')}
                    type="number"
                />

                <Input
                    {...register('order')}
                    error={!!errors.order}
                    errorMessage={errors.order?.message}
                    full
                    title={'Порядок'}
                    value={watch('order', '')}
                    type="number"
                />

                <div className={styles.datePickerWrapper}>
                    <Text variant="text3">Выберите дату начала цикла</Text>

                    <DatePicker
                        className={styles.datePicker}
                        format="DD.MM.YYYY"
                        value={cycleDate}
                        onChange={setCycleDate}
                    />
                </div>

                <Button full>Создать</Button>
            </form>
        </div>
    );
};

export default AdminMenuCreate;
