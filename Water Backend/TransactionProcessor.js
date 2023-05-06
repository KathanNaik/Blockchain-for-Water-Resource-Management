const sqlite3 = require ('sqlite3').verbose();

const db = new sqlite3.Database('../Water Database/water.db', sqlite3.OPEN_READWRITE, (err)=>{
    if(err) return console.log(err.message);
});

function transectionOne(transection,Users){
    let user = Users.find(user => user.public_key === transection.OwnKey);

    let new_balance = parseInt(user.balance) + parseInt(transection.Amount);

    let sql;
    sql = 'UPDATE users SET balance = ? WHERE public_key = ?'

    db.run(sql,[new_balance, user.public_key], (err)=>{
        if (err) return console.log(err.message);
    });

}

function transectionTwo(transection,Users){
    let user = Users.find(user => user.public_key === transection.OwnKey);
    let payee = Users.find(payee => payee.public_key === transection.PublicKey);

    let new_balance = parseInt(user.balance) - parseInt(transection.Amount);
    let add_balance = parseInt(payee.balance) + parseInt(transection.Amount);

    let sql;
    sql = 'UPDATE users SET balance = ? WHERE public_key = ?'

    db.run(sql,[new_balance, user.public_key], (err)=>{
        if (err) return console.log(err.message);
    });

    sql = 'UPDATE users SET balance = ? WHERE public_key = ?'

    db.run(sql,[add_balance, payee.public_key], (err)=>{
        if (err) return console.log(err.message);
    });

}

function transectionThree(transection,Users){
    let user = Users.find(user => user.public_key === transection.OwnKey);
    
    let new_balance = parseInt(user.balance) - parseInt(transection.Amount);

    let sql;
    sql = 'UPDATE users SET balance = ? WHERE public_key = ?'

    db.run(sql,[new_balance, user.public_key], (err)=>{
        if (err) return console.log(err.message);
    });
}

module.exports = {transectionOne, transectionTwo, transectionThree};