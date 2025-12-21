export type SearchField = 'name' | 'ingredient' | 'id';

export const SEARCH_FIELD_MAP: Record<SearchField, { field: string; method: string }> = {
  name: { field: 's', method: 'search' },
  ingredient: { field: 'i', method: 'filter' },
  id: { field: 'i', method: 'lookup' },
};

export function mapSearchFieldToSlug(field: SearchField): { field: string; method: string } {
  return SEARCH_FIELD_MAP[field];
}