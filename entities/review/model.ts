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
    reviews: ReviewSend[];
};
