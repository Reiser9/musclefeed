'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

import type { LocalNotify } from '@/entities/notify/model';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import { removeLocalNotify } from '@/store/slices/notify';

import { Text } from '@/shared/ui/Text';

type Props = {
    data: LocalNotify;
};

const Notify: React.FC<Props> = ({ data }) => {
    const { id, title, text, type, time } = data;

    const notifyTimeout = React.useRef<number | undefined>(undefined);

    const dispatch = useAppDispatch();

    const remove = React.useCallback(() => {
        dispatch(removeLocalNotify(id));
    }, [dispatch, id]);

    const removeOnClick = () => {
        remove();
        window.clearTimeout(notifyTimeout.current);
    };

    React.useEffect(() => {
        if (time !== -1) {
            notifyTimeout.current = window.setTimeout(remove, time);
        }

        return () => window.clearTimeout(notifyTimeout.current);
    }, [remove, time]);

    return (
        <div className={cn(styles.notifyItem, styles[type])} onClick={removeOnClick}>
            <div className={styles.notifyItemWrapper}>
                <Text fontWeight={600}>{title}</Text>
                <Text variant="text3">{text}</Text>
            </div>
        </div>
    );
};

export default Notify;
