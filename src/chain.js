import { calcHash, isNewBlockValid } from './block';

const Chain = (function () { // eslint-disable-line func-names
    let instance;
    const origin = {
        index: 0,
        timestamp: 0,
        data: 'Hello Blockchain!',
        prevHash: 0,
        hash: calcHash({
            index: 0,
            prevHash: 0,
            timestamp: 0,
            data: 'Hello Blockchain!'
        })
    };
    const chain = [origin];

    function isChainValid(newChain) {
        let isValid = true;

        if (JSON.stringify(newChain[0]) !== JSON.stringify(origin)) {
            console.log('Received chain is invalid. Origin block does not coincide');
            isValid = false;
            return isValid;
        }

        const tempChain = [newChain[0]];
        for (let i = 1; i < newChain.length; i += 1) {
            if (isNewBlockValid(newChain[i], tempChain[i - 1])) {
                tempChain.push(newChain[i]);
            } else {
                isValid = false;
                return isValid;
            }
        }

        return isValid;
    }

    function get() {
        return chain;
    }

    function update(block) {
        if (isNewBlockValid(block)) {
            chain.push(block);
        }
    }

    function last() {
        return chain.slice().pop();
    }

    function replace(newChain) {
        if (isChainValid(newChain) && newChain.length > chain.length) {
            console.log('Received chain is valid. Replacing current chain with received chain');
            chain.length = 0; // clear current chain
            chain.push(...newChain); // fill current already empty chain with the new one if valid
        } else {
            console.log('Received chain is invalid');
        }
    }

    function create() {
        return {
            get,
            update,
            last,
            replace
        };
    }

    return {
        init() {
            if (!instance) {
                instance = create();
            }
            return instance;
        }
    };
}());

export default Chain.init();
