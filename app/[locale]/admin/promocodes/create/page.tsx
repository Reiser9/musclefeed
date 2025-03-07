'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import styles from '../index.module.scss';

import { useAppSelector } from '@/shared/hooks/useRedux';

import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { usePromocode } from '@/features/promocode';

const AdminCreatePromocode = () => {
    const [code, setCode] = React.useState('');
    const [discount, setDiscount] = React.useState('');

    const { createPromocode } = usePromocode();
    const language = useAppSelector((state) => state.app.language);
    const router = useRouter();

    const createPromoHandler = () => {
        createPromocode(code, discount, () => router.replace(`/${language}/admin/promocodes`));
    };

    return (
        <div className={styles.adminTeam}>
            <div className={styles.createForm}>
                <Text>Создание промокода</Text>

                <Input
                    full
                    title={'Промокод (только латинские символы и _)'}
                    placeholder="Пример: Muscle_feed"
                    value={code}
                    setValue={setCode}
                />
                <Input full title={'Процент скидки'} type="number" value={discount} setValue={setDiscount} />

                <Button onClick={createPromoHandler} full>
                    Создать
                </Button>
            </div>
        </div>
    );
};

export default AdminCreatePromocode;
