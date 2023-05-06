const {transectionOne, transectionTwo, transectionThree} = require("./TransactionProcessor");

function transectionValidator(transection,Users){

    let user = Users.find(user => user.public_key === transection.OwnKey);
    let payee = Users.find(payee => payee.public_key === transection.PublicKey);

    if(payee == user){
        if(user.type>1){
            transectionOne(transection,Users);
        return true;
        }
    }

    else if( payee != null && user != null ) {
        if( user.balance > transection.Amount) {
            transectionTwo(transection,Users);
            return true;
        }
    }

    else if( transection.PublicKey == "consumed" && user != null ) {
        if( user.balance > transection.Amount && user.type>1) {
            transectionThree(transection,Users);
            return true;
        }
    }

    else {
    return false;
    }

}


function userValidator(request,Users){
    let user = Users.find(user => user.public_key === request.OwnKey);

    if(user != null && user.type==3){
        return true;
    }
    else{
        return false;
    }

}

module.exports = {transectionValidator, userValidator};

