'use client';

import React from 'react';

import styles from './index.module.scss';

const TeamItem = () => {
    return (
        <div className={styles.teamItem}>
            <div className={styles.teamItemImg}>
                <img src="img/team1.png" alt="team" />
            </div>

            <div className={styles.teamItemTextInner}>
                <p className={styles.teamItemRole}>Наш шеф</p>

                <p className={styles.teamItemName}>Миша</p>

                <p className={styles.teamItemDesc}>
                    Готовит классные блюда для вас и обожает готовить. Еда — это как ресторан, только с доставкой!
                </p>
            </div>
        </div>
    );
};

export default TeamItem;
