import WebSocket from 'ws';

import config from '../config/index';
import sockets from './sockets';
import { onMessage, onError, write } from './handlers';
import { queryChainLengthMsg } from './actions';

const p2p = new WebSocket.Server({
    port: config.p2p.port
});

export const initConnection = (ws) => {
    sockets.update(ws);
    onMessage(ws);
    onError(ws);
    write(ws, queryChainLengthMsg());
};

export const connectToPeers = (newPeers) => {
    newPeers.forEach((peer) => {
        const ws = new WebSocket(peer);
        ws.on('open', () => {
            console.log('Connection received to peer: ', peer);
            initConnection(ws);
        });
        ws.on('error', () => {
            console.log('Connection failed to peer: ', peer);
        });
    });
};

export default p2p;