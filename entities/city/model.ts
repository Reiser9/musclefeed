import type { LanguageField } from '../language';

export type City = {
    id: number;
    code: string;
    name: LanguageField;
};

export type CityDTO = {
    nameRu: string;
    nameHe: string;
    code: string;
};
