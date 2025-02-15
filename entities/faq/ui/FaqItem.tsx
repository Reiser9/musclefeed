'use client';

import React from 'react';
import cn from 'classnames';
import parse from 'html-react-parser';

import styles from './index.module.scss';

import type { FaqItem as FaqItemType } from '../model';
import { Minus, Plus } from '@/shared/icons';
import { useAppSelector } from '@/shared/hooks/useRedux';

type Props = {
    data: FaqItemType;
};

const FaqItem: React.FC<Props> = ({ data }) => {
    const [open, setOpen] = React.useState(false);

    const { question, answer } = data || {};
    const language = useAppSelector((state) => state.app.language);

    return (
        <div
            className={cn(styles.faqItem, {
                [styles.active]: open,
            })}
            onClick={() => setOpen((prev) => !prev)}
        >
            <div className={styles.faqItemTitleInner}>
                <p className={styles.faqItemTitle}>{question[language]}</p>

                <span className={styles.faqItemIcon}>{open ? <Minus /> : <Plus />}</span>
            </div>

            {open && <div className={styles.faqItemText}>{parse(answer[language])}</div>}
        </div>
    );
};

export default FaqItem;
