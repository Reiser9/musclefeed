'use client';

import React from 'react';

import styles from './index.module.scss';

import { Menu } from '../model';
import { Text } from '@/shared/ui/Text';

type Props = {
    data: Menu;
};

const MenuAdminItem: React.FC<Props> = ({ data }) => {
    const { isPublished, adminName } = data || {};

    return (
        <div className={styles.menuAdminItem}>
            <Text variant="text2">{adminName}</Text>

            <Text variant="text2">Опубликовано: {isPublished ? 'Да' : 'Нет'}</Text>
        </div>
    );
};

export default MenuAdminItem;
