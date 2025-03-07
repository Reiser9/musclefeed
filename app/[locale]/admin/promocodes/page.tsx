'use client';

import React from 'react';
import cn from 'classnames';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';

import { usePromocode } from '@/features/promocode';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { NotContent } from '@/shared/ui/NotContent';
import { Preloader } from '@/shared/ui/Preloader';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { PromocodeItem } from '@/entities/promocode/ui';

const AdminPromocode = () => {
    const [page, setPage] = React.useState(1);
    const queryClient = useQueryClient();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['promocodes'] });
    };

    const language = useAppSelector((state) => state.app.language);

    const { getPromocodes, deletePromocode } = usePromocode();

    const { data, isPending, isError } = useQuery({
        queryKey: ['promocodes'],
        queryFn: () => getPromocodes(page, 12),
    });

    if (isPending) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent />;
    }

    return (
        <PrivateWrapper haveRole="ADMIN">
            <div className={styles.adminTeam}>
                <div className={styles.adminTeamWrapper}>
                    <div className={styles.titleWrap}>
                        <Text>Промокоды {!!data && !!data.totalCount && `(${data.totalCount})`}</Text>

                        <Button href={`/${language}/admin/promocodes/create`} small>
                            Создать
                        </Button>
                    </div>

                    {!!data && !!data.promocodes.length ? (
                        <div className={styles.adminTeamItems}>
                            {data?.promocodes.map((promo) => (
                                <PromocodeItem
                                    key={promo.id}
                                    data={promo}
                                    deleteCallback={() => deletePromocode(promo.id, revalidateRequest)}
                                />
                            ))}
                        </div>
                    ) : (
                        <NotContent text="Нет промокодов" />
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
            </div>
        </PrivateWrapper>
    );
};

export default AdminPromocode;
