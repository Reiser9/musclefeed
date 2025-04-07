'use client';

import React from 'react';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';

import styles from '../../index.module.scss';

import type { Dish } from '@/entities/dish';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Button } from '@/shared/ui/Button';
import { ConfirmModal } from '@/shared/ui/Modal';
import { useOrder } from '@/features/order';
import { useTranslations } from 'next-intl';

type Props = {
    data: Dish;
    dayId?: number;
    isAdmin?: boolean;
};

const SwapItem: React.FC<Props> = ({ data, dayId, isAdmin = false }) => {
    const [confirmSwap, setConfirmSwap] = React.useState(false);
    const queryClient = useQueryClient();
    const t = useTranslations("Menu");

    const language = useAppSelector((state) => state.app.language);
    const { picture, name, description, dishType, id, fats, calories, carbohydrates, proteins } = data || {};

    const revalidateRequests = () => {
        if (isAdmin) {
            queryClient.invalidateQueries({ queryKey: ['admin_order_dishes_by_day', dayId] });
            queryClient.invalidateQueries({ queryKey: ['admin_order_swaps_by_dishes', dayId, dishType.id] });
        } else {
            queryClient.invalidateQueries({ queryKey: ['user_order_dishes_by_day', dayId] });
            queryClient.invalidateQueries({ queryKey: ['order_swaps_by_dishes', dayId, dishType.id] });
        }
    };

    const { replaceDish, adminReplaceDish } = useOrder();

    const handleReplaceDish = () => {
        if (!dishType.id || !id || !dayId) return;

        if (isAdmin) {
            adminReplaceDish(language, dayId, dishType.id, id, revalidateRequests);
            return;
        }

        replaceDish(language, dayId, dishType.id, id, revalidateRequests);
    };

    return (
        <>
            <div className={styles.swapElem}>
                <div className={styles.swapElemImg}>
                    <Image src={picture} alt={name[language]} fill />
                </div>

                <div className={styles.swapElemWrapper}>
                    <p className={styles.swapElemTitle}>{name[language]}</p>

                    <p className={styles.swapElemText}>{description[language]}</p>

                    <div className={styles.swapItemParamsMini}>
                        <p className={styles.swapItemParam}>{t("ccal")} {calories}</p>

                        <p className={styles.swapItemParam}>{t("b")} {proteins}</p>

                        <p className={styles.swapItemParam}>{t("j")} {fats}</p>

                        <p className={styles.swapItemParam}>{t("u")} {carbohydrates}</p>
                    </div>

                    <Button
                        small
                        color="green"
                        className={styles.swapElemButton}
                        full
                        onClick={() => setConfirmSwap(true)}
                    >
                        {language === 'ru' ? 'Выбрать' : 'בחר'}
                    </Button>
                </div>
            </div>

            <ConfirmModal
                value={confirmSwap}
                setValue={setConfirmSwap}
                title={language === 'ru' ? 'Вы действительно хотите заменить блюдо?' : 'האם אתה באמת רוצה להחליף מנה?'}
                callback={handleReplaceDish}
            />
        </>
    );
};

export default SwapItem;
