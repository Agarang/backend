export type DateToString<T extends object> = {
  [P in keyof T]: DateToStringOnly<T[P]> extends T[P]
    ? T[P] extends Array<unknown>
      ? ArrayForDateToString<T[P]>
      : T[P] extends object
      ? DateToString<T[P]>
      : T[P]
    : DateToStringOnly<T[P]>;
};

type DateToStringOnly<T> = T extends Date ? string : T;

export type ArrayForDateToString<T> = T extends Array<infer U>
  ? U extends object
    ? [DateToString<U>]
    : [...ArrayForDateToString<U>]
  : [T];
