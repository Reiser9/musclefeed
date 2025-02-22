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
    isProcessed: true;
    isAllowedExtendion: true;
    isPaid: true;
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
    };
    city: City;
    street: string;
    house: string;
    floor: number;
    apartment: number;
    comment: string;
    daysCount: number;
    daysLeft: number;
    deliveryStartDate: Date;
    deliveryEndDate: Date;
    skippedWeekdays: number[];
    paymentMethod: PaymentMethod;
    isPaid: boolean;
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
    isProcessed: true;
    isAllowedExtendion: true;
    isPaid: true;
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
