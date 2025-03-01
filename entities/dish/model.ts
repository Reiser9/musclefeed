import { LanguageField } from '../language';

export type DishType = {
    id: number;
    name: LanguageField;
};

export type DishDTO = {
    adminName: string;
    nameRu: string;
    nameHe: string;
    dishTypeId: string;
    picture: string;
    descriptionRu: string;
    descriptionHe: string;
    calories: string;
    weight: string;
    proteins: string;
    fats: string;
    carbohydrates: string;
    isPublished: boolean;
    benefitRu: string;
    benefitHe: string;
    price: string;
    isIndividualOrderAvailable: boolean;
};

export type Dish = {
    id: number;
    adminName: string;
    dishType: DishType;
    picture: string;
    calories: number | string;
    weight: number | string;
    proteins: number | string;
    fats: number | string;
    carbohydrates: number | string;
    isPublished: boolean;
    name: LanguageField;
    description: LanguageField;
    benefit: LanguageField;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    isIndividualOrderAvailable: boolean;
    count: number;
};

export type Pagination = {
    totalCount: number;
    page: number;
    totalPages: number;
    isLast: boolean;
};

export type DishPagination = Pagination & {
    dishes: Dish[];
};
