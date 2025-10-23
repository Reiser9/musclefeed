'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import styles from '../../index.module.scss';

import type { CityDTO } from '@/entities/city';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { useCities } from '@/features/city';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';
import { Preloader } from '@/shared/ui/Preloader';

const AdminCityEdit = () => {
    const { id } = useParams();

    const { getCityById, updateCity } = useCities();
    const router = useRouter();
    const language = useAppSelector((state) => state.app.language);

    const { data, isPending, isError } = useQuery({
        queryKey: ['city_by_id', id],
        queryFn: () => getCityById(String(id)),
        enabled: !!id,
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<CityDTO>();

    const onSubmit: SubmitHandler<CityDTO> = (data) => {
        updateCity(String(id), data, () => router.replace(`/${language}/admin/cities`));
    };

    const { name, code } = data || {};

    if (isPending) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent />;
    }

    return (
        <div className={styles.adminTeam}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.createForm}>
                <Text>Редактирование города</Text>

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
                    {...register('code')}
                    error={!!errors.code}
                    errorMessage={errors.code?.message}
                    full
                    title={'Код'}
                    value={watch('code', code)}
                />

                <Button full>Сохранить</Button>
            </form>
        </div>
    );
};

export default AdminCityEdit;
