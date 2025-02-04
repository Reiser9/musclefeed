export type RegisterDTO = {
    email: string;
    password: string;
    language: 'RU' | 'HE';
};

export type RegisterResponse = {
    user: {
        id: number;
        email: string;
        isVerified: boolean;
        roles: string[];
    };
    accessToken: string;
};
