'use client';

import React from 'react';
import cn from 'classnames';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/he';

import styles from '../../index.module.scss';

import type { Day } from '@/entities/order';
import { useAppSelector } from '@/shared/hooks/useRedux';

type Props = {
    data: Day;
    isActive: boolean;
    onClick: () => void;
};

const DayButton: React.FC<Props> = ({ data, isActive, onClick }) => {
    const language = useAppSelector((state) => state.app.language);
    const { date, isSkipped } = data || {};

    dayjs.locale(language);

    return (
        <button
            className={cn(styles.swapDateButton, {
                [styles.active]: isActive,
                [styles.disabled]: isSkipped,
            })}
            onClick={onClick}
        >
            {dayjs(date).format('dd')}
            <span>{dayjs(date).format('DD.MM.YYYY')}</span>
        </button>
    );
};

export default DayButton;
