type DateToString<T> = T extends Date ? string : T;

type BigIntToString<T> = T extends bigint ? string : T;

export type DateAndBigIntToString<T extends object> = {
  [P in keyof T]: BigIntToString<T[P]> extends T[P]
    ? DateToString<T[P]> extends T[P]
      ? T[P] extends object
        ? DateAndBigIntToString<T[P]>
        : T[P]
      : DateToString<T[P]>
    : BigIntToString<T[P]>;
};
