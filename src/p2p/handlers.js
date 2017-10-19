import chain from '../chain';
import sockets from './sockets';
import { MessageType } from './types';
import { queryAllMsg, responseChainMsg, responseLatestMsg } from './actions';

export const write = (ws, message) => {
    console.log('Write message data to p2p socket: ', message);
    ws.send(JSON.stringify(message));
};

export const broadcast = (message) => {
    console.log('Broadcast message data to p2p socket: ', message);
    sockets.get().map(socket => write(socket, message));
};

const handleChainResponse = (message) => {
    const receivedBlocks = JSON.parse(message.data).sort((b1, b2) => (b1.index - b2.index));
    const latestBlockReceived = receivedBlocks[receivedBlocks.length - 1];
    const latestBlockHeld = chain.last();

    if (latestBlockReceived.index === latestBlockHeld.index) {
        console.log('Received chain is no longer than hold chain. Do nothing');
        return;
    }

    console.log(`Chain is possibly behind. We got: ${latestBlockHeld.index} Peer got: ${latestBlockReceived.index}`);

    if (latestBlockHeld.hash === latestBlockReceived.prevHash) {
        console.log('We can append the received block to our chain');
        chain.update(latestBlockReceived);
        broadcast(responseLatestMsg());
    } else if (receivedBlocks.length === 1) {
        console.log('We have to query the chain from our peer');
        broadcast(queryAllMsg());
    } else {
        console.log('Received chain is longer than current chain. Replace chain');
        chain.replace(receivedBlocks);
    }
};

export const onMessage = (ws) => {
    ws.on('message', (data) => {
        const message = JSON.parse(data);
        console.log(`Received message: ${JSON.stringify(message)}`);

        switch (message.type) {
            case MessageType.QUERY_LATEST:
                write(ws, responseLatestMsg());
                break;
            case MessageType.QUERY_ALL:
                write(ws, responseChainMsg());
                break;
            case MessageType.RESPONSE_BLOCKCHAIN:
                handleChainResponse(message);
                break;
            default:
                console.log('Received message type is out of scope');
                break;
        }
    });
};

export const onError = (ws) => {
    const closeConnection = (peer) => {
        console.log(`Close connection to peer: ${peer.url}`);
        sockets.remove(peer);
    };
    ws.on('close', () => closeConnection(ws));
    ws.on('error', () => closeConnection(ws));
};

