'use client';

import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';

import { useTeam } from '@/features/team';
import { useAdminTeam } from '@/features/admin';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { TeamAdminItem } from '@/entities/team/ui';

import { Preloader } from '@/shared/ui/Preloader';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';

const AdminTeam = () => {
    const queryClient = useQueryClient();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['team'] });
    };

    const language = useAppSelector((state) => state.app.language);

    const { getTeam } = useTeam();
    const { deleteMember } = useAdminTeam();

    const { data, isPending, isError } = useQuery({
        queryKey: ['team'],
        queryFn: getTeam,
    });

    if (isPending) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent />;
    }

    return (
        <div className={styles.adminTeam}>
            <div className={styles.adminTeamWrapper}>
                <div className={styles.titleWrap}>
                    <Text>Команда {!!data && !!data.length && `(${data.length})`}</Text>

                    <Button href={`/${language}/admin/team/create`} small>
                        Создать
                    </Button>
                </div>

                {!!data && !!data.length ? (
                    <div className={styles.adminTeamItems}>
                        {data?.map((team) => (
                            <TeamAdminItem
                                key={team.id}
                                data={team}
                                deleteCallback={() => deleteMember(team.id, revalidateRequest)}
                            />
                        ))}
                    </div>
                ) : (
                    <NotContent text="Нет команды" />
                )}
            </div>
        </div>
    );
};

export default AdminTeam;
