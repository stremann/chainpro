import chain from '../chain';
import { MessageType } from './types';

export const queryChainLengthMsg = () => ({
    type: MessageType.QUERY_LATEST
});

export const queryAllMsg = () => ({
    type: MessageType.QUERY_ALL
});

export const responseChainMsg = () =>({
    type: MessageType.RESPONSE_BLOCKCHAIN,
    data: JSON.stringify(chain.get())
});

export const responseLatestMsg = () => ({
    type: MessageType.RESPONSE_BLOCKCHAIN,
    data: JSON.stringify([chain.last()])
});