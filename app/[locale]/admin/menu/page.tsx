'use client';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';

import React from 'react';

import styles from './index.module.scss';

import { useAppSelector } from '@/shared/hooks/useRedux';
import { useMenu } from '@/features/menu';
import { useDebounce } from '@/shared/hooks/useDebounce';

import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';
import { Preloader } from '@/shared/ui/Preloader';
import { Input } from '@/shared/ui/Input';
import { MenuAdminItem } from '@/entities/menu/ui';

const AdminMenuPage = () => {
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState('');

    const queryClient = useQueryClient();
    const searchDebounce = useDebounce(search, 500);

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['admin_menus'] });
    };

    const language = useAppSelector((state) => state.app.language);

    const { getMenus } = useMenu();

    const { data, isPending, isError } = useQuery({
        queryKey: ['admin_menus', page, searchDebounce],
        queryFn: () => getMenus(page, 10, searchDebounce),
        placeholderData: keepPreviousData,
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
                    <Text>Меню {!!data && !!data.elementsCount && `(${data.elementsCount})`}</Text>

                    <div className={styles.adminDishSearch}>
                        <Input placeholder="Поиск" value={search} setValue={setSearch} full />
                    </div>

                    <Button href={`/${language}/admin/menu/create`} small>
                        Создать
                    </Button>
                </div>

                {!!data && !!data?.menus.length ? (
                    <div className={styles.adminTeamItems}>
                        {data?.menus.map((menu) => (
                            <MenuAdminItem key={menu.id} data={menu} />
                        ))}
                    </div>
                ) : (
                    <NotContent text="Нет меню" />
                )}
            </div>
        </div>
    );
};

export default AdminMenuPage;
