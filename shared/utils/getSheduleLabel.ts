export const getScheduleLabel = (disabledDays: number[]): string => {
    const sortedDays = disabledDays.sort((a, b) => a - b).join(',');

    const scheduleMap: Record<string, string> = {
        '6,7': 'Будни',
        '5,6': 'Пропускаем пятницу и субботу',
        '6': 'Пропускаем субботу',
        '5': 'Пропускаем пятницу',
        '7': 'Пропускаем воскресенье',
        '5,7': 'Пропускаем пятницу и воскресенье',
        '': 'Без ограничений',
    };

    return scheduleMap[sortedDays] || 'Индивидуальный график';
};
