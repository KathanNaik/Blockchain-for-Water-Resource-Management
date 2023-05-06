const crypto = require('crypto');
// const hexToBinary = require('hex-to-binary');

const CryptoHash = (...input) => {          //can be calculated in hex or binary, here we have implimented it in hex
    const hash = crypto.createHash('sha256');

    hash.update(input.sort().join(' '));

    return (hash.digest('hex'));

};

module.exports = CryptoHash;