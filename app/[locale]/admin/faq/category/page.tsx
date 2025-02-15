'use client';

import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import styles from '../index.module.scss';

import { FaqAdminCategoryItem } from '@/entities/faq/ui';
import { useFaq } from '@/features/faq';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { Preloader } from '@/shared/ui/Preloader';

const AdminFaqCategories = () => {
    const queryClient = useQueryClient();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['faq_categories'] });
    };

    const language = useAppSelector((state) => state.app.language);

    const { getFaqCategories, deleteFaqCategory } = useFaq();

    const { data, isPending, isError } = useQuery({
        queryKey: ['faq_categories'],
        queryFn: getFaqCategories,
    });

    if (isPending) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent />;
    }

    return (
        <div className={styles.faqContent}>
            <div className={styles.titleWrap}>
                <Text>Категории {!!data && !!data.length && `(${data.length})`}</Text>

                <Button href={`/${language}/admin/faq/category/create`} small>
                    Создать
                </Button>
            </div>

            {!!data && !!data.length ? (
                <div className={styles.adminTeamItems}>
                    {data?.map((category) => (
                        <FaqAdminCategoryItem
                            key={category.id}
                            data={category}
                            deleteCallback={() => deleteFaqCategory(category.id, revalidateRequest)}
                        />
                    ))}
                </div>
            ) : (
                <NotContent text="Нет категорий" />
            )}
        </div>
    );
};

export default AdminFaqCategories;
