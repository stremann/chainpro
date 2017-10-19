import config from './config';
import app from './http';
import p2p, { initConnection, connectToPeers } from './p2p/index';

app.listen(config.http.port, () => console.info(`HTTP server has been started on port: ${config.http.port} (${config.env})`));

p2p.on('connection', ws => initConnection(ws));
console.info(`P2P server has been started on port: ${config.p2p.port} (${config.env})`);

connectToPeers(config.p2p.peers);