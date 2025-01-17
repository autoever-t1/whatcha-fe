export interface PageResponse<T> {
  total: number;
  page: number;
  size: number;
  data: T[];
}
