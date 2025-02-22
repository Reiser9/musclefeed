'use client';

import React from 'react';
import cn from 'classnames';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';

import UserAdminItem from '@/entities/user/ui/UserAdminItem';

import { useUsers } from '@/features/admin';

import { Preloader } from '@/shared/ui/Preloader';
import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';

const AdminUsers = () => {
    const [page, setPage] = React.useState(1);

    const { getUsers } = useUsers();

    const { data, isPending, isError } = useQuery({
        queryKey: ['admin_users', page],
        queryFn: () => getUsers(page, 12),
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
                    <Text>Пользователи {!!data && !!data.totalCount && `(${data.totalCount})`}</Text>
                </div>

                {!!data && !!data.users.length ? (
                    <div className={styles.adminTeamItems}>
                        {data?.users.map((user) => (
                            <UserAdminItem key={user.id} data={user} />
                        ))}
                    </div>
                ) : (
                    <NotContent text="Пользователей не найдено" />
                )}
            </div>

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

export default AdminUsers;
