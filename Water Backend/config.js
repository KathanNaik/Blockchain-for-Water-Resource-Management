const INITIAL_DIFFICULTY = 6;       //initial difficuly
const MINE_RATE = 1000;             //initial mine-rate - 1 sec

const GENESIS_DATA = {       
    signer_node:'GOD',       //the genesis block custom created
    timeStamp: 1,
    lastHash: '$!@',
    hash:'hash_one',
    data: ["This is Genesis Block"],
    Nonce:0,
    difficulty:INITIAL_DIFFICULTY
};

module.exports = {GENESIS_DATA, INITIAL_DIFFICULTY, MINE_RATE};