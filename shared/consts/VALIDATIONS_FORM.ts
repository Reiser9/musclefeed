export const PASSWORD = {
    required: {
        value: true,
        message: 'Обязательное поле',
    },
    minLength: {
        value: 8,
        message: 'Пароль не может быть меньше 8 символов',
    },
    maxLength: {
        value: 32,
        message: 'Пароль не может быть больше 32 символов',
    },
};

export const CODE = {
    required: {
        value: true,
        message: 'Обязательное поле',
    },
    minLength: {
        value: 6,
        message: 'Код подтверждения должен состоять из 6 символов',
    },
    maxLength: {
        value: 6,
        message: 'Код подтверждения должен состоять из 6 символов',
    },
};

export const EMAIL = {
    required: {
        value: true,
        message: 'Обязательное поле',
    },
    pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: 'Введите корректный адрес электронной почты',
    },
};
