'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

import styles from '../../index.module.scss';

import { useUsers } from '@/features/admin';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { Text } from '@/shared/ui/Text';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';

const AdminEditUser = () => {
    const { id } = useParams();
    const [verify, setVerify] = React.useState(false);

    const { getUserById, updateUserInfo } = useUsers();
    const language = useAppSelector((state) => state.app.language);
    const router = useRouter();

    const {
        data: user,
        isPending: userIsPending,
        isError: userIsError,
    } = useQuery({
        queryKey: ['user_by_id', id],
        queryFn: () => getUserById(String(id)),
        enabled: !!id,
    });

    const { firstName, lastName, email, phone, roles, isVerified, allergies } = user || {};

    const saveUser = () => {
        updateUserInfo(String(id), verify, () => {
            router.push(`/${language}/admin/users`);
        });
    };

    React.useEffect(() => {
        setVerify(!!isVerified);
    }, [isVerified]);

    if (userIsPending) {
        return <Preloader page />;
    }

    if (userIsError) {
        return <NotContent />;
    }

    return (
        <div className={styles.adminTeam}>
            <div className={styles.createForm}>
                <Text>Редактирование пользователя</Text>

                <Checkbox id="user_verify" label="Верифицрован" value={verify} setValue={setVerify} />

                <Input disabled value={firstName} full title={'Имя'} />
                <Input disabled value={lastName} full title={'Фамилия'} />
                <Input disabled value={email} full title={'Email'} />
                <Input disabled value={phone} full title={'Телефон'} />
                <Input disabled value={roles?.join(', ')} full title={'Роли'} />
                <Input disabled value={allergies || '-'} full title={'Аллергии'} />

                <Button full onClick={saveUser}>
                    Сохранить
                </Button>
            </div>
        </div>
    );
};

export default AdminEditUser;
