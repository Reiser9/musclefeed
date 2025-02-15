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
import { ReviewsAdminItem } from '@/entities/review/ui';
import { useReviews } from '@/features/reviews';

const AdminReviews = () => {
    const [page, setPage] = React.useState(1);
    const queryClient = useQueryClient();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['team'] });
    };

    const language = useAppSelector((state) => state.app.language);

    const { getAdminReviews } = useReviews();

    const { data, isPending, isError } = useQuery({
        queryKey: ['admin_reviews'],
        queryFn: () => getAdminReviews(page),
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
                    <Text>Отзывы {!!data && !!data.length && `(${data.length})`}</Text>

                    <Button href={`/${language}/admin/reviews/create`} small>
                        Создать
                    </Button>
                </div>

                {!!data && !!data.length ? (
                    <div className={styles.adminTeamItems}>
                        {data?.map((review) => (
                            <ReviewsAdminItem
                                key={review.id}
                                data={review}
                                deleteCallback={() => deleteMember(review.id, revalidateRequest)}
                            />
                        ))}
                    </div>
                ) : (
                    <NotContent text="Нет отзывов" />
                )}
            </div>
        </div>
    );
};

export default AdminReviews;
