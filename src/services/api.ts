import axios, { AxiosResponse } from 'axios';

import { Shop } from '../models/shop';

const getApiUrl = (path: string): string => `${process.env.apiUrl}${path}`;

type PaginatedData<T> = {
  data: T;
  meta: {
    count: number;
    page: number;
    limit: number;
  };
};

export const paginateData = <T = {}>({
  headers,
  data,
}: Pick<AxiosResponse<T>, 'headers' | 'data'>): PaginatedData<T> => ({
  data,
  meta: {
    count: Number(headers['Pagination-Count']) || -1,
    page: Number(headers['Pagination-Page']) || -1,
    limit: Number(headers['Pagination-Limit']) || -1,
  },
});

interface SearchStoreParams {
  query?: string;
  latitude?: number;
  longitude?: number;
}
export const searchStores = ({
  query,
  latitude,
  longitude,
}: SearchStoreParams): Promise<PaginatedData<Shop[] | null>> =>
  axios(getApiUrl('/shops'), {
    params: { query, lat: latitude, long: longitude },
  }).then((res) => paginateData<Array<Shop> | null>(res));
