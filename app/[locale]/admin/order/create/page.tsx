'use client';

import React from 'react';
import cn from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from 'antd';

import styles from '../index.module.scss';

import type { OrderAdminDTO } from '@/entities/order';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Foods, Home } from '@/shared/icons';
import { useCities } from '@/features/city';
import { useMenu } from '@/features/menu';
import { useOrder } from '@/features/order';

import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Select } from '@/shared/ui/Select';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';

const disabledDate = (current: Dayjs) => {
    if (!current) return false;

    const today = dayjs().startOf('day');

    return current.isBefore(today, 'day');
};

const AdminOrderCreate = () => {
    const [userId, setUserId] = React.useState('');
    const [activeMenuId, setActiveMenuId] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [skippedDays, setSkippedDays] = React.useState<number[]>([]);

    const handleSkipDay = (day: number) => {
        setSkippedDays((prev) => (prev.includes(day) ? prev.filter((n) => n !== day) : [...prev, day]));
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<OrderAdminDTO>();

    const { createAdminOrder, getPaymentMethods } = useOrder();
    const { getMenus } = useMenu();
    const { getCities } = useCities();
    const language = useAppSelector((state) => state.app.language);
    const router = useRouter();

    const {
        data: menus,
        isPending: menusIsPending,
        isError: menusIsError,
    } = useQuery({
        queryKey: ['menus'],
        queryFn: () => getMenus(1, 1000, ''),
    });

    const {
        data: payments,
        isPending: paymentsIsPending,
        isError: paymentsIsError,
    } = useQuery({
        queryKey: ['payment_methods'],
        queryFn: getPaymentMethods,
    });

    const {
        data: cities,
        isPending: citiesIsPending,
        isError: citiesIsError,
    } = useQuery({
        queryKey: ['cities'],
        queryFn: getCities,
    });

    const onSubmit: SubmitHandler<OrderAdminDTO> = (data) => {
        if (!startDate) return;

        const orderData = {
            ...data,
            skippedWeekdays: skippedDays,
            startDate,
            menuId: activeMenuId,
            ...(userId && { userId }),
        };

        createAdminOrder(orderData, () => router.replace(`/${language}/admin`));
    };

    return (
        <div className={styles.adminDish}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.createForm}>
                <Text>Создание заказа</Text>

                <Checkbox id="is_processed" label="Обработан" {...register('isProcessed')} />
                <Checkbox id="is_allowed_extendion" label="Разрешено продление" {...register('isAllowedExtendion')} />
                <Checkbox id="is_paid" label="Оплачен" {...register('isPaid')} />

                <Input
                    value={userId}
                    setValue={setUserId}
                    full
                    title={'ID пользователя (необязательно)'}
                    type="number"
                />

                <div className={styles.skippedButtonsWrap}>
                    <Text variant='text3'>Дата начала заказа</Text>
                    
                    <DatePicker
                        value={startDate ? dayjs(startDate) : null}
                        onChange={(date) => setStartDate(date.format('YYYY-MM-DD'))}
                        className={styles.orderDate}
                        format="DD.MM.YYYY"
                        disabledDate={disabledDate}
                    />
                </div>

                <div className={styles.skippedButtonsWrap}>
                    <Text variant="text3">Пропускаемые дни</Text>

                    <div className={styles.skippedButtons}>
                        <span
                            className={cn(styles.skippedButton, {
                                [styles.active]: skippedDays.includes(1),
                            })}
                            onClick={() => handleSkipDay(1)}
                        >
                            Пн
                        </span>
                        <span
                            className={cn(styles.skippedButton, {
                                [styles.active]: skippedDays.includes(2),
                            })}
                            onClick={() => handleSkipDay(2)}
                        >
                            Вт
                        </span>
                        <span
                            className={cn(styles.skippedButton, {
                                [styles.active]: skippedDays.includes(3),
                            })}
                            onClick={() => handleSkipDay(3)}
                        >
                            Ср
                        </span>
                        <span
                            className={cn(styles.skippedButton, {
                                [styles.active]: skippedDays.includes(4),
                            })}
                            onClick={() => handleSkipDay(4)}
                        >
                            Чт
                        </span>
                        <span
                            className={cn(styles.skippedButton, {
                                [styles.active]: skippedDays.includes(5),
                            })}
                            onClick={() => handleSkipDay(5)}
                        >
                            Пт
                        </span>
                        <span
                            className={cn(styles.skippedButton, {
                                [styles.active]: skippedDays.includes(6),
                            })}
                            onClick={() => handleSkipDay(6)}
                        >
                            Сб
                        </span>
                        <span
                            className={cn(styles.skippedButton, {
                                [styles.active]: skippedDays.includes(7),
                            })}
                            onClick={() => handleSkipDay(7)}
                        >
                            Вс
                        </span>
                    </div>
                </div>

                {menusIsPending ? (
                    <Preloader small page />
                ) : menusIsError ? (
                    <NotContent text="Произошла ошибка при загрузке меню" />
                ) : !!menus && !!menus.menus.length ? (
                    <Select
                        value={activeMenuId}
                        setValue={setActiveMenuId}
                        options={menus?.menus.map((elem) => ({
                            id: elem.id,
                            name: elem.name[language],
                        }))}
                        title="Меню"
                        icon={<Foods />}
                        full
                    ></Select>
                ) : (
                    <NotContent text="Для начала создайте меню" />
                )}

                <Input
                    {...register('daysCount')}
                    error={!!errors.daysCount}
                    errorMessage={errors.daysCount?.message}
                    full
                    title={'Количество дней'}
                    value={watch('daysCount', '')}
                />

                <Input
                    {...register('fullName')}
                    error={!!errors.fullName}
                    errorMessage={errors.fullName?.message}
                    full
                    title={'Имя и фамилия'}
                    value={watch('fullName', '')}
                />

                <Input
                    {...register('email')}
                    error={!!errors.email}
                    errorMessage={errors.email?.message}
                    full
                    title={'Email'}
                    value={watch('email', '')}
                />

                <Input
                    {...register('phone')}
                    error={!!errors.phone}
                    errorMessage={errors.phone?.message}
                    full
                    title={'Номер телефона'}
                    value={watch('phone', '')}
                />

                <Input
                    {...register('allergies')}
                    error={!!errors.allergies}
                    errorMessage={errors.allergies?.message}
                    full
                    title={'Аллергии'}
                    value={watch('allergies', '')}
                />

                {citiesIsPending ? (
                    <Preloader small page />
                ) : citiesIsError ? (
                    <NotContent text="Произошла ошибка при загрузке меню" />
                ) : !!cities && !!cities.length ? (
                    <Select
                        {...register('cityId')}
                        options={cities.map((elem) => ({
                            id: elem.id,
                            name: elem.name[language],
                        }))}
                        title="Город"
                        icon={<Home />}
                        full
                    ></Select>
                ) : (
                    <NotContent text="Для начала создайте меню" />
                )}

                <Input
                    {...register('street')}
                    error={!!errors.street}
                    errorMessage={errors.street?.message}
                    full
                    title={'Улица'}
                    value={watch('street', '')}
                />

                <Input
                    {...register('house')}
                    error={!!errors.house}
                    errorMessage={errors.house?.message}
                    full
                    title={'Дом'}
                    value={watch('house', '')}
                />

                <Input
                    {...register('floor')}
                    error={!!errors.floor}
                    errorMessage={errors.floor?.message}
                    full
                    title={'Этаж'}
                    value={watch('floor', '')}
                />

                <Input
                    {...register('apartment')}
                    error={!!errors.apartment}
                    errorMessage={errors.apartment?.message}
                    full
                    title={'Квартира'}
                    value={watch('apartment', '')}
                />

                <Input
                    {...register('comment')}
                    error={!!errors.comment}
                    errorMessage={errors.comment?.message}
                    full
                    title={'Комментарий'}
                    value={watch('comment', '')}
                    component="textarea"
                />

                {paymentsIsPending ? (
                    <Preloader small page />
                ) : paymentsIsError ? (
                    <NotContent text="Произошла ошибка при загрузке меню" />
                ) : !!payments && !!payments.length ? (
                    <Select
                        {...register('paymentMethodId')}
                        options={payments.map((elem) => ({
                            id: elem.id,
                            name: elem.name[language],
                        }))}
                        title="Способ оплаты"
                        icon={<Home />}
                        full
                    ></Select>
                ) : (
                    <NotContent text="Для начала создайте меню" />
                )}

                <Input
                    {...register('price')}
                    error={!!errors.price}
                    errorMessage={errors.price?.message}
                    full
                    title={'Цена'}
                    value={watch('price', '0')}
                    type="number"
                />

                <Input
                    {...register('paidAmount')}
                    error={!!errors.paidAmount}
                    errorMessage={errors.paidAmount?.message}
                    full
                    title={'Сколько уже заплатил'}
                    value={watch('paidAmount', '0')}
                    type="number"
                />

                <Input
                    {...register('promocodeDiscount')}
                    error={!!errors.promocodeDiscount}
                    errorMessage={errors.promocodeDiscount?.message}
                    full
                    title={'Скидка по промокоду'}
                    value={watch('promocodeDiscount', '0')}
                    type="number"
                />

                <Input
                    {...register('finalPrice')}
                    error={!!errors.finalPrice}
                    errorMessage={errors.finalPrice?.message}
                    full
                    title={'Конечная цена'}
                    value={watch('finalPrice', '0')}
                    type="number"
                />

                <Button full>Создать</Button>
            </form>
        </div>
    );
};

export default AdminOrderCreate;
