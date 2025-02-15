'use client';

import React from 'react';

import styles from './index.module.scss';

import type { Team } from '../model';
import { useAppSelector } from '@/shared/hooks/useRedux';
import Image from 'next/image';

type Props = {
    data: Team;
};

const TeamItem: React.FC<Props> = ({ data }) => {
    const { name, role, description, picture } = data || {};

    const language = useAppSelector((state) => state.app.language);

    return (
        <div className={styles.teamItem}>
            <div className={styles.teamItemImg}>
                <Image src={picture} alt={name[language]} fill />
            </div>

            <div className={styles.teamItemTextInner}>
                <p className={styles.teamItemRole}>{role[language]}</p>

                <p className={styles.teamItemName}>{name[language]}</p>

                <p className={styles.teamItemDesc}>{description[language]}</p>
            </div>
        </div>
    );
};

export default TeamItem;
