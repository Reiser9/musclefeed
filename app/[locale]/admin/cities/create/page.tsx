'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import styles from '../index.module.scss';

import type { CityDTO } from '@/entities/city';
import { useCities } from '@/features/city';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

const AdminCityCreate = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<CityDTO>();

    const { createCity } = useCities();
    const language = useAppSelector((state) => state.app.language);
    const router = useRouter();

    const onSubmit: SubmitHandler<CityDTO> = (data) => {
        createCity(data, () => router.replace(`/${language}/admin/cities`));
    };

    return (
        <div className={styles.adminTeam}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.createForm}>
                <Text>Создание города</Text>

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
                    title={'Описание he'}
                    value={watch('nameHe', '')}
                />

                <Button full>Создать</Button>
            </form>
        </div>
    );
};

export default AdminCityCreate;
