export type PaginatedResponse<Key extends string, T> = {
  page: number;
  perPage: number;
  totalPages: number;
} & Record<Key, T[]> & { [P in `total${Capitalize<Key>}`]: number };
