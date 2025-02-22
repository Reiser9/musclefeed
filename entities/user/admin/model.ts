import type { Pagination } from '@/entities/dish';
import type { UserShortInfo } from '../auth';

export type UserPaginations = Pagination & {
    users: UserShortInfo[];
};
