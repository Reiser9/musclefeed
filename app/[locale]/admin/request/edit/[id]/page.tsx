'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import styles from '../../index.module.scss';

import { useOrder } from '@/features/order';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Text } from '@/shared/ui/Text';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { useAppSelector } from '@/shared/hooks/useRedux';

const AdminRequestEdit = () => {
    const { id } = useParams();

    const [isProcessed, setIsProcessed] = React.useState(false);
    const language = useAppSelector((state) => state.app.language);

    const { getAdminChangeRequestById, updateChangeRequest } = useOrder();
    const router = useRouter();

    const { data, isPending, isError } = useQuery({
        queryKey: ['request_by_id', id],
        queryFn: () => getAdminChangeRequestById(String(id)),
        enabled: !!id,
    });

    const { comment, order, orderChangeType } = data || {};
    const { allergies, email, phone, fullName } = order || {};

    const handleUpdateChangeRequest = () => {
        updateChangeRequest(String(id), isProcessed, () => router.push(`/${language}/admin/request`));
    };

    React.useEffect(() => {
        if (data) {
            setIsProcessed(data.isProcessed);
        }
    }, [data]);

    if (isPending) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent />;
    }

    return (
        <div className={styles.adminDish}>
            <div className={styles.createForm}>
                <Text>Просмотр запроса изменений</Text>

                <Checkbox id="is_processed" label="Обработан" value={isProcessed} setValue={setIsProcessed} />

                <Input full title={'Комментарий'} component="textarea" disabled value={comment} />

                <Input full title={'Тип изменения'} disabled value={orderChangeType} />

                <Input full title={'Телефон'} disabled value={phone} />

                <Input full title={'E-mail'} disabled value={email} />

                <Input full title={'Аллергии'} disabled value={allergies ? allergies : '-'} />

                <Input full title={'Имя и фамилия'} disabled value={fullName} />

                <Button full onClick={handleUpdateChangeRequest}>
                    Сохранить
                </Button>
            </div>
        </div>
    );
};

export default AdminRequestEdit;
