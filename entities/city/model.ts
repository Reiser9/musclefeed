import type { LanguageField } from '../language';

export type City = {
    id: number;
    name: LanguageField;
};

export type CityDTO = {
    nameRu: string;
    nameHe: string;
};
