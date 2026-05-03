import { PaginationResult } from '../models/video.model';

export function paginate<T>(items: T[], page: number, limit: number): PaginationResult<T> {
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  
  const safePage = Math.min(page, totalPages || 1);
  
  const startIndex = (safePage - 1) * limit;
  const endIndex = startIndex + limit;
  
  const data = items.slice(startIndex, endIndex);
  
  return {
    data,
    meta: {
      page: safePage,
      limit,
      total,
      totalPages,
    },
  };
}
