'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './index.module.scss';

import type { MenuType } from '../model';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Delete } from '@/shared/icons';

import { ConfirmModal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';

type Props = {
    data: MenuType;
    deleteCallback: () => void;
};

const MenuTypeItem: React.FC<Props> = ({ data, deleteCallback = () => {} }) => {
    const [deleteModal, setDeleteModal] = React.useState(false);

    const { id, name, description, menuType, initialPrice, isPublished } = data || {};
    const { backgroundPicture } = menuType || {};
    const language = useAppSelector((state) => state.app.language);

    return (
        <>
            <div className={styles.menuAdmin}>
                <Link href={`/${language}/admin/typesmenu/edit/${id}`} className={styles.menuAdminImg}>
                    <Image src={backgroundPicture} alt={name[language]} fill />
                </Link>

                <Text>{name.ru}</Text>

                <Text variant="text2">{description?.ru}</Text>
                <Text variant="text2">Цена: {initialPrice?.ru}</Text>
                <Text variant="text2">Опубликован: {isPublished ? 'Да' : 'Нет'}</Text>

                <button className={styles.menuAdminDelete} onClick={() => setDeleteModal(true)}>
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

export default MenuTypeItem;
