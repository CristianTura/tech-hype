import { paginate } from './pagination.util';

describe('Pagination Utility', () => {
  const mockData = Array.from({ length: 25 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

  describe('paginate', () => {
    it('should return first page with correct data', () => {
      const result = paginate(mockData, 1, 10);
      
      expect(result.data).toHaveLength(10);
      expect(result.data[0].id).toBe(1);
      expect(result.data[9].id).toBe(10);
      expect(result.meta).toEqual({
        page: 1,
        limit: 10,
        total: 25,
        totalPages: 3,
      });
    });

    it('should return middle page with correct data', () => {
      const result = paginate(mockData, 2, 10);
      
      expect(result.data).toHaveLength(10);
      expect(result.data[0].id).toBe(11);
      expect(result.data[9].id).toBe(20);
      expect(result.meta).toEqual({
        page: 2,
        limit: 10,
        total: 25,
        totalPages: 3,
      });
    });

    it('should return last page with remaining items', () => {
      const result = paginate(mockData, 3, 10);
      
      expect(result.data).toHaveLength(5);
      expect(result.data[0].id).toBe(21);
      expect(result.data[4].id).toBe(25);
      expect(result.meta).toEqual({
        page: 3,
        limit: 10,
        total: 25,
        totalPages: 3,
      });
    });

    it('should handle page out of range by returning last page', () => {
      const result = paginate(mockData, 5, 10);
      
      expect(result.data).toHaveLength(5);
      expect(result.meta.page).toBe(3); // Should be clamped to last page
    });

    it('should handle empty array', () => {
      const result = paginate([], 1, 10);
      
      expect(result.data).toHaveLength(0);
      expect(result.meta).toEqual({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      });
    });

    it('should handle single item array', () => {
      const singleItem = [{ id: 1, name: 'Single' }];
      const result = paginate(singleItem, 1, 10);
      
      expect(result.data).toHaveLength(1);
      expect(result.meta).toEqual({
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      });
    });

    it('should handle limit larger than array size', () => {
      const result = paginate(mockData, 1, 100);
      
      expect(result.data).toHaveLength(25);
      expect(result.meta).toEqual({
        page: 1,
        limit: 100,
        total: 25,
        totalPages: 1,
      });
    });

    it('should handle limit of 1', () => {
      const result = paginate(mockData, 5, 1);
      
      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe(5);
      expect(result.meta).toEqual({
        page: 5,
        limit: 1,
        total: 25,
        totalPages: 25,
      });
    });
  });
});
