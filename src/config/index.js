import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
    path: path.join(__dirname, '../../.env')
});

const config = {
    env: process.env.NODE_ENV,
    http: {
        port: process.env.HTTP_PORT
    },
    p2p: {
        port: process.env.P2P_PORT,
        peers: process.env.P2P_PEERS ? process.env.P2P_PEERS.split(',') : []
    }
};

export default config;