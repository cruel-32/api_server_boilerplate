import type { AxiosResponse, AxiosError } from 'axios';
declare global {
  type ApiResponse<T=any ,D=any> = Promise<AxiosResponse<T, D>>;
}