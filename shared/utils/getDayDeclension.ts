export const getDayDeclension = (num?: number) => {
    if (!num) return num;

    if (num % 10 === 1 && num % 100 !== 11) {
        return `${num} день`;
    } else if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100)) {
        return `${num} дня`;
    } else {
        return `${num} дней`;
    }
};
