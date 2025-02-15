'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './index.module.scss';

import type { Team } from '../model';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Delete } from '@/shared/icons';

import { Text } from '@/shared/ui/Text';
import { ConfirmModal } from '@/shared/ui/Modal';

type Props = {
    data: Team;
    deleteCallback?: () => void;
};

const TeamAdminItem: React.FC<Props> = ({ data, deleteCallback = () => {} }) => {
    const [deleteModal, setDeleteModal] = React.useState(false);

    const { id, name, picture, role, description } = data || {};
    const language = useAppSelector((state) => state.app.language);

    return (
        <>
            <div className={styles.teamAdmin}>
                <Link href={`/${language}/admin/team/edit/${id}`} className={styles.teamAdminImg}>
                    <Image src={picture} alt={name[language]} fill />
                </Link>

                <Text>{name?.ru}</Text>

                <Text variant="text2">{role?.ru}</Text>

                <Text variant="text2">{description?.ru}</Text>

                <button className={styles.teamAdminDelete} onClick={() => setDeleteModal(true)}>
                    <Delete />
                </button>
            </div>

            <ConfirmModal
                value={deleteModal}
                setValue={setDeleteModal}
                callback={deleteCallback}
                title={`Вы действительно хотите удалить участника команды ${name[language]}`}
            />
        </>
    );
};

export default TeamAdminItem;
