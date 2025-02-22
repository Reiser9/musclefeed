export type UserShortInfoDTO = {
    firstName: string;
    lastName: string;
    phone: string;
    allergies: string;
};

export type UserShortInfo = {
    id: number;
    email: string;
    isVerified: boolean;
    roles: string[];
    firstName: string;
    lastName: string;
    phone: string;
    allergies: string;
};

export type RegisterDTO = {
    email: string;
    password: string;
    language: 'RU' | 'HE';
};

export type AuthResponse = {
    user: UserShortInfo;
    accessToken: string;
};

export type LoginDTO = {
    email: string;
    password: string;
};

export type ChangePasswordDTO = {
    oldPassword: string;
    newPassword: string;
};
