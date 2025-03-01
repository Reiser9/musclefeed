'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from '../../index.module.scss';

import type { TeamDTO } from '@/entities/team';
import { useAdminTeam } from '@/features/admin';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { FileUpload } from '@/shared/ui/FileUpload';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { Text } from '@/shared/ui/Text';

const AdminTeamEdit = () => {
    const [picture, setPicture] = React.useState('');

    const { id } = useParams();

    const { getMemberById, updateTeam } = useAdminTeam();
    const router = useRouter();
    const language = useAppSelector((state) => state.app.language);

    const { data, isPending, isError } = useQuery({
        queryKey: ['team_by_id', id],
        queryFn: () => getMemberById(String(id)),
        enabled: !!id,
        gcTime: 0,
        refetchOnMount: true
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<TeamDTO>();

    const onSubmit: SubmitHandler<TeamDTO> = (data) => {
        const teamData = { ...data, picture };

        updateTeam(String(id), teamData, () => router.replace(`/${language}/admin/team`));
    };

    const { name, role, picture: teamPicture, description } = data || {};

    React.useEffect(() => {
        if (teamPicture) {
            setPicture(teamPicture);
        }
    }, [teamPicture]);

    if (isPending) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent />;
    }

    return (
        <div className={styles.adminTeam}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.createForm}>
                <Text>Редактирование участника команды</Text>

                <FileUpload title="Изображение" id="team_picture" filePath={picture} setFilePath={setPicture} />

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
                    {...register('roleRu')}
                    error={!!errors.roleRu}
                    errorMessage={errors.roleRu?.message}
                    full
                    title={'Должность ru'}
                    value={watch('roleRu', role?.ru)}
                />

                <Input
                    {...register('roleHe')}
                    error={!!errors.roleHe}
                    errorMessage={errors.roleHe?.message}
                    full
                    title={'Должность he'}
                    value={watch('roleHe', role?.he)}
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

                <Button full>Сохранить</Button>
            </form>
        </div>
    );
};

export default AdminTeamEdit;
