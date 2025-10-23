'use client';

import React from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import cn from 'classnames';
import { DatePicker } from 'antd';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';

import useAlert from '@/shared/hooks/useAlert';
import type { Social } from '@/entities/settings';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { useOrder } from '@/features/order';
import { useFiles } from '@/features/files';
import { useAdminSettings } from '@/features/admin';
import { useUserInfo } from '@/features/user';
import { Delete } from '@/shared/icons';

import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { Input } from '@/shared/ui/Input';
import { FileUpload } from '@/shared/ui/FileUpload';

const { RangePicker } = DatePicker;

const weekDays = [
    {
        name: 'Пн',
        number: 1,
    },
    {
        name: 'Вт',
        number: 2,
    },
    {
        name: 'Ср',
        number: 3,
    },
    {
        name: 'Чт',
        number: 4,
    },
    {
        name: 'Пт',
        number: 5,
    },
    {
        name: 'Сб',
        number: 6,
    },
    {
        name: 'Вс',
        number: 7,
    },
];

const AdminPanel = () => {
    const [routeStartDate, setRouteStartDate] = React.useState('');
    const [routeEndDate, setRouteEndDate] = React.useState('');

    const [dishStartDate, setDishStartDate] = React.useState('');
    const [dishEndDate, setDishEndDate] = React.useState('');

    const [dishListDate, setDishListDate] = React.useState('');

    const [weekDaysPicker, setWeekDaysPicker] = React.useState<number[]>([]);

    // Контактная информация
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [socials, setSocials] = React.useState<Social[]>([]);

    const router = useRouter();
    const { createOrderRoute, createOrderDish } = useOrder();
    const { alertNotify } = useAlert();
    const { uploadMap } = useFiles();
    const language = useAppSelector((state) => state.app.language);
    const { getShortInfo } = useUserInfo();
    const { getSettings, updateWeekDays, updateContacts } = useAdminSettings();

    const { data } = useQuery({
        queryKey: ['user_info'],
        queryFn: getShortInfo,
    });

    const {
        data: settings,
        isPending: settingsIsPending,
        isError: settingsIsError,
    } = useQuery({
        queryKey: ['settings'],
        queryFn: () => getSettings(),
        gcTime: 0,
        refetchOnMount: true,
    });

    const { roles } = data || {};
    const { email: contactEmail, phoneNumber, socials: contactSocials, deliveryWeekdays } = settings || {};

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

    const changeWeekDay = (weekNumber: number) => {
        if (!weekNumber) return;

        if (weekDaysPicker.includes(weekNumber)) {
            setWeekDaysPicker((prev) => prev.filter((num) => num !== weekNumber));
        } else {
            setWeekDaysPicker((prev) => [...prev, weekNumber]);
        }
    };

    const saveContacts = () => {
        updateContacts(
            phone,
            email,
            socials.map((elem) => ({
                name: elem.name,
                link: elem.link,
                icon: elem.icon,
            })),
        );
    };

    const addSocial = () => {
        setSocials((prev) => [
            ...prev,
            {
                id: Date.now(),
                name: '',
                link: '',
                icon: '',
            },
        ]);
    };

    const handleChange = <K extends keyof Social>(id: number, field: K, value: Social[K]) => {
        setSocials((prev) => prev.map((social) => (social.id === id ? { ...social, [field]: value } : social)));
    };

    const saveWeekDays = () => {
        updateWeekDays(weekDaysPicker);
    };

    React.useEffect(() => {
        if (deliveryWeekdays) {
            setWeekDaysPicker(deliveryWeekdays);
        }
    }, [deliveryWeekdays]);

    React.useEffect(() => {
        if (contactEmail) {
            setEmail(contactEmail);
        }
    }, [contactEmail]);

    React.useEffect(() => {
        if (phoneNumber) {
            setPhone(phoneNumber);
        }
    }, [phoneNumber]);

    React.useEffect(() => {
        if (socials) {
            setSocials(socials);
        }
    }, [socials]);

    React.useEffect(() => {
        if (contactSocials) {
            setSocials(contactSocials);
        }
    }, [contactSocials]);

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

                {roles?.includes('ADMIN') &&
                    (settingsIsPending ? (
                        <Preloader page small />
                    ) : settingsIsError ? (
                        <NotContent text="Произошла ошибка при получении даты" />
                    ) : (
                        <div className={styles.adminWrp}>
                            <Text variant="text2">Дни недели доставок:</Text>

                            <div className={styles.adminWeekDays}>
                                {weekDays.map((data, id) => (
                                    <button
                                        key={id}
                                        className={cn(styles.adminWeekDay, {
                                            [styles.active]: weekDaysPicker?.includes(data.number),
                                        })}
                                        onClick={() => changeWeekDay(data.number)}
                                    >
                                        {data.name}
                                    </button>
                                ))}
                            </div>

                            <Button small onClick={saveWeekDays}>
                                Сохранить
                            </Button>
                        </div>
                    ))}

                {roles?.includes('ADMIN') && (
                    <div className={styles.contactBlock}>
                        <Input full value={phone} setValue={setPhone} placeholder="Номер телефона" />
                        <Input full value={email} setValue={setEmail} placeholder="Email" />

                        <div className={styles.contactSocials}>
                            <Text variant="text3">Социальные сети ({socials.length})</Text>

                            {socials.map((data) => (
                                <div key={data.id} className={styles.contactSocialItem}>
                                    <FileUpload
                                        accept="image/png,image/jpeg,image/webp,image/svg+xml"
                                        id={`social_${data.id}`}
                                        filePath={data.icon}
                                        setFilePath={(value: string) => handleChange(data.id, 'icon', value)}
                                        isAdmin
                                    />

                                    <Input
                                        full
                                        value={data.link}
                                        placeholder="Ссылка"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleChange(data.id, 'link', e.target.value)
                                        }
                                    />

                                    <Input
                                        full
                                        value={data.name}
                                        placeholder="Название"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleChange(data.id, 'name', e.target.value)
                                        }
                                    />

                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => setSocials((prev) => prev.filter((elem) => data.id !== elem.id))}
                                    >
                                        <Delete />
                                    </button>
                                </div>
                            ))}

                            <Button full color="green" small onClick={addSocial}>
                                Добавить соц. сеть
                            </Button>
                        </div>

                        <Button small full onClick={saveContacts}>
                            Сохранить
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
