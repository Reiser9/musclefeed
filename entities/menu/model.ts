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
        dishTypeId: string;
        dishId: string | null;
        isPrimary: boolean;
    }[];
};

export type PriceItemDTO = {
    daysCount: string;
    price: string;
    totalPriceRu: string;
    totalPriceHe: string;
    pricePerDayRu: string;
    pricePerDayHe: string;
};

export type PriceItem = {
    id: number;
    daysCount: number;
    price: number;
    totalPrice: LanguageField;
    pricePerDay: LanguageField;
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

export type MenuUser = Omit<Menu, 'prices'> & {
    prices: PriceItem[];
};

export type MenuUserPagination = Pagination & {
    menus: MenuUser[];
};

export type MenuPagination = Pagination & {
    menus: Menu[];
};
