const sqlite3 = require ('sqlite3').verbose();
let sql; 

const db = new sqlite3.Database('../Water Database/water.db', sqlite3.OPEN_READWRITE, (err)=>{
    if(err) return console.log(err.message);
});

// sql = 'CREATE TABLE users (public_key TEXT PRIMARY KEY, private_key TEXT NOT NULL, name TEXT NOT NULL,balance INTEGER, type INTEGER NOT NULL)';

// db.run(sql);

// sql = 'DELETE FROM users WHERE name = "Tanay";'

// db.run(sql);

sql = 'CREATE TABLE wallet (public_key TEXT PRIMARY KEY, private_key TEXT NOT NULL, name TEXT NOT NULL,balance INTEGER, type INTEGER NOT NULL)';

db.run(sql);


   
//  sql = 'UPDATE users SET balance = ? '

//     db.run(sql,[0], (err)=>{
//         if (err) return console.log(err.message);
//     });

// sql = 'DROP TABLE blocks';

// db.run(sql);

// sql = 'CREATE TABLE blocks (signer_node TEXT NOT NULL, timeStamp INT NOT NULL, lastHash TEXT NOT NULL, data TEXTNOT NULL, difficulty INT NOT NULL, Nonce INT NOT NULL, hash TEXT PRIMARY KEY NOT NULL)';

// db.run(sql);
