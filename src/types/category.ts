
export const Category: CategoryType = {
    1: 'X Universe',
    2: 'Elite: Dangerous',
    3: 'Starpoint Gemini',
    4: 'EVE Online'
} as const;

export type CategoryType = Record<number, string>;

export function getCategoryName(index: number | string) {
    return Category[Number(index)];
}
