'use client';

import React from 'react';
import cn from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import styles from './index.module.scss';

import type { MenuUser } from '@/entities/menu';
import { useMenu } from '@/features/menu';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { Button } from '@/shared/ui/Button';

type Props = {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    calories: number;
    setCalories: React.Dispatch<React.SetStateAction<number>>;
    chooseProgram: (value: MenuUser) => void;
};

const CalcCaloriesForm: React.FC<Props> = ({ value, setValue, calories, setCalories, chooseProgram }) => {
    const [year, setYear] = React.useState('');
    const [height, setHeight] = React.useState('');
    const [weight, setWeight] = React.useState('');
    const [gender, setGender] = React.useState('female');
    const [activity, setActivity] = React.useState('1.2');
    const [target, setTarget] = React.useState('0.8');

    const language = useAppSelector((state) => state.app.language);
    const { getRecommend } = useMenu();
    const t = useTranslations('Calc');

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['calc_norm'],
        queryFn: () => getRecommend(calories),
        enabled: !!calories,
    });

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

    React.useEffect(() => {
        if (calories) {
            refetch();
        }
    }, [calories]);

    return (
        <Modal size="big" value={value} setValue={setValue}>
            <Text variant="h3" upper>
                {t('title')}
            </Text>

            <p className={styles.calcText}>{t('text')}</p>

            <div className={styles.calcForm}>
                <div className={styles.calcFormItem}>
                    <p className={styles.calcFormItemTitle}>{t('data')}</p>

                    <div className={styles.calcFormItemContent}>
                        <input
                            type="number"
                            className={cn(styles.calcFormItemElem, styles.calcFormItemInput)}
                            placeholder={t('year')}
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                        <input
                            type="number"
                            className={cn(styles.calcFormItemElem, styles.calcFormItemInput)}
                            placeholder={t('height')}
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                        <input
                            type="number"
                            className={cn(styles.calcFormItemElem, styles.calcFormItemInput)}
                            placeholder={t('weight')}
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.calcFormItem}>
                    <p className={styles.calcFormItemTitle}>{t('gender')}</p>

                    <div className={styles.calcFormItemContent}>
                        <button
                            className={cn(styles.calcFormItemElem, styles.calcFormItemButton, {
                                [styles.active]: gender === 'female',
                            })}
                            onClick={() => setGender('female')}
                        >
                            {t('female')}
                        </button>

                        <button
                            className={cn(styles.calcFormItemElem, styles.calcFormItemButton, {
                                [styles.active]: gender === 'male',
                            })}
                            onClick={() => setGender('male')}
                        >
                            {t('male')}
                        </button>
                    </div>
                </div>

                <div className={styles.calcFormItem}>
                    <p className={styles.calcFormItemTitle}>{t('activity')}</p>

                    <div className={styles.calcFormItemContent}>
                        <button
                            className={cn(styles.calcFormItemElem, styles.calcFormItemButton, styles.big, {
                                [styles.active]: activity === '1.2',
                            })}
                            onClick={() => setActivity('1.2')}
                        >
                            {t('activity1')}
                        </button>

                        <button
                            className={cn(styles.calcFormItemElem, styles.calcFormItemButton, styles.big, {
                                [styles.active]: activity === '1.3',
                            })}
                            onClick={() => setActivity('1.3')}
                        >
                            {t('activity2')}
                        </button>

                        <button
                            className={cn(styles.calcFormItemElem, styles.calcFormItemButton, styles.big, {
                                [styles.active]: activity === '1.7',
                            })}
                            onClick={() => setActivity('1.7')}
                        >
                            {t('activity3')}
                        </button>

                        <button
                            className={cn(styles.calcFormItemElem, styles.calcFormItemButton, styles.big, {
                                [styles.active]: activity === '1.9',
                            })}
                            onClick={() => setActivity('1.9')}
                        >
                            {t('activity4')}
                        </button>
                    </div>
                </div>

                <div className={styles.calcFormItem}>
                    <p className={styles.calcFormItemTitle}>{t('target')}</p>

                    <div className={styles.calcFormItemContent}>
                        <button
                            className={cn(styles.calcFormItemElem, styles.calcFormItemButton, styles.big, {
                                [styles.active]: target === '0.8',
                            })}
                            onClick={() => setTarget('0.8')}
                        >
                            {t('target1')}
                        </button>

                        <button
                            className={cn(styles.calcFormItemElem, styles.calcFormItemButton, styles.big, {
                                [styles.active]: target === '1',
                            })}
                            onClick={() => setTarget('1')}
                        >
                            {t('target2')}
                        </button>

                        <button
                            className={cn(styles.calcFormItemElem, styles.calcFormItemButton, styles.big, {
                                [styles.active]: target === '1.2',
                            })}
                            onClick={() => setTarget('1.2')}
                        >
                            {t('target3')}
                        </button>
                    </div>
                </div>

                {!!calories && (
                    <>
                        <Text fontWeight={600}>
                            {t('day_norm')} {calories}
                        </Text>

                        <div className={styles.calcFormWrp}>
                            <Text fontWeight={600}>{t('rec_title')}</Text>

                            {isLoading ? (
                                <Preloader page small />
                            ) : isError ? (
                                <NotContent />
                            ) : !!data && !!data.length ? (
                                <div className={styles.calcFormRecommend}>
                                    {data.map((menu) => (
                                        <div key={menu.id} className={styles.calcFormRecommendItem}>
                                            <Text variant="text2" fontWeight={600}>
                                                {menu.name[language]} {menu.calories} {t('calories')}
                                            </Text>

                                            <Text variant="text3">{menu.description[language]}</Text>

                                            <Button
                                                full
                                                small
                                                onClick={() => chooseProgram(menu as unknown as MenuUser)}
                                            >
                                                {t('choose')}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <NotContent text="Нет подходящих рационов" />
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* <div className={styles.calcResult}>
                <p className={styles.calcResultCount}>
                    Результат: <span className={styles.calcResultValue}>{calories ? calories : '-'}</span> ККал/день
                </p>

                <Button color="green" className={styles.calcResultButton} onClick={() => setValue(false)}>
                    Применить
                    <ArrowRight />
                </Button>
            </div> */}
        </Modal>
    );
};

export default CalcCaloriesForm;
