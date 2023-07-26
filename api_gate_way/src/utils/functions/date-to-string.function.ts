import { DateAndBigIntToString } from '../types/date-to-string.type';

export function dateAndBigIntToString<T extends object>(
  target: T | null,
): DateAndBigIntToString<T> | null {
  if (target === null) {
    return null;
  }

  if (target instanceof Array) {
    return target;
  }

  try {
    const res = Object.entries(target).reduce((acc, [key, value]) => {
      if (value === null) {
        return { ...acc, [key]: null };
      }

      if (value instanceof Array) {
        return {
          ...acc,
          [key]: value.map((el) => {
            return dateAndBigIntToString(el);
          }),
        };
      }

      if (value instanceof Date) {
        return { ...acc, [key]: value.toISOString() };
      }

      if (typeof value === 'bigint') {
        return { ...acc, [key]: value.toString() };
      }

      if (typeof value === 'object') {
        return { ...acc, [key]: dateAndBigIntToString(value) };
      }

      return { ...acc, [key]: value };
    }, {}) as DateAndBigIntToString<T>;

    return res;
  } catch (err) {
    console.log(err);
    throw new Error('dateAndBigIntToString function is wrong');
  }
}
