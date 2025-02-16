'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import styles from '../index.module.scss';

import type { TeamDTO } from '@/entities/team';
import { useAdminTeam } from '@/features/admin';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { FileUpload } from '@/shared/ui/FileUpload';
import { Text } from '@/shared/ui/Text';

const AdminTeamCreate = () => {
    const [picture, setPicture] = React.useState('');

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<TeamDTO>();

    const { createTeam } = useAdminTeam();
    const language = useAppSelector((state) => state.app.language);
    const router = useRouter();

    const onSubmit: SubmitHandler<TeamDTO> = (data) => {
        const teamData = { ...data, picture };

        createTeam(teamData, () => router.replace(`/${language}/admin/team`));
    };

    return (
        <div className={styles.adminTeam}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.createForm}>
                <Text>Создание участника команды</Text>

                <FileUpload
                    title="Изображение"
                    id="team_picture"
                    filePath={picture}
                    setFilePath={setPicture}
                    isAdmin={true}
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
                    {...register('roleRu')}
                    error={!!errors.roleRu}
                    errorMessage={errors.roleRu?.message}
                    full
                    title={'Должность ru'}
                    value={watch('roleRu', '')}
                />

                <Input
                    {...register('roleHe')}
                    error={!!errors.roleHe}
                    errorMessage={errors.roleHe?.message}
                    full
                    title={'Должность he'}
                    value={watch('roleHe', '')}
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

                <Button full>Создать</Button>
            </form>
        </div>
    );
};

export default AdminTeamCreate;
