import { paginateData } from './api';

describe('services/api', () => {
  describe('paginateData', () => {
    it('should return the passed data as unaltered "data" property of its returned object', () => {
      const data = {};

      expect(paginateData({ data, headers: {} }).data).toBe(data);
    });

    it('should return a "meta" object with pagination object as passed down by the headers', () => {
      const count = 10;
      const page = 1;
      const limit = 10;

      const headers = {
        'Pagination-Count': count,
        'Pagination-Page': page,
        'Pagination-Limit': limit,
      };

      expect(paginateData({ data: {}, headers }).meta).toEqual({
        count,
        page,
        limit,
      });
    });

    it('should return a "meta" object with the pagination information as -1 when no information was found in the headers', () => {
      expect(paginateData({ data: {}, headers: {} }).meta).toEqual({
        count: -1,
        page: -1,
        limit: -1,
      });
    });
  });
});
