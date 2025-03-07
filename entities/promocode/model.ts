import { Pagination } from '../dish';

export type Promocode = {
    id: number;
    code: string;
    discount: number;
};

export type PromocodeDTO = {
    code: string;
    discount: string;
};

export type PromocodePagination = Pagination & {
    promocodes: Promocode[];
};
