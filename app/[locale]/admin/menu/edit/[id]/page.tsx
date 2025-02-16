'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { DatePicker } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';

import styles from '../../index.module.scss';

import type { MenuDay, MenuDTO } from '@/entities/menu';
import { useMenu } from '@/features/menu';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Foods, Plus } from '@/shared/icons';
import { useAdminDish } from '@/features/admin';
import DayItem from '../../ui/DayItem';

import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { NotContent } from '@/shared/ui/NotContent';
import { Select } from '@/shared/ui/Select';
import { Preloader } from '@/shared/ui/Preloader';
import { Checkbox } from '@/shared/ui/Checkbox';

const AdminMenuEdit = () => {
    const { id } = useParams();
    const [cycleDate, setCycleDate] = React.useState<Dayjs | null>(null);
    const [publish, setPublish] = React.useState(false);

    const [days, setDays] = React.useState<MenuDay[]>([{ number: 1, dishes: [] }]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<MenuDTO>();

    const { updateMenu, getMenuById, getTypesmenu } = useMenu();
    const { getDishTypes, getDishsPagination } = useAdminDish();
    const language = useAppSelector((state) => state.app.language);
    const router = useRouter();

    const {
        data: menu,
        isPending: menuIsPending,
        isError: menuIsError,
    } = useQuery({
        queryKey: ['menu_by_id', id],
        queryFn: () => getMenuById(String(id)),
        enabled: !!id,
    });

    const { adminName, calories, cycleStartDate, description, isPublished, name, order, days: menuDays } = menu || {};

    const { data, isPending, isError } = useQuery({
        queryKey: ['typesmenu'],
        queryFn: getTypesmenu,
    });

    const { data: dishTypes } = useQuery({
        queryKey: ['dish_types'],
        queryFn: getDishTypes,
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

        const menuData = { ...data, cycleStartDate: cycleDate?.toDate(), days: daysWithoutNulls, isPublished: publish };

        updateMenu(String(id), menuData, () => router.replace(`/${language}/admin/menu`));
    };

    const addDay = () => {
        if (days.length >= 50) return;

        setDays((prev) => [...prev, { number: prev.length + 1, dishes: [] }]);
    };

    const removeDay = (index: number) => {
        if (days.length <= 1) return;

        setDays((prev) => prev.filter((_, i) => i !== index));
    };

    const addDish = (dayIndex: number, dishTypeId: number, dishId: number, isPrimary: boolean) => {
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
    };

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

    const removeDish = (dayIndex: number, dishId: number) => {
        setDays((prev) =>
            prev.map((day, index) =>
                index === dayIndex
                    ? {
                          ...day,
                          dishes: day.dishes.filter((d) => d.dishId !== String(dishId)),
                      }
                    : day,
            ),
        );
    };

    React.useEffect(() => {
        if (cycleStartDate) {
            setCycleDate(dayjs(cycleStartDate));
        }
    }, [cycleStartDate]);

    React.useEffect(() => {
        setPublish(!!isPublished);
    }, [isPublished]);

    React.useEffect(() => {
        if (menuDays && !!menuDays.length) {
            const formatted = menuDays.map((item) => ({
                number: item.number,
                dishes: item.dishes.map((dish) => ({
                    dishTypeId: dish.dishType.id.toString(),
                    dishId: dish.dish.id.toString(),
                    isPrimary: dish.isPrimary,
                })),
            }));

            setDays(formatted);
        }
    }, [menuDays]);

    if (menuIsPending) {
        return <Preloader page />;
    }

    if (menuIsError) {
        return <NotContent />;
    }

    return (
        <div className={styles.adminTeam}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.createMenuForm}>
                <div className={styles.menuFormFull}>
                    <Text>Редактирование меню</Text>
                </div>

                <div className={styles.menuFormFull}>
                    <Checkbox id="create_menu_publish" label="Опубликовать" value={publish} setValue={setPublish} />
                </div>

                <div className={styles.menuFormItem}>
                    {isPending ? (
                        <Preloader small page />
                    ) : isError ? (
                        <NotContent text="Произошла ошибка при загрузке типов меню" />
                    ) : !!data && !!data.length ? (
                        <Select
                            {...register('menuTypeId')}
                            options={data?.map((elem) => ({
                                id: elem.id,
                                name: elem.name[language],
                            }))}
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
                        value={watch('adminName', adminName)}
                    />
                </div>

                <div className={styles.menuFormItem}>
                    <Input
                        {...register('nameRu')}
                        error={!!errors.nameRu}
                        errorMessage={errors.nameRu?.message}
                        full
                        title={'Название ru'}
                        value={watch('nameRu', name?.ru)}
                    />
                </div>

                <div className={styles.menuFormItem}>
                    <Input
                        {...register('nameHe')}
                        error={!!errors.nameHe}
                        errorMessage={errors.nameHe?.message}
                        full
                        title={'Название he'}
                        value={watch('nameHe', name?.he)}
                    />
                </div>

                <div className={styles.menuFormItem}>
                    <Input
                        {...register('descriptionRu')}
                        error={!!errors.descriptionRu}
                        errorMessage={errors.descriptionRu?.message}
                        full
                        title={'Описание ru'}
                        value={watch('descriptionRu', description?.ru)}
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
                        value={watch('descriptionHe', description?.he)}
                        component="textarea"
                    />
                </div>

                <div className={styles.menuFormItem}>
                    <Input
                        {...register('calories')}
                        error={!!errors.calories}
                        errorMessage={errors.calories?.message}
                        full
                        title={'Калории'}
                        value={watch('calories', String(calories))}
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
                        value={watch('order', String(order))}
                        type="number"
                    />
                </div>

                <div className={styles.menuFormItem}>
                    <div className={styles.datePickerWrapper}>
                        <Text variant="text3">Выберите дату начала цикла</Text>

                        <DatePicker
                            className={styles.datePicker}
                            format="DD.MM.YYYY"
                            value={cycleDate}
                            onChange={setCycleDate}
                        />
                    </div>
                </div>

                <div className={styles.menuFormDays}>
                    <Text variant="text2">Всего дней: 1</Text>

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

                <Button full>Сохранить</Button>
            </form>
        </div>
    );
};

export default AdminMenuEdit;
