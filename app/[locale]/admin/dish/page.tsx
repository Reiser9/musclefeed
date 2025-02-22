'use client';

import React from 'react';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import cn from 'classnames';

import styles from './index.module.scss';

import { DishAdminItem } from '@/entities/dish/ui';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { useAdminDish } from '@/features/admin';
import { useDebounce } from '@/shared/hooks/useDebounce';

import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { Input } from '@/shared/ui/Input';

const AdminDish = () => {
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState('');

    const queryClient = useQueryClient();
    const searchDebounce = useDebounce(search, 500);

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['admin_dishs'] });
    };

    const language = useAppSelector((state) => state.app.language);

    const { getDishsPagination, copyDish, deleteDish } = useAdminDish();

    const { data, isPending, isError } = useQuery({
        queryKey: ['admin_dishs', page, searchDebounce],
        queryFn: () => getDishsPagination(page, 12, searchDebounce),
        placeholderData: keepPreviousData,
    });

    if (isPending) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent />;
    }

    return (
        <div className={styles.adminDish}>
            <div className={styles.titleWrapper}>
                <Text>Блюда {!!data && !!data?.totalCount && `(${data?.totalCount})`}</Text>

                <div className={styles.adminDishSearch}>
                    <Input placeholder="Поиск" value={search} setValue={setSearch} full />
                </div>

                <Button href={`/${language}/admin/dish/create`}>Создать</Button>
            </div>

            {!!data && !!data.dishes?.length ? (
                <div className={styles.adminDishItems}>
                    {data.dishes.map((dish) => (
                        <DishAdminItem
                            key={dish.id}
                            data={dish}
                            copyCallback={() => copyDish(dish.id, revalidateRequest)}
                            deleteCallback={() => deleteDish(dish.id, revalidateRequest)}
                        />
                    ))}
                </div>
            ) : searchDebounce ? (
                <NotContent text={`По запросу «${searchDebounce}» блюда не найдены`} />
            ) : (
                <NotContent text="Блюда еще не созданы" />
            )}

            {!!data && data.totalPages > 1 && (
                <div className={styles.pagination}>
                    {[...Array(data.totalPages)].map((_, id) => (
                        <button
                            key={id}
                            className={cn(styles.paginationButton, {
                                [styles.active]: id + 1 === data.page,
                            })}
                            onClick={() => setPage(id + 1)}
                        >
                            {id + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDish;
