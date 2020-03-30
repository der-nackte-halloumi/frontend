import * as R from 'ramda';

export function accessWindow<T>(path: R.Path, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  return R.path(path, window) as T;
}
