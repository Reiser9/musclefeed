'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

import styles from '../index.module.scss';

import type { MenuDay, MenuDTO } from '@/entities/menu';
import type { PriceItemDTO } from '@/entities/menu/model';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Foods, Plus } from '@/shared/icons';
import { useMenu } from '@/features/menu';
import { useAdminDish } from '@/features/admin';
import DayItem from '../ui/DayItem';
import PriceItem from '../ui/PriceItem';

import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Select } from '@/shared/ui/Select';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';

const emptyPriceElem = {
    price: '',
    daysCount: '',
    totalPriceRu: '',
    totalPriceHe: '',
    pricePerDayRu: '',
    pricePerDayHe: '',
};

const AdminMenuCreate = () => {
    const [cycleDate, setCycleDate] = React.useState('');

    // Дни меню
    const [prices, setPrices] = React.useState<PriceItemDTO[]>([emptyPriceElem]);
    const [days, setDays] = React.useState<MenuDay[]>([{ number: 1, dishes: [] }]);

    const addPrice = React.useCallback(() => {
        if (prices.length >= 50) return;
        setPrices((prev) => [...prev, emptyPriceElem]);
    }, [prices]);

    const removePrice = React.useCallback(
        (index: number) => {
            if (prices.length <= 1) return;
            setPrices((prev) => prev.filter((_, i) => i !== index));
        },
        [prices],
    );

    const updatePrice = React.useCallback((index: number, key: keyof PriceItemDTO, value: string) => {
        setPrices((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
    }, []);

    const addDay = React.useCallback(() => {
        if (days.length >= 50) return;
        setDays((prev) => [...prev, { number: prev.length + 1, dishes: [] }]);
    }, [days]);

    const removeDay = React.useCallback(
        (index: number) => {
            if (days.length <= 1) return;
            setDays((prev) => prev.filter((_, i) => i !== index));
        },
        [days],
    );

    const addDish = React.useCallback((dayIndex: number, dishTypeId: number, dishId: number, isPrimary: boolean) => {
        setDays((prev) =>
            prev.map((day, index) =>
                index === dayIndex
                    ? {
                          ...day,
                          dishes: isPrimary
                              ? [
                                    ...day.dishes.filter((d) => d.dishTypeId !== String(dishTypeId) || !d.isPrimary),
                                    { dishTypeId: String(dishTypeId), dishId: String(dishId), isPrimary },
                                ]
                              : [...day.dishes, { dishTypeId: String(dishTypeId), dishId: String(dishId), isPrimary }],
                      }
                    : day,
            ),
        );
    }, []);

    const addReplacementPlaceholder = (dayIndex: number, dishTypeId: number) => {
        setDays((prev) =>
            prev.map((day, index) =>
                index === dayIndex
                    ? {
                          ...day,
                          dishes: [...day.dishes, { dishTypeId: String(dishTypeId), dishId: null, isPrimary: false }],
                      }
                    : day,
            ),
        );
    };

    const removeDish = React.useCallback((dayIndex: number, dishId: number) => {
        setDays((prev) =>
            prev.map((day, index) =>
                index === dayIndex
                    ? {
                          ...day,
                          dishes: day.dishes.some((d) => d.dishId === String(dishId))
                              ? day.dishes.filter((d) => d.dishId !== String(dishId))
                              : day.dishes,
                      }
                    : day,
            ),
        );
    }, []);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<MenuDTO>();

    const { createMenu, getTypesmenu } = useMenu();
    const { getDishTypes, getDishsPagination } = useAdminDish();
    const language = useAppSelector((state) => state.app.language);
    const router = useRouter();

    const { data, isPending, isError } = useQuery({
        queryKey: ['typesmenu'],
        queryFn: getTypesmenu,
        staleTime: 1000 * 60 * 5,
    });

    const { data: dishTypes } = useQuery({
        queryKey: ['dish_types'],
        queryFn: getDishTypes,
        staleTime: 1000 * 60 * 60,
    });

    const { data: dish } = useQuery({
        queryKey: ['dish'],
        queryFn: () => getDishsPagination(1, 1500, ''),
    });

    const onSubmit: SubmitHandler<MenuDTO> = (data) => {
        if (!cycleDate) return;

        const daysWithoutNulls = days.map((day) => ({
            ...day,
            dishes: day.dishes.filter((dish) => dish.dishId !== null),
        }));

        const menuData = {
            ...data,
            cycleStartDate: cycleDate,
            days: daysWithoutNulls,
            prices: prices,
        };

        createMenu(menuData, () => router.replace(`/${language}/admin/menu`));
    };

    const menuTypeOptions = React.useMemo(() => {
        return (data || []).map((elem) => ({
            id: elem.id,
            name: elem.name[language],
        }));
    }, [data, language]);

    return (
        <div className={styles.adminTeam}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.createMenuForm}>
                <div className={styles.menuFormFull}>
                    <Text>Создание меню</Text>
                </div>

                <div className={styles.menuFormFull}>
                    <Checkbox id="create_menu_publish" label="Опубликовать" {...register('isPublished')} />
                </div>

                <div className={styles.menuFormItem}>
                    {isPending ? (
                        <Preloader small page />
                    ) : isError ? (
                        <NotContent text="Произошла ошибка при загрузке типов меню" />
                    ) : !!data && !!data.length ? (
                        <Select
                            {...register('menuTypeId')}
                            options={menuTypeOptions}
                            title="Тип меню"
                            icon={<Foods />}
                            full
                        ></Select>
                    ) : (
                        <NotContent text="Для начала создайте тип меню" />
                    )}
                </div>

                <div className={styles.menuFormItem}>
                    <Input
                        {...register('adminName')}
                        error={!!errors.adminName}
                        errorMessage={errors.adminName?.message}
                        full
                        title={'Название для админа'}
                        value={watch('adminName', '')}
                    />
                </div>

                <div className={styles.menuFormItem}>
                    <Input
                        {...register('nameRu')}
                        error={!!errors.nameRu}
                        errorMessage={errors.nameRu?.message}
                        full
                        title={'Название ru'}
                        value={watch('nameRu', '')}
                    />
                </div>

                <div className={styles.menuFormItem}>
                    <Input
                        {...register('nameHe')}
                        error={!!errors.nameHe}
                        errorMessage={errors.nameHe?.message}
                        full
                        title={'Название he'}
                        value={watch('nameHe', '')}
                    />
                </div>

                <div className={styles.menuFormItem}>
                    <Input
                        {...register('descriptionRu')}
                        error={!!errors.descriptionRu}
                        errorMessage={errors.descriptionRu?.message}
                        full
                        title={'Описание ru'}
                        value={watch('descriptionRu', '')}
                        component="textarea"
                    />
                </div>

                <div className={styles.menuFormItem}>
                    <Input
                        {...register('descriptionHe')}
                        error={!!errors.descriptionHe}
                        errorMessage={errors.descriptionHe?.message}
                        full
                        title={'Описание he'}
                        value={watch('descriptionHe', '')}
                        component="textarea"
                    />
                </div>

                <div className={styles.menuFormItem}>
                    <Input
                        {...register('mealsCountRu')}
                        error={!!errors.mealsCountRu}
                        errorMessage={errors.mealsCountRu?.message}
                        full
                        title={'Количество приемов пищи ru'}
                        value={watch('mealsCountRu', '')}
                    />
                </div>

                <div className={styles.menuFormItem}>
                    <Input
                        {...register('mealsCountHe')}
                        error={!!errors.mealsCountHe}
                        errorMessage={errors.mealsCountHe?.message}
                        full
                        title={'Количество приемов пищи he'}
                        value={watch('mealsCountHe', '')}
                    />
                </div>

                <div className={styles.menuFormItem}>
                    <Input
                        {...register('calories')}
                        error={!!errors.calories}
                        errorMessage={errors.calories?.message}
                        full
                        title={'Калории'}
                        value={watch('calories', '')}
                        type="number"
                    />
                </div>

                <div className={styles.menuFormItem}>
                    <Input
                        {...register('order')}
                        error={!!errors.order}
                        errorMessage={errors.order?.message}
                        full
                        title={'Порядок'}
                        value={watch('order', '')}
                        type="number"
                    />
                </div>

                <div className={styles.menuFormItem}>
                    <div className={styles.datePickerWrapper}>
                        <Text variant="text3">Выберите дату начала цикла</Text>

                        <DatePicker
                            className={styles.datePicker}
                            format="DD.MM.YYYY"
                            value={cycleDate ? dayjs(cycleDate) : null}
                            onChange={(date) => setCycleDate(date.format('YYYY-MM-DD'))}
                        />
                    </div>
                </div>

                <div className={styles.menuFormPrices}>
                    <Text variant="text2">Всего цен: {prices.length}</Text>

                    {prices.map((price, index) => (
                        <PriceItem
                            key={index}
                            data={price}
                            number={index + 1}
                            removePrice={() => removePrice(index)}
                            updatePrice={updatePrice}
                            index={index}
                        />
                    ))}

                    <span className={styles.menuFormDayAdd} onClick={addPrice}>
                        <Plus />
                        Добавить
                    </span>
                </div>

                <div className={styles.menuFormDays}>
                    <Text variant="text2">Всего дней: {days.length}</Text>

                    {days.map((day, index) => (
                        <DayItem
                            key={index}
                            day={day.number}
                            dayObject={day}
                            dishTypes={dishTypes}
                            dish={dish}
                            removeDay={() => removeDay(index)}
                            addDish={addDish}
                            removeDish={removeDish}
                            addReplacementPlaceholder={addReplacementPlaceholder}
                            setDays={setDays}
                        />
                    ))}

                    <span className={styles.menuFormDayAdd} onClick={addDay}>
                        <Plus />
                        Добавить
                    </span>
                </div>

                <Button full>Создать</Button>
            </form>
        </div>
    );
};

export default AdminMenuCreate;
