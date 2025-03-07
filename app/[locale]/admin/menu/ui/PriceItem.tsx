'use client';

import React from 'react';
import cn from 'classnames';

import styles from '../index.module.scss';

import type { PriceItemDTO } from '@/entities/menu/model';
import { ArrowBottom, Delete } from '@/shared/icons';

import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';

type Props = {
    data: PriceItemDTO;
    number: number;
    removePrice: () => void;
    updatePrice: (index: number, key: keyof PriceItemDTO, value: string) => void;
    index: number;
};

const PriceItem: React.FC<Props> = ({ data, number, removePrice, updatePrice, index }) => {
    const [show, setShow] = React.useState(true);

    return (
        <div className={styles.menuFormPriceWrapper}>
            <div
                className={cn(styles.menuFormDaySpoiler, { [styles.active]: show })}
                onClick={() => setShow((prev) => !prev)}
            >
                <Text variant="text2">Цена {number}</Text>
                <ArrowBottom />
            </div>

            {show && (
                <div className={styles.menuFormDay}>
                    <div className={styles.menuFormPriceInput}>
                        <Input
                            title="Цена"
                            full
                            value={data.price}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                updatePrice(index, 'price', e.target.value)
                            }
                        />
                    </div>

                    <div className={styles.menuFormPriceInput}>
                        <Input
                            title="Количество дней"
                            full
                            value={data.daysCount}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                updatePrice(index, 'daysCount', e.target.value)
                            }
                        />
                    </div>

                    <div className={styles.menuFormPriceInput}>
                        <Input
                            title="Текст общей цены ru"
                            full
                            value={data.totalPriceRu}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                updatePrice(index, 'totalPriceRu', e.target.value)
                            }
                        />
                    </div>

                    <div className={styles.menuFormPriceInput}>
                        <Input
                            title="Текст общей цены he"
                            full
                            value={data.totalPriceHe}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                updatePrice(index, 'totalPriceHe', e.target.value)
                            }
                        />
                    </div>

                    <div className={styles.menuFormPriceInput}>
                        <Input
                            title="Текст дневной цены ru"
                            full
                            value={data.pricePerDayRu}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                updatePrice(index, 'pricePerDayRu', e.target.value)
                            }
                        />
                    </div>

                    <div className={styles.menuFormPriceInput}>
                        <Input
                            title="Текст дневной цены he"
                            full
                            value={data.pricePerDayHe}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                updatePrice(index, 'pricePerDayHe', e.target.value)
                            }
                        />
                    </div>

                    <div className={styles.menuFormPriceInput}>
                        <Input
                            title="Скидка в процентах"
                            full
                            value={data.discount}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                updatePrice(index, 'discount', e.target.value)
                            }
                        />
                    </div>

                    <div className={styles.menuFormPriceInput}>
                        <Input
                            title="Количество подарочных дней"
                            full
                            value={data.giftDaysCount}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                updatePrice(index, 'giftDaysCount', e.target.value)
                            }
                        />
                    </div>
                </div>
            )}

            <span className={styles.menuFormDelete} onClick={removePrice}>
                <Delete />
            </span>
        </div>
    );
};

export default PriceItem;
