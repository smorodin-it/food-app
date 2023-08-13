import { AxiosError, AxiosResponse } from 'axios';

export interface MessageArg<SubmitObjectType, AxiosErrorResponse> {
  resolveMessage?: ((object: SubmitObjectType) => string) | string;
  rejectMessage?: ((object: AxiosError<AxiosErrorResponse>) => string) | string;
}
export type AxiosRequest<T> = () => // controller: AbortController
Promise<AxiosResponse<T>>;

export interface UseApiHiikReturnType<ResponseDataType, SubmitObjectType> {
  handleRequest: (
    req: AxiosRequest<ResponseDataType>,
    submitObject?: SubmitObjectType
  ) => Promise<ResponseDataType | void>;
  // controller: AbortController;
}
