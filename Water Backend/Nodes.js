const EC = require('elliptic').ec
const cryptoHash = require('./CryptoHash');

const ec = new EC('secp256k1');

const sqlite3 = require('sqlite3').verbose();
let sql;

const db = new sqlite3.Database('../Water Database/water.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.log(err.message);
});


class Node {
    constructor() {
        this.Nodes = [];
    }

    UpdateNodes(callback) {

        this.Nodes = [];

        sql = 'SELECT * FROM users';
        db.all(sql, (err, rows) => {
            rows.forEach(row => {
                this.Nodes.push(row);
            });
            if(callback)
                callback();
        });
    }

    AddNode(Name, Balance, Type) {
        const keypair = ec.genKeyPair();

        let PublicKey = keypair.getPublic().encode('hex');
        let PrivateKey = keypair.getPrivate();

        this.Nodes[this.Nodes.length] = {
            public_key: PublicKey,
            private_key: PrivateKey,
            name: Name,
            balance: Balance,
            type: Type
        }

        let sql = 'INSERT INTO users (public_key, private_key, name, balance, type) VALUES (?,?,?,?,?)';

        db.run(sql, [PublicKey, JSON.stringify(PrivateKey), Name, Balance, Type], (err) => {
            if (err) return console.log(err.message);
        });

    }

    VerifySignature({ publicKey, data, signature }) {

        const keyFromPublic = ec.keyFromPublic(publicKey, 'hex');

        return keyFromPublic.verify(cryptoHash(data), signature);

    }

    Sign(keys, data) {

        const keypair = keys;

        return keypair.sign(cryptoHash(data));

    }
}

module.exports = Node;