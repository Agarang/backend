export type TypeToSelect<T> = {
  [P in keyof T]: true;
};
