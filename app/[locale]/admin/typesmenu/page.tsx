'use client';

import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';

import { useAppSelector } from '@/shared/hooks/useRedux';
import { useMenu } from '@/features/menu';
import { MenuTypeItem } from '@/entities/menu/ui';

import { Preloader } from '@/shared/ui/Preloader';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';

const AdminTypesMenu = () => {
    const queryClient = useQueryClient();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['typesmenu'] });
    };

    const language = useAppSelector((state) => state.app.language);

    const { getTypesmenu, deleteTypemenu } = useMenu();

    const { data, isPending, isError } = useQuery({
        queryKey: ['typesmenu'],
        queryFn: getTypesmenu,
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
                    <Text>Типы меню {!!data && !!data.length && `(${data.length})`}</Text>

                    <Button href={`/${language}/admin/typesmenu/create`} small>
                        Создать
                    </Button>
                </div>

                {!!data && !!data.length ? (
                    <div className={styles.adminTeamItems}>
                        {data?.map((type) => (
                            <MenuTypeItem
                                key={type.id}
                                data={type}
                                deleteCallback={() => deleteTypemenu(type.id, revalidateRequest)}
                            />
                        ))}
                    </div>
                ) : (
                    <NotContent text="Нет типов меню" />
                )}
            </div>
        </div>
    );
};

export default AdminTypesMenu;
