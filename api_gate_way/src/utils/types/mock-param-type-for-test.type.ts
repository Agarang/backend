export type MockParamTypeForTest<T extends object> = {
  [P in keyof T]?: T[P] extends (...args: any[]) => infer R
    ? Array<Awaited<R>>
    : never;
};
