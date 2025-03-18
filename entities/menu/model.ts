import { Pagination } from '../dish';
import { LanguageField } from '../language';

export type MenuTypeDTO = {
    adminName: string;
    nameRu: string;
    nameHe: string;
    descriptionRu: string;
    descriptionHe: string;
    shortDescriptionRu: string;
    shortDescriptionHe: string;
    initialPriceRu: string;
    initialPriceHe: string;
    backgroundPicture: string;
    order: string;
    isPublished: boolean;
};

export type MenuType = {
    id: number;
    adminName: string;
    backgroundPicture: string;
    order: number;
    isPublished: boolean;
    name: LanguageField;
    description: LanguageField;
    shortDescription: LanguageField;
    initialPrice: LanguageField;
    menusCount: number;
    createdAt: Date;
    updatedAt: Date;
};

export type MenuDay = {
    number: number;
    dishes: {
        dishTypeId: string | number;
        dishId: string | null | number;
        isPrimary: boolean;
    }[];
};

export type PriceItemDTO = {
    daysCount: string;
    price: string;
    discount: string;
    giftDaysCount: string;
};

export type PriceItem = {
    id: number;
    daysCount: number;
    price: number;
    discount: number;
    discountedPrice: number;
    giftDaysCount: number;
    pricePerDay: number;
    discountedPricePerDay: number;
};

export type MenuDTO = {
    menuTypeId: number;
    adminName: string;
    nameRu: string;
    nameHe: string;
    descriptionRu: string;
    descriptionHe: string;
    mealsCountRu: string;
    mealsCountHe: string;
    calories: string;
    order: string;
    cycleStartDate: string;
    isPublished: boolean;
    days: MenuDay[];
    prices: PriceItemDTO[];
};

export type Menu = {
    id: number;
    adminName: string;
    name: LanguageField;
    description: LanguageField;
    mealsCount: LanguageField;
    calories: number;
    order: number;
    cycleStartDate: Date;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
    daysCount: number;
    menuTypeId: number;
    days: MenuDay[];
    prices: PriceItemDTO[];
};

export type MenuUser = Omit<Menu, 'prices' | 'menuTypeId'> & {
    prices: PriceItem[];
    menuType: {
        id: number;
        name: LanguageField;
    };
};

export type MenuUserPagination = Pagination & {
    menus: MenuUser[];
};

export type MenuPagination = Pagination & {
    menus: Menu[];
};
