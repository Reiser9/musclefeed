'use client';

import React from 'react';
import cn from 'classnames';

import { Button } from '@/shared/ui/Button';
import { ArrowRight } from '@/shared/icons';

import styles from './index.module.scss';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';

type Props = {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    calories: number;
    setCalories: React.Dispatch<React.SetStateAction<number>>;
};

const CalcCaloriesForm: React.FC<Props> = ({ value, setValue, calories, setCalories }) => {
    const [year, setYear] = React.useState('');
    const [height, setHeight] = React.useState('');
    const [weight, setWeight] = React.useState('');
    const [gender, setGender] = React.useState('female');
    const [activity, setActivity] = React.useState('1.2');
    const [target, setTarget] = React.useState('0.8');

    const calcCaloriesHandler = () => {
        const currentYear = new Date().getFullYear();
        const age = currentYear - +year;

        const validateYear = !year || +year <= 1900 || +year >= 2013;
        const validateHeight = !height || +height <= 100 || +height >= 230;
        const validateWeight = !weight || +weight <= 30 || +weight >= 300;

        if (age <= 12 || validateYear || validateHeight || validateWeight || !activity || !gender || !target)
            return setCalories(0);

        let base = 9.99 * +weight + 6.25 * +height - 4.92 * age;

        if (gender === 'male') {
            base += 5;
        } else if (gender === 'female') {
            base -= 161;
        }

        base = +(base * +activity * +target).toFixed(0);

        setCalories(base);
    };

    React.useEffect(() => {
        calcCaloriesHandler();
    }, [year, height, weight, gender, activity, target]);

    return (
        <Modal size="big" value={value} setValue={setValue}>
            <Text variant="h3" upper>
                Рассчитать норму калорий
            </Text>

            <p className={styles.calcText}>
                Наше меню разработано профессиональными диетологами, приготовлено только из натуральных продуктов и
                рассчитано на каждого человека под его цели.
            </p>

            <div className={styles.calcForm}>
                <div className={styles.calcFormItem}>
                    <p className={styles.calcFormItemTitle}>Ваши данные:</p>

                    <div className={styles.calcFormItemContent}>
                        <input
                            type="number"
                            className={cn(styles.calcFormItemElem, styles.calcFormItemInput)}
                            placeholder="Год рождения"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                        <input
                            type="number"
                            className={cn(styles.calcFormItemElem, styles.calcFormItemInput)}
                            placeholder="Рост, см"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                        <input
                            type="number"
                            className={cn(styles.calcFormItemElem, styles.calcFormItemInput)}
                            placeholder="Вес, кг"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.calcFormItem}>
                    <p className={styles.calcFormItemTitle}>Ваш пол:</p>

                    <div className={styles.calcFormItemContent}>
                        <button
                            className={cn(styles.calcFormItemElem, styles.calcFormItemButton, {
                                [styles.active]: gender === 'female',
                            })}
                            onClick={() => setGender('female')}
                        >
                            Женский
                        </button>

                        <button
                            className={cn(styles.calcFormItemElem, styles.calcFormItemButton, {
                                [styles.active]: gender === 'male',
                            })}
                            onClick={() => setGender('male')}
                        >
                            Мужской
                        </button>
                    </div>
                </div>

                <div className={styles.calcFormItem}>
                    <p className={styles.calcFormItemTitle}>Уровень активности:</p>

                    <div className={styles.calcFormItemContent}>
                        <button
                            className={cn(styles.calcFormItemElem, styles.calcFormItemButton, styles.big, {
                                [styles.active]: activity === '1.2',
                            })}
                            onClick={() => setActivity('1.2')}
                        >
                            Нет физической активности
                        </button>

                        <button
                            className={cn(styles.calcFormItemElem, styles.calcFormItemButton, styles.big, {
                                [styles.active]: activity === '1.3',
                            })}
                            onClick={() => setActivity('1.3')}
                        >
                            1-2 тренировки в неделю
                        </button>

                        <button
                            className={cn(styles.calcFormItemElem, styles.calcFormItemButton, styles.big, {
                                [styles.active]: activity === '1.7',
                            })}
                            onClick={() => setActivity('1.7')}
                        >
                            Каждодневные тренировки
                        </button>

                        <button
                            className={cn(styles.calcFormItemElem, styles.calcFormItemButton, styles.big, {
                                [styles.active]: activity === '1.9',
                            })}
                            onClick={() => setActivity('1.9')}
                        >
                            3-4 тренировки в неделю
                        </button>
                    </div>
                </div>

                <div className={styles.calcFormItem}>
                    <p className={styles.calcFormItemTitle}>Ваша цель:</p>

                    <div className={styles.calcFormItemContent}>
                        <button
                            className={cn(styles.calcFormItemElem, styles.calcFormItemButton, styles.big, {
                                [styles.active]: target === '0.8',
                            })}
                            onClick={() => setTarget('0.8')}
                        >
                            Сбросить вес
                        </button>

                        <button
                            className={cn(styles.calcFormItemElem, styles.calcFormItemButton, styles.big, {
                                [styles.active]: target === '1',
                            })}
                            onClick={() => setTarget('1')}
                        >
                            Поддерживать вес
                        </button>

                        <button
                            className={cn(styles.calcFormItemElem, styles.calcFormItemButton, styles.big, {
                                [styles.active]: target === '1.2',
                            })}
                            onClick={() => setTarget('1.2')}
                        >
                            Набор веса
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.calcResult}>
                <p className={styles.calcResultCount}>
                    Результат: <span className={styles.calcResultValue}>{calories ? calories : '-'}</span> ККал/день
                </p>

                <Button color="green" className={styles.calcResultButton} onClick={() => setValue(false)}>
                    Применить
                    <ArrowRight />
                </Button>
            </div>
        </Modal>
    );
};

export default CalcCaloriesForm;
