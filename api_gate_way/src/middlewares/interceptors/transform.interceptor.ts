export interface ResponseForm<T> {
  success: boolean;
  code: 200;
  data: T;
}

export function responseForm<T>(data: T): ResponseForm<T> {
  return {
    success: true,
    code: 200,
    data,
  };
}
