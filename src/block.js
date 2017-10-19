import CryptoJS from 'crypto-js';

import chain from './chain';

export const calcHash = ({index, prevHash, timestamp, data}) => CryptoJS.SHA256(index + prevHash + timestamp + data).toString();

export const create = (data) => {
    const prev = chain.last();
    const index = prev.index + 1;
    const timestamp = new Date().getTime();
    const prevHash = prev.hash;
    const hash = calcHash({
        index,
        prevHash,
        timestamp,
        data
    });

    return {
        index,
        timestamp,
        data,
        prevHash,
        hash
    };
};

export const isNewBlockValid = (newBlock, prevBlock = chain.last()) => {
    let isValid = true;

    if (prevBlock.index + 1 !== newBlock.index) {
        console.log('New block has invalid index');
        isValid = false;
    } else if (prevBlock.hash !== newBlock.prevHash) {
        console.log('New block has invalid prevHash');
        isValid = false;
    } else if (calcHash(newBlock) !== newBlock.hash) {
        console.log('New block has invalid hash');
        isValid = false;
    }

    return isValid;
};
