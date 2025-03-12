export const getDayDeclension = (num?: number, language: 'ru' | 'he' = 'ru') => {
    if (!num) return num;

    if (num % 10 === 1 && num % 100 !== 11) {
        return language === 'ru' ? `${num} день` : `${num} יום`;
    } else if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100)) {
        return language === 'ru' ? `${num} дня` : `${num} ימים`;
    } else {
        return language === 'ru' ? `${num} дней` : `${num} ימים`;
    }
};
