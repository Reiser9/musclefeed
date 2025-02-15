import type { LanguageField } from '../language';

export type Team = {
    id: number;
    picture: string;
    role: LanguageField;
    name: LanguageField;
    description: LanguageField;
    createdAt: string;
    updatedAt: string;
};

export type TeamDTO = {
    picture: string;
    roleRu: string;
    roleHe: string;
    nameRu: string;
    nameHe: string;
    descriptionRu: string;
    descriptionHe: string;
};
