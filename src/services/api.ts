import axios, { AxiosResponse } from 'axios';
import distance from '@turf/distance';
import { point } from '@turf/helpers';

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
}: SearchStoreParams): Promise<PaginatedData<Shop[]>> =>
  axios(getApiUrl('/shops'), {
    params: { query, lat: latitude, long: longitude },
  }).then((res) => {
    const result = paginateData<Array<Shop> | null>(res);
    const searchLocation =
      longitude && latitude ? point([longitude, latitude]) : null;

    return {
      ...result,
      data: (result.data || []).map((shop) => ({
        ...shop,
        distance: searchLocation
          ? distance(point([shop.lng, shop.lat]), searchLocation)
          : null,
      })),
    };
  });
