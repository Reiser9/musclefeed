export const getOrderChangeLabel = (changeType?: string) => {
    switch (changeType) {
        case 'MENU':
            return 'Меню';
        case 'CALORIES':
            return 'Калории';
        case 'DURATION':
            return 'Продолжительность';
        case 'FORMAT':
            return 'Формат';
        case 'FREEZE':
            return 'Заморозка';
        default:
            return 'Связаться для выяснения';
    }
};
