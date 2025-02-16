import { Pagination } from '../dish';
import { LanguageField } from '../language';

export type ReviewSendDTO = {
    picture: string;
    author: string;
    text: string;
    language: 'RU' | 'HE';
};

export type ReviewSend = {
    id: number;
    picture: string;
    author: LanguageField;
    text: LanguageField;
};

export type ReviewPagination = Pagination & {
    reviews: Review[];
};

export type ReviewDTO = {
    picture: string;
    authorRu: string;
    authorHe: string;
    textRu: string;
    textHe: string;
    isPublished: boolean;
};

export type Review = {
    id: number;
    picture: string;
    author: LanguageField;
    text: LanguageField;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
};
