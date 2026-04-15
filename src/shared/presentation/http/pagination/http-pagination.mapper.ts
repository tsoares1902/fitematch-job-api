import { Injectable } from '@nestjs/common';
import type { HttpPagination } from '@src/shared/presentation/http/pagination/http-pagination.interface';

@Injectable()
export class HttpPaginationMapper {
  toPagination(
    totalItems: number,
    itemCount: number,
    limit: number,
    currentPage: number,
    url: string,
  ): HttpPagination {
    const totalPages = Math.ceil(totalItems / limit);
    const hasPreviousPage = currentPage > 1;
    const hasNextPage = currentPage < totalPages;

    return {
      totalItems,
      itemCount,
      itemsPerPage: limit,
      totalPages,
      currentPage,
      hasNextPage,
      hasPreviousPage,
      links: {
        first: `${url}?limit=${limit}`,
        previous: hasPreviousPage
          ? `${url}?page=${currentPage - 1}&limit=${limit}`
          : '',
        next: hasNextPage
          ? `${url}?page=${currentPage + 1}&limit=${limit}`
          : '',
        last: `${url}?page=${totalPages}&limit=${limit}`,
      },
    };
  }
}
