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

export type MenuDTO = {
    menuTypeId: number;
    adminName: string;
    nameRu: string;
    nameHe: string;
    descriptionRu: string;
    descriptionHe: string;
    calories: string;
    order: string;
    cycleStartDate: Date;
    isPublished: boolean;
    days: MenuDay[];
};

export type Menu = {
    id: number;
    adminName: string;
    name: LanguageField;
    description: LanguageField;
    calories: number;
    order: number;
    cycleStartDate: Date;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
    daysCount: number;
    menuType: {
        id: number;
        name: LanguageField;
    };
};

export type MenuPagination = Pagination & {
    menus: Menu[];
};
