'use client';

import React from 'react';
import dayjs from 'dayjs';
import cn from 'classnames';
import { DatePicker } from 'antd';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';

import { Text } from '@/shared/ui/Text';
import { useOrder } from '@/features/order';

const { RangePicker } = DatePicker;

const AdminCalendar = () => {
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [dateRange, setDateRange] = React.useState<string[]>([]);

    const { getCalendar } = useOrder();

    const { data } = useQuery({
        queryKey: ['admin_calendar', startDate, endDate],
        queryFn: () => getCalendar(startDate, endDate),
        gcTime: 0,
        refetchOnMount: true,
        enabled: !!startDate && !!endDate,
    });

    React.useEffect(() => {
        const today = new Date();

        const todayFormatted = today.toISOString().slice(0, 10);

        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + 5);
        const futureDateFormatted = futureDate.toISOString().slice(0, 10);

        setStartDate(todayFormatted);
        setEndDate(futureDateFormatted);
    }, []);

    React.useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            const dates = [];
            const currentDate = new Date(start);

            while (currentDate <= end) {
                const day = String(currentDate.getDate()).padStart(2, '0');
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const year = currentDate.getFullYear();
                const formattedDate = `${day}.${month}.${year}`;
                dates.push(formattedDate);

                currentDate.setDate(currentDate.getDate() + 1);
            }

            setDateRange(dates);
        } else {
            setDateRange([]);
        }
    }, [startDate, endDate]);

    return (
        <div className={styles.adminTeam}>
            <div className={styles.adminTeamWrapper}>
                <div className={styles.adminWrp}>
                    <Text variant="text2">Календарь</Text>

                    <div className={styles.adminOrdersRoute}>
                        <RangePicker
                            className={styles.adminOrdersRoutePicker}
                            value={[startDate ? dayjs(startDate) : null, endDate ? dayjs(endDate) : null]}
                            onChange={(dates) => {
                                if (!dates || !dates[0] || !dates[1]) {
                                    setStartDate('');
                                    setEndDate('');
                                    return;
                                }

                                setStartDate(dates[0].format('YYYY-MM-DD'));
                                setEndDate(dates[1].format('YYYY-MM-DD'));
                            }}
                        />
                    </div>
                </div>

                <div className={styles.calendarBlock}>
                    <div className={styles.calendarTable}>
                        <div className={styles.calendarTableItem}>
                            <div className={styles.calendarTableCell}>№ заказа</div>

                            <div className={styles.calendarTableCell}>ФИО</div>

                            {dateRange.map((el, id) => (
                                <div key={id} className={styles.calendarTableCell}>
                                    {el}
                                </div>
                            ))}
                        </div>

                        {!!data &&
                            data.totalCount > 0 &&
                            data.orders.map((element) => (
                                <div key={element.id} className={styles.calendarTableItem}>
                                    <div className={styles.calendarTableCell}>{element.id}</div>

                                    <div className={styles.calendarTableCell}>{element.fullName}</div>

                                    {dateRange.map((el, id) => {
                                        const dataItem = element.orderDays.find((item) => {
                                            const [year, month, day] = el.split('.');
                                            const formattedDateRange = `${day}-${month}-${year}T00:00:00.000Z`;

                                            return item.date === formattedDateRange;
                                        });

                                        return (
                                            <div
                                                key={id}
                                                className={cn(styles.calendarTableCell, {
                                                    [styles.green]: !!dataItem && !dataItem.isSkipped,
                                                    [styles.red]: !!dataItem && dataItem.isSkipped,
                                                })}
                                            >
                                                {dataItem && (dataItem.isSkipped ? '-' : '+')}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCalendar;
