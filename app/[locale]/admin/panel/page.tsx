'use client';

import React from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { useOrder } from '@/features/order';
import { useFiles } from '@/features/files';
import useAlert from '@/shared/hooks/useAlert';

import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { useUserInfo } from '@/features/user';

const { RangePicker } = DatePicker;

const AdminPanel = () => {
    const [routeStartDate, setRouteStartDate] = React.useState('');
    const [routeEndDate, setRouteEndDate] = React.useState('');

    const [dishStartDate, setDishStartDate] = React.useState('');
    const [dishEndDate, setDishEndDate] = React.useState('');

    const [dishListDate, setDishListDate] = React.useState('');

    const router = useRouter();
    const { createOrderRoute, createOrderDish } = useOrder();
    const { alertNotify } = useAlert();
    const { uploadMap } = useFiles();
    const language = useAppSelector((state) => state.app.language);
    const { getShortInfo } = useUserInfo();

    const { data } = useQuery({
        queryKey: ['user_info'],
        queryFn: getShortInfo,
    });

    const { roles } = data || {};

    const handleRouteList = () => {
        if (!routeStartDate || !routeEndDate) return;

        createOrderRoute(routeStartDate, routeEndDate);
    };

    const handleCreateOrderDish = () => {
        if (!dishStartDate || !dishEndDate) return;

        createOrderDish(dishStartDate, dishEndDate);
    };

    const handleDishList = () => {
        if (!dishListDate) return;

        router.push(`/${language}/dish-list?date=${dishListDate}`);
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            await uploadMap(formData);
            alertNotify('Успешно', 'Карта изменена');
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            alert('Ошибка при загрузке файла');
        }
    };

    return (
        <div className={styles.adminTeam}>
            <div className={styles.adminTeamWrapper}>
                <div className={styles.adminWrp}>
                    <Text variant="text2">Маршрутный лист</Text>

                    <div className={styles.adminOrdersRoute}>
                        <RangePicker
                            className={styles.adminOrdersRoutePicker}
                            value={[
                                routeStartDate ? dayjs(routeStartDate) : null,
                                routeEndDate ? dayjs(routeEndDate) : null,
                            ]}
                            onChange={(dates) => {
                                if (!dates || !dates[0] || !dates[1]) {
                                    setRouteStartDate('');
                                    setRouteEndDate('');
                                    return;
                                }

                                setRouteStartDate(dates[0].format('YYYY-MM-DD'));
                                setRouteEndDate(dates[1].format('YYYY-MM-DD'));
                            }}
                        />

                        <Button disabled={!routeStartDate || !routeEndDate} onClick={handleRouteList}>
                            Сформировать
                        </Button>
                    </div>
                </div>

                <div className={styles.adminWrp}>
                    <Text variant="text2">Вкладыши</Text>

                    <div className={styles.adminOrdersRoute}>
                        <DatePicker
                            className={styles.adminOrdersRoutePicker}
                            value={dishListDate ? dayjs(dishListDate) : null}
                            onChange={(date) => setDishListDate(date.format('YYYY-MM-DD'))}
                        />

                        <Button disabled={!dishListDate} onClick={handleDishList}>
                            Печать
                        </Button>
                    </div>
                </div>

                <div className={styles.adminWrp}>
                    <Text variant="text2">Отчет по блюдам</Text>

                    <div className={styles.adminOrdersRoute}>
                        <RangePicker
                            className={styles.adminOrdersRoutePicker}
                            value={[
                                dishStartDate ? dayjs(dishStartDate) : null,
                                dishEndDate ? dayjs(dishEndDate) : null,
                            ]}
                            onChange={(dates) => {
                                if (!dates || !dates[0] || !dates[1]) {
                                    setDishStartDate('');
                                    setDishEndDate('');
                                    return;
                                }

                                setDishStartDate(dates[0].format('YYYY-MM-DD'));
                                setDishEndDate(dates[1].format('YYYY-MM-DD'));
                            }}
                        />

                        <Button disabled={!dishStartDate || !dishEndDate} onClick={handleCreateOrderDish}>
                            Сформировать
                        </Button>
                    </div>
                </div>

                {roles?.includes('ADMIN') && (
                    <div className={styles.adminWrp}>
                        <Text variant="text2">Карта на сайте</Text>

                        <div className={styles.adminMapImg}>
                            <Image src={`${process.env.NEXT_PUBLIC_BASE_MAP}static/map.png`} alt="Карта" fill />
                        </div>

                        <input type="file" accept="image/png,image/jpeg" onChange={handleFileChange} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
