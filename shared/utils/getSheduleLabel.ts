export const getScheduleLabel = (disabledDays?: number[], language = 'ru') => {
    if (!disabledDays) return '';

    const sortedDays = disabledDays.sort((a, b) => a - b).join(',');

    const scheduleMap: Record<string, string> = {
        '6,7': language === 'ru' ? 'Будни' : 'ימי חול',
        '5,6': language === 'ru' ? 'Пропускаем пятницу и субботу' : 'דילוג על שישי ושבת',
        '6': language === 'ru' ? 'Пропускаем субботу' : 'מדלגים על שבת',
        '5': language === 'ru' ? 'Пропускаем пятницу' : 'דילוג על יום שישי',
        '7': language === 'ru' ? 'Пропускаем воскресенье' : 'דילוג על יום ראשון',
        '5,7': language === 'ru' ? 'Пропускаем пятницу и воскресенье' : 'דילוג על שישי וראשון',
        '': language === 'ru' ? 'Ежедневное питание' : 'תפריט ללא דילוגים',
    };

    return scheduleMap[sortedDays] || (language === 'ru' ? 'Индивидуальный график' : 'לוח זמנים מותאם אישית');
};
