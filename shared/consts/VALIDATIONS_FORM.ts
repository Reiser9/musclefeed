import { useTranslations } from 'next-intl';

export const useValidationMessages = () => {
    const t = useTranslations('Validation');

    return {
        PASSWORD: {
            required: {
                value: true,
                message: t('required'),
            },
            minLength: {
                value: 8,
                message: t('short_password'),
            },
            maxLength: {
                value: 32,
                message: t('long_password'),
            },
        },
        CODE: {
            required: {
                value: true,
                message: t('required'),
            },
            minLength: {
                value: 6,
                message: t('code'),
            },
            maxLength: {
                value: 6,
                message: t('code'),
            },
        },
        EMAIL: {
            required: {
                value: true,
                message: t('required'),
            },
            pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: t('email'),
            },
        },
    };
};
