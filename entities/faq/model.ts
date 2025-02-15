import { LanguageField } from '../language';

export type FaqDTO = {
    faqCategoryId: string;
    questionRu: string;
    questionHe: string;
    answerRu: string;
    answerHe: string;
};

export type FaqCategoryDTO = {
    picture: string;
    nameRu: string;
    nameHe: string;
};

export type FaqItem = {
    id: number;
    question: LanguageField;
    answer: LanguageField;
    faqCategory: FaqCategoryItem;
    createdAt: Date;
    updatedAt: Date;
};

export type FaqCategoryItem = {
    id: number;
    picture: string;
    name: LanguageField;
    createdAt: Date;
    updatedAt: Date;
    faqCount: number;
};
