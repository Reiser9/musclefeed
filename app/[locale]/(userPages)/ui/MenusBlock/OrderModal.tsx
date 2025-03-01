'use client';

import React from 'react';
import cn from 'classnames';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';

import type { MenuType, MenuUser, PriceItem } from '@/entities/menu';
import type { OrderDTO } from '@/entities/order';
import type { UserAddress } from '@/entities/user/info';
import { ArrowLeft, ArrowRight, Chat, Foods, Home2, Mail, Map, Phone, User } from '@/shared/icons';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { useOrder } from '@/features/order';
import { useUserInfo } from '@/features/user';
import { getDayDeclension } from '@/shared/utils/getDayDeclension';
import { getScheduleLabel } from '@/shared/utils/getSheduleLabel';
import { useCities } from '@/features/city';

import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';
import { Preloader } from '@/shared/ui/Preloader';
import { Input } from '@/shared/ui/Input';
import { Select } from '@/shared/ui/Select';

type Props = {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    currentMenuType: MenuType | null;
    currentMenu: MenuUser | null;
    activePrice: PriceItem;
    disabledDays: number[];
    dateDelivery: string;
    resetOrder: () => void;
};

const OrderModal: React.FC<Props> = ({
    value,
    setValue,
    currentMenuType,
    currentMenu,
    activePrice,
    disabledDays,
    dateDelivery,
    resetOrder = () => {},
}) => {
    const [step, setStep] = React.useState(1);
    const t = useTranslations('Profile');

    // Заполнение адреса для неавторизованного
    const [city, setCity] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [house, setHouse] = React.useState('');
    const [floor, setFloor] = React.useState('');
    const [apartment, setApartment] = React.useState('');

    const [userAllergies, setUserAllergies] = React.useState('');

    // Первый шаг
    const [hasAllergi, setHasAllergi] = React.useState(false);
    const [paymentMethodId, setPaymentMethodId] = React.useState<number | null>(null);

    // Второй шаг
    const [allAddresses, setAllAddresses] = React.useState<UserAddress[]>([]);
    const [currentAddress, setCurrentAddress] = React.useState('');
    const [comment, setComment] = React.useState('');
    const [fullName, setFullName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');

    const language = useAppSelector((state) => state.app.language);
    const isAuth = useAppSelector((state) => state.app.isAuth);

    const { getPaymentMethods, createOrder } = useOrder();
    const { getShortInfo, getUserAddresses } = useUserInfo();
    const { getCities } = useCities();

    const {
        data: payments,
        isPending: paymentsIsPending,
        isError: paymentsIsError,
    } = useQuery({
        queryKey: ['payment_methods'],
        queryFn: getPaymentMethods,
    });

    const { data: user } = useQuery({
        queryKey: ['user_info'],
        queryFn: getShortInfo,
    });

    const {
        data: cities,
        isPending: citiesIsPending,
        isError: citiesIsError,
    } = useQuery({
        queryKey: ['cities'],
        queryFn: getCities,
    });

    const {
        data: addresses,
        isPending: addressesIsPending,
        isError: addressesIsError,
    } = useQuery({
        queryKey: ['user_addresses'],
        queryFn: getUserAddresses,
        enabled: !!isAuth,
    });

    const { addresses: userAddresses } = addresses || {};

    const { allergies, firstName, lastName, email: userEmail, phone: userPhone } = user || {};

    const createOrderHandler = () => {
        if (!paymentMethodId || !dateDelivery || !currentMenu) return;

        let address;

        if (isAuth) {
            const choosedAddressIndex = allAddresses.findIndex((el) => String(el.id) == currentAddress);
            const choosedAddress = allAddresses[choosedAddressIndex];

            address = {
                cityId: `${choosedAddress.city.id}`,
                street: choosedAddress.street,
                house: choosedAddress.house,
                floor: choosedAddress.floor,
                apartment: choosedAddress.apartment,
            };
        } else {
            address = {
                cityId: `${city}`,
                street: street,
                house: house,
                floor: floor,
                apartment: apartment,
            };
        }

        const data: OrderDTO = {
            fullName,
            email,
            phone,
            comment,
            allergies: isAuth ? allergies ?? '' : userAllergies ?? '',
            paymentMethodId: `${paymentMethodId}`,
            startDate: dateDelivery,
            daysCount: `${activePrice.daysCount}`,
            menuId: `${currentMenu.id}`,
            skippedWeekdays: disabledDays,
            ...address,
        };

        createOrder(data, () => {
            setStep(1);
            setValue(false);
            resetOrder();
        });
    };

    React.useEffect(() => {
        if (payments && !!payments.length) {
            setPaymentMethodId(payments[0].id);
        }
    }, [payments]);

    React.useEffect(() => {
        if (!!allergies) {
            setHasAllergi(true);
        }
    }, [allergies]);

    React.useEffect(() => {
        let allAddressesArr: UserAddress[] = [];

        if (userAddresses && !!userAddresses.length) {
            allAddressesArr = [...allAddressesArr, ...userAddresses];
        }

        setAllAddresses(allAddressesArr);
        if (!!allAddressesArr.length) {
            setCurrentAddress(`${allAddressesArr[0].id}`);
        }
    }, [userAddresses]);

    React.useEffect(() => {
        if (firstName || lastName) {
            setFullName(`${firstName} ${lastName}`);
        }
    }, [firstName, lastName]);

    React.useEffect(() => {
        if (userEmail) {
            setEmail(userEmail);
        }
    }, [userEmail]);

    React.useEffect(() => {
        if (userPhone) {
            setPhone(userPhone);
        }
    }, [userPhone]);

    return (
        <Modal value={value} setValue={setValue} size="big">
            <>
                <div className={styles.calcWrp}>
                    {step === 2 && (
                        <button className={styles.modalBack} onClick={() => setStep(1)}>
                            <ArrowLeft />
                        </button>
                    )}

                    <Text variant="h3" upper>
                        Ваш заказ
                    </Text>
                </div>

                <p className={styles.calcText}>
                    Тут можно посмотреть опции заказа и оплатить его, с вами свяжется наш оператор для уточнения деталей
                    заказа
                </p>

                <div className={styles.orderItems}>
                    <div className={styles.orderItem}>
                        <p className={styles.orderItemName}>Рацион</p>

                        <p className={styles.orderItemTitle}>{currentMenuType?.name[language]}</p>
                    </div>

                    <div className={styles.orderItem}>
                        <p className={styles.orderItemName}>Программа</p>

                        <p className={styles.orderItemTitle}>{currentMenu?.name[language]}</p>
                    </div>

                    <div className={styles.orderItem}>
                        <p className={styles.orderItemName}>Длительность</p>

                        <p className={styles.orderItemTitle}>{getDayDeclension(activePrice?.daysCount)}</p>

                        {/* <p className={styles.orderItemSubtext}>123</p> */}
                    </div>

                    <div className={styles.orderItem}>
                        <p className={styles.orderItemName}>Доставка</p>

                        <p className={styles.orderItemTitle}>
                            Начало доставки:{' '}
                            <span className={styles.orderDilivery}>{dayjs(dateDelivery).format('DD.MM.YYYY')}</span>
                        </p>
                    </div>

                    <div className={styles.orderItem}>
                        <p className={styles.orderItemName}>Формат питания</p>

                        <p className={styles.orderItemTitle}>{getScheduleLabel(disabledDays)}</p>
                    </div>
                </div>

                <div className={styles.orderAllergy}>
                    <div
                        className={styles.orderAllergyBlock}
                        onClick={() => step === 1 && setHasAllergi((prev) => !prev)}
                    >
                        <p className={styles.orderItemTitle}>У вас есть аллергии:</p>

                        <p className={styles.orderAllergyText}>
                            С вами свяжется наш специалист и уточнит возможные замены продуктов
                        </p>
                    </div>

                    <div
                        className={cn(styles.orderAllergySwitch, {
                            [styles.active]: hasAllergi,
                        })}
                        id="allergy_switch"
                        onClick={() => step === 1 && setHasAllergi((prev) => !prev)}
                    >
                        <div className={styles.orderAllergySwitchCircle}></div>
                    </div>
                </div>

                <div className={styles.orderBlock}>
                    {step === 1 && (
                        <>
                            <div className={styles.foodFormItem}>
                                <div className={styles.foodFormItemName}>
                                    <p className={styles.foodFormItemNameText}>Способы оплаты:</p>
                                </div>

                                <div className={cn(styles.foodFormItemContent, styles.one)}>
                                    {paymentsIsPending ? (
                                        <Preloader small page offIndent />
                                    ) : paymentsIsError ? (
                                        <NotContent />
                                    ) : (
                                        !!payments &&
                                        payments.map((pay) => (
                                            <button
                                                key={pay.id}
                                                className={cn(styles.foodFormChoose, {
                                                    [styles.active]: paymentMethodId === pay.id,
                                                })}
                                                onClick={() => setPaymentMethodId(pay.id)}
                                            >
                                                {pay.name[language]}
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* <div className={styles.orderPromo}>
                                <div className={styles.orderPromoTitleInner}>
                                    <p className={styles.foodFormItemNameText}>У вас есть промокод:</p>

                                    <p className={styles.promoSubtitle}>
                                        Скидка по промокоду не суммируется с другими скидками
                                    </p>
                                </div>

                                <div className={styles.orderPromoWrap}>
                                    <Input icon={<Gift />} placeholder="Введите промокод" />
                                </div>
                            </div> */}
                        </>
                    )}

                    {step === 2 && (
                        <div className={styles.orderInputsAllergi}>
                            {isAuth ? (
                                addressesIsPending ? (
                                    <Preloader offIndent page small />
                                ) : addressesIsError ? (
                                    <NotContent />
                                ) : !!allAddresses.length ? (
                                    <Select
                                        value={currentAddress}
                                        setValue={setCurrentAddress}
                                        options={allAddresses.map((address) => ({
                                            id: address.id,
                                            name: `${address.city.name[language]}, ${address.street}, ${address.house}, ${address.floor}, ${address.apartment}`,
                                        }))}
                                        title="Выберите адрес"
                                        full
                                        icon={<Home2 />}
                                    />
                                ) : (
                                    <Button href={`/${language}/account/profile`} full>
                                        У вас не создан адрес, создайте его
                                    </Button>
                                )
                            ) : (
                                <>
                                    <div className={styles.orderInputsAllergiItemFull}>
                                        {citiesIsPending ? (
                                            <Preloader page small offIndent />
                                        ) : citiesIsError ? (
                                            <NotContent />
                                        ) : (
                                            <Select
                                                title={t('city')}
                                                icon={<Map />}
                                                value={city}
                                                setValue={setCity}
                                                options={
                                                    !!cities
                                                        ? cities?.map((city) => ({
                                                              id: city.id,
                                                              name: city.name[language],
                                                          }))
                                                        : []
                                                }
                                            />
                                        )}
                                    </div>

                                    <div className={styles.orderInputsAllergiItem}>
                                        <Input
                                            value={street}
                                            setValue={setStreet}
                                            title={t('street')}
                                            icon={<Map />}
                                            placeholder="Выберите или начните вводить"
                                        />
                                    </div>

                                    <div className={styles.orderInputsAllergiItem}>
                                        <Input
                                            value={house}
                                            setValue={setHouse}
                                            title={t('home')}
                                            icon={<Home2 />}
                                            placeholder={t('home')}
                                        />
                                    </div>

                                    <div className={styles.orderInputsAllergiItem}>
                                        <Input
                                            value={floor}
                                            setValue={setFloor}
                                            title={t('floor')}
                                            icon={<Map />}
                                            placeholder={t('floor')}
                                        />
                                    </div>

                                    <div className={styles.orderInputsAllergiItem}>
                                        <Input
                                            value={apartment}
                                            setValue={setApartment}
                                            title={t('apartment')}
                                            icon={<Map />}
                                            placeholder={t('apartment')}
                                        />
                                    </div>
                                </>
                            )}

                            <div className={styles.orderInputsAllergiItem}>
                                <Input
                                    value={fullName}
                                    setValue={setFullName}
                                    icon={<User />}
                                    full
                                    title="Имя и фамилия"
                                />
                            </div>

                            <div className={styles.orderInputsAllergiItem}>
                                <Input
                                    value={phone}
                                    setValue={setPhone}
                                    icon={<Phone />}
                                    full
                                    title="Ваш номер телефона"
                                />
                            </div>

                            {hasAllergi && !isAuth && (
                                <Input
                                    value={userAllergies}
                                    setValue={setUserAllergies}
                                    icon={<Foods />}
                                    full
                                    title="Аллергии"
                                />
                            )}

                            <Input
                                value={email}
                                setValue={setEmail}
                                icon={<Mail />}
                                full
                                title="Ваша почта"
                                disabled={isAuth}
                            />

                            <Input
                                value={comment}
                                setValue={setComment}
                                icon={<Chat />}
                                full
                                title="Ваши комментарии к заказу"
                                component="textarea"
                            />
                        </div>
                    )}
                </div>

                <div className={styles.calcResult}>
                    <div className={styles.orderTextInner}>
                        <p className={styles.calcResultCount}>
                            Итого: <span className={styles.cartPriceValue}>{activePrice?.price}</span> ₪
                        </p>

                        {/* <div className={styles.orderTextSale}>Скидка 25% за длительность заказа</div> */}
                    </div>

                    {step === 1 && (
                        <Button color="green" onClick={() => setStep(2)}>
                            Далее
                            <ArrowRight />
                        </Button>
                    )}

                    {step === 2 && (
                        <Button color="green" onClick={createOrderHandler}>
                            Оформить заказ
                            <ArrowRight />
                        </Button>
                    )}
                </div>
            </>
        </Modal>
    );
};

export default OrderModal;
