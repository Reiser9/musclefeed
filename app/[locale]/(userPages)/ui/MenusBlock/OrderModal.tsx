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
import { ArrowLeft, ArrowRight, Chat, Check, Foods, Gift, Home2, Mail, Map, Phone, User } from '@/shared/icons';
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
import { usePromocode } from '@/features/promocode';

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
    const [promo, setPromo] = React.useState('');
    const [appliedPromo, setAppliedPromo] = React.useState<number | null>(null);
    const [finalPrice, setFinalPrice] = React.useState<number | null>(null);
    const t = useTranslations('Profile');
    const c = useTranslations('Cart');

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
    const { applyPromocode } = usePromocode();

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

        createOrder(data, appliedPromo, () => {
            setStep(1);
            setValue(false);
            resetOrder();
        });
    };

    const applyPromoHandler = async () => {
        if (!promo) return;

        const promoResult = await applyPromocode(promo, `${activePrice?.discountedPrice}`);

        if (promoResult) {
            setFinalPrice(promoResult.finalPrice);
            setAppliedPromo(promoResult.promocode?.id);
        } else {
            setFinalPrice(activePrice.discountedPrice);
            setAppliedPromo(null);
        }
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

    React.useEffect(() => {
        if (cities) {
            setCity(`${cities[0].id}`);
        }
    }, [cities]);

    React.useEffect(() => {
        if (activePrice.price) {
            setFinalPrice(activePrice.discountedPrice);
        }
    }, [activePrice.price]);

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
                        {c('title')}
                    </Text>
                </div>

                <p className={styles.calcText}>{c('text')}</p>

                <div className={styles.orderItems}>
                    <div className={styles.orderItem}>
                        <p className={styles.orderItemName}>{c('racion')}</p>

                        <p className={styles.orderItemTitle}>{currentMenuType?.name[language]}</p>
                    </div>

                    <div className={styles.orderItem}>
                        <p className={styles.orderItemName}>{c('program')}</p>

                        <p className={styles.orderItemTitle}>{currentMenu?.name[language]}</p>
                    </div>

                    <div className={styles.orderItem}>
                        <p className={styles.orderItemName}>{c('duration')}</p>

                        <p className={styles.orderItemTitle}>
                            {getDayDeclension(activePrice?.daysCount)}{' '}
                            {!!activePrice?.giftDaysCount && <span>+ {activePrice?.giftDaysCount} дня</span>}
                        </p>

                        {!!activePrice?.giftDaysCount && (
                            <p className={styles.orderItemSubtext}>{activePrice?.giftDaysCount} дня в подарок!</p>
                        )}
                    </div>

                    <div className={styles.orderItem}>
                        <p className={styles.orderItemName}>{c('delivery')}</p>

                        <p className={styles.orderItemTitle}>
                            {c('delivery_start')}{' '}
                            <span className={styles.orderDilivery}>{dayjs(dateDelivery).format('DD.MM.YYYY')}</span>
                        </p>
                    </div>

                    <div className={styles.orderItem}>
                        <p className={styles.orderItemName}>{c('format')}</p>

                        <p className={styles.orderItemTitle}>{getScheduleLabel(disabledDays, language)}</p>
                    </div>
                </div>

                <div className={styles.orderAllergy}>
                    <div
                        className={styles.orderAllergyBlock}
                        onClick={() => step === 1 && setHasAllergi((prev) => !prev)}
                    >
                        <p className={styles.orderItemTitle}>{c('allergi')}</p>

                        <p className={styles.orderAllergyText}>{c('allergi_text')}</p>
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
                                    <p className={styles.foodFormItemNameText}>{c('payments')}</p>
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

                            <div className={styles.orderPromo}>
                                <div className={styles.orderPromoTitleInner}>
                                    <p className={styles.foodFormItemNameText}>{c('promo')}</p>

                                    {!appliedPromo ? (
                                        <p className={styles.promoSubtitle}>{c('promo_text')}</p>
                                    ) : (
                                        <p className={cn(styles.promoSubtitle, styles.green)}>{c('promo_applied')}</p>
                                    )}
                                </div>

                                <div className={styles.orderPromoWrap}>
                                    <Input
                                        icon={<Gift />}
                                        placeholder={c('promo_placeholder')}
                                        value={promo}
                                        setValue={setPromo}
                                        className="inputWithIcon"
                                    />

                                    <button
                                        className={cn(styles.orderPromoApply, 'orderPromoApply')}
                                        onClick={applyPromoHandler}
                                    >
                                        <Check />
                                    </button>
                                </div>
                            </div>
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
                                        title={c('address')}
                                        full
                                        icon={<Home2 />}
                                    />
                                ) : (
                                    <Button href={`/${language}/account/profile`} full>
                                        {c('address_empty')}
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
                                            required
                                            setValue={setStreet}
                                            title={t('street')}
                                            icon={<Map />}
                                            placeholder={c('street')}
                                        />
                                    </div>

                                    <div className={styles.orderInputsAllergiItem}>
                                        <Input
                                            value={house}
                                            required
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
                                    required
                                    setValue={setFullName}
                                    icon={<User />}
                                    full
                                    title={c('fullname')}
                                />
                            </div>

                            <div className={styles.orderInputsAllergiItem}>
                                <Input value={phone} setValue={setPhone} icon={<Phone />} full title={c('phone')} />
                            </div>

                            {hasAllergi && !isAuth && (
                                <Input
                                    value={userAllergies}
                                    setValue={setUserAllergies}
                                    icon={<Foods />}
                                    full
                                    title={c('allergi_placeholder')}
                                />
                            )}

                            <Input
                                value={email}
                                required
                                setValue={setEmail}
                                icon={<Mail />}
                                full
                                title={c('email')}
                                disabled={isAuth}
                            />

                            <Input
                                value={comment}
                                setValue={setComment}
                                icon={<Chat />}
                                full
                                title={c('comment')}
                                component="textarea"
                            />
                        </div>
                    )}
                </div>

                <div className={styles.calcResult}>
                    <div className={styles.orderTextInner}>
                        <p className={styles.calcResultCount}>
                            {c('total')} <span className={styles.cartPriceValue}>{finalPrice}</span> ₪
                        </p>

                        {!!activePrice.discount && (
                            <div className={styles.orderTextSale}>{c('sale', { value: activePrice.discount })}</div>
                        )}
                    </div>

                    {step === 1 && (
                        <Button color="green" onClick={() => setStep(2)}>
                            {c('next')}
                            <ArrowRight />
                        </Button>
                    )}

                    {step === 2 && (
                        <Button color="green" onClick={createOrderHandler}>
                            {c('button')}
                            <ArrowRight />
                        </Button>
                    )}
                </div>
            </>
        </Modal>
    );
};

export default OrderModal;
