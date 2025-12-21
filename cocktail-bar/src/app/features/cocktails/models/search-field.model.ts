import { SearchField } from "../mappers/search-field.mapper";

export interface SearchFilter {
  field: SearchField;
  value: string;
  favourite: boolean;
}