'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';

import { useAdminDish } from '@/features/admin';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';
import { Preloader } from '@/shared/ui/Preloader';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';

const AdminDishTypes = () => {
    const { getDishTypes } = useAdminDish();
    const language = useAppSelector((state) => state.app.language);

    const { data, isPending, isError } = useQuery({
        queryKey: ['dish_types'],
        queryFn: getDishTypes,
    });

    if (isPending) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent />;
    }

    return (
        <PrivateWrapper haveRole="ADMIN">
            <div className={styles.adminDishTypes}>
                <div className={styles.titleWrapper}>
                    <Text>Типы блюд {!!data && !!data?.length && `(${data.length})`}</Text>

                    {/* <Button href={`/${language}/admin/typesdish/create`}>Создать</Button> */}
                </div>

                {!!data && !!data?.length ? (
                    <div className={styles.adminDishItems}>
                        {data.map((dish) => (
                            <p key={dish.id} className={styles.adminDishType}>
                                {dish.name[language]}
                            </p>
                        ))}
                    </div>
                ) : (
                    <NotContent text="Типы блюд еще не созданы" />
                )}
            </div>
        </PrivateWrapper>
    );
};

export default AdminDishTypes;
