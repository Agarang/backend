import { DateToString } from '../types/date-to-string.typs';

export function dateToString<T extends object>(target: T): DateToString<T> {
  try {
    const res = Object.entries(target).reduce((acc, [key, value]) => {
      if (value instanceof Date) {
        return {
          ...acc,
          [key]: value.toISOString(),
        };
      }

      if (value instanceof Array) {
        return {
          ...acc,
          [key]: arrayCheckForDateToString(value),
        };
      }

      if (value instanceof Object) {
        return {
          ...acc,
          [key]: dateToString(value),
        };
      }

      return {
        ...acc,
        [key]: value,
      };
    }, {}) as DateToString<T>;

    return res;
  } catch (err) {
    console.log(err);
    throw new Error('dateToString Function is wrong');
  }
}

function arrayCheckForDateToString(target: Array<unknown>): Array<unknown> {
  return target.map((el) => {
    if (el instanceof Date) {
      return el.toISOString();
    }

    if (el instanceof Array) {
      return arrayCheckForDateToString(el);
    }

    if (el instanceof Object) {
      return dateToString(el);
    }

    return el;
  });
}
