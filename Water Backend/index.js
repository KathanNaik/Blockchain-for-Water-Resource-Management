const bodyParser = require("body-parser");
const express = require("express");
const BlockChain = require("./BlockChain");
const Node = require("./Nodes");
const Wallet = require("./Wallet");
const {userValidator} = require("./Validator");
const {transectionValidator} = require("./Validator");

const app= express();
let cors = require("cors");
const blockchain= new BlockChain();
const nodes= new Node();
const wallet= new Wallet();

nodes.UpdateNodes();
blockchain.UpdateChain();
wallet.UpdateWallet();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.set('view engine','ejs');

let i=1;//no. of transactions currently recieved to put in the new Block

app.get('/api/blocks', (req, res)=>{        //displaying the BlockChain on a seperate Page for our convinience
    nodes.UpdateNodes(function(){
        res.json(blockchain.Chain);
    });
});

app.get('/api/nodes', (req, res)=>{       //displaying the BlockChain on a seperate Page for our convinience

    nodes.UpdateNodes(function(){
        res.json(nodes.Nodes);
    });
});

app.get('/api/wallet', (req, res)=>{       //displaying the BlockChain on a seperate Page for our convinience

    wallet.UpdateWallet(function(){
        
    res.json(wallet.Keys);
    });

});

let t1=1;//creating a global space for storing first transaction
let t2=2;//creating a global space for storing second transaction
let t3=3;//creating a global space for storing third transaction
let t4=4;//creating a global space for storing fourth transaction


app.post('/api/addnode', (req, res)=>{

    if(userValidator(req.body, nodes.Nodes)){

    const Name= req.body.Name;
    const Balance= req.body.Balance;
    const Type= req.body.Type;
    
    nodes.AddNode(Name, Balance, Type);

    res.redirect('/api/nodes');
    }
    else {
        res.json("Not Valid");
    }

});

app.post('/api/addtowallet', (req, res)=>{

    const Name= req.body.Name;
    const PublicKey= req.body.PublicKey;
    const PrivateKey= req.body.PrivateKey;

        wallet.addToWallet(PublicKey,PrivateKey);

    res.redirect('/api/wallet');

});

app.post('/api/mine', (req, res)=>{     //post block for minng a block if 4 transactions are within hand

    console.log(req.body);

    if(i==1 && transectionValidator(req.body,nodes.Nodes))
    {
        t1=req.body;
        i++;
        console.log(t1);
        res.redirect('/api/blocks');
    }

    else if(i==2 && transectionValidator(req.body,nodes.Nodes))
    {
        t2=req.body;
        i++;
        console.log(t2);
        res.redirect('/api/blocks');
    }

    else if(i==3 && transectionValidator(req.body,nodes.Nodes))
    {
        t3=req.body;
        i++;
        console.log(t3);
        res.redirect('/api/blocks');
    }

    else if(i==4 && transectionValidator(req.body,nodes.Nodes))
    {
        t4=req.body;        //if we have stored 4 transactions then we proceed to form a block
        console.log(t4);
        const data= {t1,t2,t3,t4};

        i=1;

        let x;

        do {
        x = Math.floor((Math.random() * (nodes.Nodes.length-1)) + 1);
        }
        while(nodes.Nodes[x].type<2) 

        signer = nodes.Nodes[x].public_key;

        blockchain.addBlock({data,signer});

        res.redirect('/api/blocks');
    }
    else {
        res.json("Not Valid");
    }
   
})

const port= 3000;

app.listen(port, ()=>{     
    console.log('listenign to server');
})