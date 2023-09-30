import { BroadcastAuthMessages, BroadcastChannels } from '../constants';

export const checkIsDev = (): boolean => import.meta.env.DEV;

type BCMessagesType = BroadcastAuthMessages;
type BCMessagesPayload = { accessToken: string };

export interface BroadcastMessageObject {
  type: BCMessagesType;
  payload?: BCMessagesPayload;
}

export const sendBroadcastMessage = (
  channel: BroadcastChannels,
  message: BroadcastMessageObject
): void => {
  const bc = new BroadcastChannel(channel);
  bc.postMessage(message);
  bc.close();
};
