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

type ArrayForDateToString<T extends Array<unknown>> = T extends [
  infer F,
  ...infer R,
]
  ? F extends object
    ? [DateToString<F>, ...ArrayForDateToString<R>]
    : [F, ...ArrayForDateToString<R>]
  : T;
