'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import styles from './index.module.scss';

import type { Dish } from '../model';
import { Swap } from '@/shared/icons';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Modal } from '@/shared/ui/Modal';

type Props = {
    data: Dish;
    buttonText?: string;
    buttonCallback?: () => void;
};

const DishItem: React.FC<Props> = ({ data, buttonText, buttonCallback }) => {
    const [benefitsModal, setBenefitsModal] = React.useState(false);
    const { picture, name, description, proteins, fats, carbohydrates, calories, dishType, benefit } = data || {};

    const language = useAppSelector((state) => state.app.language);
    const t = useTranslations('Menu');

    return (
        <>
            <div className={styles.foodItem}>
                <div className={styles.foodItemImg}>
                    <Image src={picture} alt={name[language]} fill />
                </div>

                <div className={styles.foodItemTextInner}>
                    <p className={styles.foodItemTag}>{dishType.name[language]}</p>

                    <p className={styles.foodItemName}>{name[language]}</p>

                    <p className={styles.foodItemText}>{description[language]}</p>

                    <div className={styles.foodItemParams}>
                        <p className={styles.foodItemParam}>
                            <span>{t('ccal')}</span> {calories}
                        </p>
                        <p className={styles.foodItemParam}>
                            <span>{t('b')}</span> {proteins}
                        </p>
                        <p className={styles.foodItemParam}>
                            <span>{t('j')}</span> {fats}
                        </p>
                        <p className={styles.foodItemParam}>
                            <span>{t('u')}</span> {carbohydrates}
                        </p>
                    </div>

                    <div className={styles.foodItemButtons}>
                        {benefit[language] && (
                            <Button full color="green" small onClick={() => setBenefitsModal(true)}>
                                {t('dish_more_buton')}
                            </Button>
                        )}

                        {buttonCallback && (
                            <Button full className={styles.foodButton} onClick={buttonCallback}>
                                <Swap />
                                {buttonText ? buttonText : language === 'ru' ? 'Посмотреть замены' : 'ראה תחליפים'}
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {benefit[language] && (
                <Modal value={benefitsModal} setValue={setBenefitsModal}>
                    <Text variant="h3" upper>
                        {t('dish_more')}
                    </Text>

                    <div className={styles.benefitsText}>{benefit[language]}</div>
                </Modal>
            )}
        </>
    );
};

export default DishItem;
