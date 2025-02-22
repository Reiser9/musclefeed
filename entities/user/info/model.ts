import type { City } from '@/entities/city';

export type UserAddressDTO = {
    cityId: string;
    street: string;
    house: string;
    floor: string;
    apartment: string;
};

export type UserAddress = Omit<UserAddressDTO, 'cityId'> & {
    city: City;
    id: number;
    isPrimary: boolean;
};

export type UserAddresses = {
    primaryAddress: UserAddress;
    otherAddresses: UserAddress[];
};
