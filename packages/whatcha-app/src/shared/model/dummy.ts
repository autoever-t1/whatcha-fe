import { PageResponse } from "./types";

export const fillPageResponse = (): Omit<PageResponse<any>, "content"> => {
  return {
    pageable: {
      sort: {
        empty: true,
        sorted: true,
        unsorted: true,
      },
      offset: 0,
      pageSize: 10,
      pageNumber: 1,
      paged: true,
      unpaged: false,
    },
    last: true,
    totalElements: 100,
    totalPages: 10,
    size: 10,
    number: 1,
    sort: {
      empty: true,
      sorted: true,
      unsorted: true,
    },
    first: true,
    numberOfElements: 10,
    empty: false,
  };
};
