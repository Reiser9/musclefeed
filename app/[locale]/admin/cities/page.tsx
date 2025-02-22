'use client';

import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';

import { useAppSelector } from '@/shared/hooks/useRedux';
import { CityAdminItem } from '@/entities/city/ui';
import { useCities } from '@/features/city';

import { Button } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { Preloader } from '@/shared/ui/Preloader';
import { Text } from '@/shared/ui/Text';

const AdminCities = () => {
    const queryClient = useQueryClient();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['cities'] });
    };

    const language = useAppSelector((state) => state.app.language);

    const { getCities, deleteCity } = useCities();

    const { data, isPending, isError } = useQuery({
        queryKey: ['cities'],
        queryFn: getCities,
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
                    <Text>Города {!!data && !!data.length && `(${data.length})`}</Text>

                    <Button href={`/${language}/admin/cities/create`} small>
                        Создать
                    </Button>
                </div>

                {!!data && !!data.length ? (
                    <div className={styles.adminTeamItems}>
                        {data?.map((city) => (
                            <CityAdminItem
                                key={city.id}
                                data={city}
                                deleteCallback={() => deleteCity(city.id, revalidateRequest)}
                            />
                        ))}
                    </div>
                ) : (
                    <NotContent text="Нет городов" />
                )}
            </div>
        </div>
    );
};

export default AdminCities;
