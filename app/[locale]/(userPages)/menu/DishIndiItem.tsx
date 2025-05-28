'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import styles from './index.module.scss';

import type { Dish } from '@/entities/dish';
import { ArrowRight, Minus, Plus } from '@/shared/icons';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Modal } from '@/shared/ui/Modal';

type Props = {
    data: Dish;
    cart: { quantity: number; dish: Dish }[];
    addToCart: () => void;
    incrementQuantity: () => void;
    decrementQuantity: () => void;
};

const DishIndiItem: React.FC<Props> = ({ data, cart, addToCart, incrementQuantity, decrementQuantity }) => {
    const item = cart.find((item) => item.dish.id === data.id);
    const [benefitsModal, setBenefitsModal] = React.useState(false);
    const { picture, name, description, proteins, fats, carbohydrates, calories, price, benefit } = data || {};

    const language = useAppSelector((state) => state.app.language);
    const t = useTranslations('Menu');

    return (
        <>
            <div className={styles.foodItem}>
                <div className={styles.foodItemImg}>
                    <Image src={picture} alt={name[language]} fill />
                </div>

                <div className={styles.foodItemTextInner}>
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
                        {!!price && <p className={styles.foodItemPrice}>{price} ₪</p>}

                        {benefit[language] && (
                            <Button full color="green" small onClick={() => setBenefitsModal(true)}>
                                {t('dish_more_buton')}
                            </Button>
                        )}

                        {item ? (
                            <div className={styles.foodButtonIndicator}>
                                <button onClick={decrementQuantity}>
                                    <Minus />
                                </button>

                                {item.quantity}

                                <button onClick={incrementQuantity}>
                                    <Plus />
                                </button>
                            </div>
                        ) : (
                            <Button small full onClick={addToCart}>
                                {t('choose_dish')}
                                <ArrowRight />
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

export default DishIndiItem;
