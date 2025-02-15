'use client';

import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';

import { useAppSelector } from '@/shared/hooks/useRedux';
import { useFaq } from '@/features/faq';

import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { Preloader } from '@/shared/ui/Preloader';
import { FaqAdminItem } from '@/entities/faq/ui';

const AdminFaq = () => {
    const queryClient = useQueryClient();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['faq'] });
    };

    const language = useAppSelector((state) => state.app.language);

    const { getFaq, deleteFaqById } = useFaq();

    const { data, isPending, isError } = useQuery({
        queryKey: ['faq'],
        queryFn: getFaq,
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
                <Text>Вопросы {!!data && !!data.length && `(${data.length})`}</Text>

                <Button href={`/${language}/admin/faq/create`} small>
                    Создать
                </Button>
            </div>

            {!!data && !!data.length ? (
                <div className={styles.adminTeamItems}>
                    {data?.map((faq) => (
                        <FaqAdminItem
                            key={faq.id}
                            data={faq}
                            deleteCallback={() => deleteFaqById(faq.id, revalidateRequest)}
                        />
                    ))}
                </div>
            ) : (
                <NotContent text="Нет вопросов" />
            )}
        </div>
    );
};

export default AdminFaq;
