export class Page<T extends object> {
  '_embedded': Record<string, T[]>;
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
