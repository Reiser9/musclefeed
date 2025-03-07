'use client';

import React from 'react';
import cn from 'classnames';
import { Select as SelectAnt } from 'antd';

import styles from '../index.module.scss';

import type { DishPagination, DishType } from '@/entities/dish';
import type { MenuDay } from '@/entities/menu';
import { ArrowBottom, Delete, Plus } from '@/shared/icons';

import { Text } from '@/shared/ui/Text';

type DayProps = {
    dishTypes?: DishType[] | '';
    dish?: DishPagination | '';
    day: number;
    setDays: React.Dispatch<React.SetStateAction<MenuDay[]>>;
    removeDay?: () => void;
    dayObject: MenuDay;
    addDish: (dayIndex: number, dishTypeId: number, dishId: number, isPrimary: boolean) => void;
    removeDish: (dayIndex: number, dishId: number) => void;
    addReplacementPlaceholder: (dayIndex: number, dishTypeId: number) => void;
};

const DayItem: React.FC<DayProps> = ({
    dishTypes,
    dish,
    day,
    removeDay,
    dayObject,
    addDish,
    removeDish,
    addReplacementPlaceholder,
    setDays,
}) => {
    const [show, setShow] = React.useState(true);

    return (
        <div className={styles.menuFormDayWrapper}>
            <div
                className={cn(styles.menuFormDaySpoiler, { [styles.active]: show })}
                onClick={() => setShow((prev) => !prev)}
            >
                <Text variant="text2">День {day}</Text>
                <ArrowBottom />
            </div>

            {show && (
                <div className={styles.menuFormDay}>
                    {!!dishTypes &&
                        dishTypes?.map((type) => {
                            const mainDish = dayObject.dishes.find(
                                (d) => d.dishTypeId == String(type.id) && d.isPrimary,
                            );
                            const replacements = dayObject.dishes.filter(
                                (d) => d.dishTypeId == String(type.id) && !d.isPrimary,
                            );

                            return (
                                <div key={type.id} className={styles.menuFormItemDish}>
                                    <Text variant="text3">{type.name.ru}</Text>

                                    <Text variant="text3">Основное блюдо</Text>

                                    <SelectAnt
                                        className={cn(styles.menuFormItemDishSelect, styles.full)}
                                        showSearch
                                        options={
                                            !!dish && !!dish.dishes
                                                ? dish?.dishes
                                                      .filter((d) => d.dishType.id == type.id)
                                                      .map((item) => ({
                                                          value: item.id,
                                                          label: item.adminName,
                                                      }))
                                                : undefined
                                        }
                                        onChange={(value) => addDish(day - 1, type.id, +value, true)}
                                        value={mainDish?.dishId ? +mainDish?.dishId : null}
                                        filterOption={(input, option) =>
                                            !!option && option.label.toLowerCase().includes(input.toLowerCase())
                                        }
                                    />

                                    <Text variant="text3">Замены ({replacements.length})</Text>

                                    {replacements.map((replacement, idx) => (
                                        <div key={idx} className={styles.menuFormItemDishReplacement}>
                                            <SelectAnt
                                                className={styles.menuFormItemDishSelect}
                                                showSearch
                                                options={
                                                    !!dish && !!dish.dishes
                                                        ? dish?.dishes
                                                              .filter((d) => d.dishType.id == type.id)
                                                              .map((item) => ({
                                                                  value: item.id,
                                                                  label: item.adminName,
                                                              }))
                                                        : undefined
                                                }
                                                onChange={(value) => {
                                                    setDays((prev) =>
                                                        prev.map((dayItem, dayIdx) =>
                                                            dayIdx === day - 1
                                                                ? {
                                                                      ...dayItem,
                                                                      dishes: dayItem.dishes.map((d, dishIdx) =>
                                                                          dishIdx ===
                                                                          dayObject.dishes.findIndex(
                                                                              (d) => d === replacement,
                                                                          )
                                                                              ? { ...d, dishId: String(value) }
                                                                              : d,
                                                                      ),
                                                                  }
                                                                : dayItem,
                                                        ),
                                                    );
                                                }}
                                                value={replacement.dishId ? +replacement.dishId : null}
                                                filterOption={(input, option) =>
                                                    !!option && option.label.toLowerCase().includes(input.toLowerCase())
                                                }
                                            />
                                            <span
                                                className={styles.menuFormDeleteSwap}
                                                onClick={() =>
                                                    removeDish(day - 1, replacement.dishId ? +replacement.dishId : 0)
                                                }
                                            >
                                                <Delete />
                                            </span>
                                        </div>
                                    ))}

                                    <span
                                        className={styles.menuFormDayAdd}
                                        onClick={() => addReplacementPlaceholder(day - 1, type.id)}
                                    >
                                        <Plus /> Добавить замену
                                    </span>
                                </div>
                            );
                        })}
                </div>
            )}

            <span className={styles.menuFormDelete} onClick={removeDay}>
                <Delete />
            </span>
        </div>
    );
};

export default React.memo(DayItem);
