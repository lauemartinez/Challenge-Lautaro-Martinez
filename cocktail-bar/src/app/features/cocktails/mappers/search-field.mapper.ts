export type SearchField = 'name' | 'ingredient' | 'id';

export const SEARCH_FIELD_MAP: Record<SearchField, string> = {
  name: 's',
  ingredient: 'i',
  id: 'i',
};

export function mapSearchFieldToSlug(field: SearchField): string {
  return SEARCH_FIELD_MAP[field];
}