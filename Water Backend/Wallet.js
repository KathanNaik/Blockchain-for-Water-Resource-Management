const EC = require('elliptic').ec
const cryptoHash = require('./CryptoHash');

const ec = new EC('secp256k1');

const sqlite3 = require('sqlite3').verbose();
let sql;

const db = new sqlite3.Database('../Water Database/water.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.log(err.message);
});


class Wallet {
    constructor() {
        this.Keys = [];
    }

    UpdateWallet(callback) {

        this.Keys = [];

        sql = 'SELECT * FROM wallet';
        db.all(sql, (err, rows) => {
            rows.forEach(row => {
                this.Keys.push(row);
            });
            if(callback)
            callback();
        })

    }

addToWallet(PublicKey, PrivateKey){

    sql = 'DELETE FROM wallet WHERE 1=1'

    db.run(sql);

    sql = 'SELECT * FROM users WHERE private_key = ?';
        db.all(sql, [PrivateKey] ,(err, rows) => {
            rows.forEach(row => {
                if(row.public_key == PublicKey)
                this.Keys.push(row);

        let Name = row.name;
        let Balance = row.balance;
        let Type =  row.type;

        sql = 'INSERT INTO wallet (public_key, private_key, name, balance, type) VALUES (?,?,?,?,?)';

        db.run(sql, [PublicKey, JSON.stringify(PrivateKey), Name, Balance, Type], (err) => {
            if (err) return console.log(err.message);
        });
            });
        });

}

// removeWallet(PublicKey) {

//     sql = 'DELETE FROM wallet WHERE public_key = ?;'

//     db.run(sql, [PublicKey], (err)=>{
//         console.log(err);
//     });

// }

}

module.exports = Wallet;