import { City } from '../city';
import { Dish, Pagination } from '../dish';
import { LanguageField } from '../language';
import { UserShortInfo } from '../user/auth';

export type PaymentMethod = {
    id: number;
    name: LanguageField;
};

export type OrderDTO = {
    menuId: string;
    startDate: string;
    daysCount: string;
    skippedWeekdays: number[];
    paymentMethodId: string;
    fullName: string;
    email: string;
    phone: string;
    allergies: string;
    cityId: string;
    street: string;
    house: string;
    floor: string;
    apartment: string;
    comment: string;
};

export type OrderAdminDTO = OrderDTO & {
    userId?: string;
    price: string;
    paidAmount: string;
    promocodeDiscount: string;
    finalPrice: string;
    isProcessed: boolean;
    isAllowedExtendion: boolean;
    isPaid: boolean;
    isCompleted: boolean;
    freezeStartDate: string;
    freezeEndDate: string;
};

export type OrderIndiDTO = {
    dishes: {
        id: number;
        count: number;
    }[];
    date: string;
    paymentMethodId: string | number;
    fullName: string;
    email: string;
    phone: string;
    allergies: string;
    cityId: string | number;
    street: string;
    house: string;
    floor: string;
    apartment: string;
    comment: string;
};

export type Order = {
    id: number;
    createdAt: Date;
    fullName: string;
    email: string;
    phone: string;
    allergies: string;
    finalPrice: number;
    menu: {
        id: number;
        name: LanguageField;
        description: LanguageField;
        calories: number;
        backgroundPicture?: string;
    };
    city: City;
    street: string;
    house: string;
    floor: number;
    apartment: number;
    comment: string;
    daysCount: number;
    daysLeft: number;
    startDate: Date;
    endDate: Date;
    skippedWeekdays: number[];
    paymentMethod: PaymentMethod;
    isPaid: boolean;
    isIndividual: boolean;
    count: number;
};

export type AdminOrder = {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    allergies: string;
    street: string;
    house: string;
    floor: number;
    apartment: number;
    comment: string;
    price: number;
    paidAmount: number;
    promocodeDiscount: number;
    finalPrice: number;
    isProcessed: boolean;
    isAllowedExtendion: boolean;
    isPaid: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: UserShortInfo;
    city: City;
    paymentMethod: PaymentMethod;
    menu: {
        id: number;
        name: LanguageField;
        description: LanguageField;
        calories: number;
    };
    daysCount: number;
    daysLeft: number;
    startDate: Date;
    endDate: Date;
    skippedWeekdays: number[];
    isCompleted: boolean;
    freezeStartDate: Date;
    freezeEndDate: Date;
    isIndividual: boolean;
};

export type OrderPagination = Pagination & {
    orders: Order[];
};

export type OrderDishList = {
    id: number;
    menu: {
        id: number;
        name: LanguageField;
        description: LanguageField;
        calories: number;
    };
    dishes: Dish[];
    total: {
        calories: number;
        proteins: number;
        fats: number;
        carbohydrates: number;
    };
};

export type Day = {
    id: number;
    date: Date;
    isSkipped: boolean;
    daySkipType: 'WEEKDAY_SKIPPED' | 'FROZEN';
};

export type OrderShort = {
    menuId: number;
    startDate: Date;
    daysCount: number;
    skippedWeekdays: number[];
    paymentMethodId: number;
    fullName: string;
    email: string;
    phone: string;
    allergies: string;
    cityId: number;
    street: string;
    house: string;
    floor: number;
    apartment: number;
    comment: string;
};

export type ORDER_CHANGE_TYPES = 'MENU' | 'CALORIES' | 'DURATION' | 'FORMAT' | 'FREEZE' | 'OTHER';

export type OrderRequest = {
    id: number;
    orderChangeType: ORDER_CHANGE_TYPES;
    comment: string;
    isProcessed: boolean;
    createdAt: Date;
    updateddAt: Date;
    order: OrderShort;
};

export type OrderRequestPagination = Pagination & {
    orderChangeRequests: OrderRequest[];
};
