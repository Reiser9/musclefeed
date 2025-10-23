export type Settings = {
    id: 0;
    cycleStartDate: string;
    phoneNumber: string;
    email: string;
    socials: Social[];
    deliveryWeekdays: number[];
};

export type Social = {
    id: number;
    name: string;
    link: string;
    icon: string;
};
