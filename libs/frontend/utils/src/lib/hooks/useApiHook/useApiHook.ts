import { useCallback, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { AxiosRequest, MessageArg, UseApiHiikReturnType } from './types';

export function useApiHook<
  ResponseDataType,
  SubmitObjectType = unknown,
  AxiosErrorResponse = unknown
>(
  messages: MessageArg<SubmitObjectType, AxiosErrorResponse> = {
    resolveMessage: undefined,
    rejectMessage: undefined,
  }
): UseApiHiikReturnType<ResponseDataType, SubmitObjectType> {
  const { enqueueSnackbar } = useSnackbar();
  const msg = useMemo(() => {
    return {
      rejectMessage: messages.rejectMessage,
      resolveMessage: messages.resolveMessage,
    };
  }, [messages.rejectMessage, messages.resolveMessage]);

  const handleRequest = useCallback(
    async <T>(request: AxiosRequest<T>, submitObject?: SubmitObjectType) => {
      try {
        const resp: AxiosResponse<T> | void = await request();

        if (resp.data) {
          if (msg.resolveMessage && typeof msg.resolveMessage === 'string') {
            enqueueSnackbar(msg.resolveMessage, { variant: 'success' });
          } else if (
            msg.resolveMessage &&
            typeof msg.resolveMessage === 'function' &&
            submitObject
          ) {
            enqueueSnackbar(msg.resolveMessage(submitObject), {
              variant: 'success',
            });
          }

          return resp.data;
        }
      } catch (error) {
        if (
          error &&
          error instanceof AxiosError &&
          (error.code === 'ECONNABORTED' || error.code === 'ERR_CANCELED')
        ) {
          return;
        }

        if (msg.rejectMessage && typeof msg.rejectMessage === 'string') {
          enqueueSnackbar(msg.rejectMessage, { variant: 'error' });
        } else if (
          msg.rejectMessage &&
          typeof msg.rejectMessage === 'function' &&
          axios.isAxiosError(error)
        ) {
          enqueueSnackbar(
            msg.rejectMessage(error as AxiosError<AxiosErrorResponse>),
            { variant: 'error' }
          );
        } else {
          enqueueSnackbar((error as Error).message);
        }
      }
    },
    [enqueueSnackbar, msg]
  );

  return { handleRequest };
}
