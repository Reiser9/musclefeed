'use client';

import React from 'react';
import Link from 'next/link';

import styles from './index.module.scss';

import type { UserShortInfo } from '../auth';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Text } from '@/shared/ui/Text';
import { Delete } from '@/shared/icons';
import { ConfirmModal } from '@/shared/ui/Modal';

type Props = {
    data: UserShortInfo;
    deleteCallback?: () => void;
};

const UserAdminItem: React.FC<Props> = ({ data, deleteCallback = () => {} }) => {
    const [deleteModal, setDeleteModal] = React.useState(false);
    const language = useAppSelector((state) => state.app.language);

    const { id, email, firstName, lastName, phone, allergies, isVerified, roles } = data || {};

    return (
        <>
            <div className={styles.userAdminItem}>
                <Link href={`/${language}/admin/users/edit/${id}`} className={styles.userAdminItemLink}>
                    ID: {id}
                </Link>

                <Text variant="text2">Email: {email}</Text>
                <Text variant="text2">Телефон: {phone}</Text>
                <Text variant="text2">Имя: {firstName}</Text>
                <Text variant="text2">Фамилия: {lastName}</Text>
                <Text variant="text2">Аллергии: {allergies ?? '-'}</Text>
                <Text variant="text2">Верификация: {isVerified ? '+' : '-'}</Text>
                <Text variant="text2">Роли: {roles.length ? roles.join(', ') : '-'}</Text>

                <button className={styles.teamAdminDelete} onClick={() => setDeleteModal(true)}>
                    <Delete />
                </button>
            </div>

            <ConfirmModal
                value={deleteModal}
                setValue={setDeleteModal}
                callback={deleteCallback}
                title={`Вы действительно хотите удалить пользователя ${email}?`}
            />
        </>
    );
};

export default UserAdminItem;
