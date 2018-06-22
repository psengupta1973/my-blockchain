const SHA256 = require('sha256')

class Block{
    constructor(index, timestamp, data, prevHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2018", "Genesis Block", "0")
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i=1; i< this.chain.length; i++){
            //console.log("i="+ i +" index: "+this.chain[i].index+" ->  "+ this.chain[i].prevHash +" !==  " + this.chain[i-1].hash);
            if(this.chain[i].hash !== this.chain[i].calculateHash()){
                return false;
            }
            if(this.chain[i].prevHash !== this.chain[i-1].hash){
                return false;
            }
        }
        return true;
    }
}

let pCoin = new BlockChain();
pCoin.addBlock(new Block(1, "10/01/2018", {amount: 5 }));
pCoin.addBlock(new Block(2, "20/01/2018", {amount: 10 }));
pCoin.addBlock(new Block(3, "25/01/2018", {amount: 15 }));
pCoin.addBlock(new Block(4, "29/01/2018", {amount: 25 }));
pCoin.addBlock(new Block(5, "30/01/2018", {amount: 35 }));

console.log(JSON.stringify(pCoin, null, 4));

console.log('Is BlockChain Valid? '+ pCoin.isChainValid());

pCoin.chain[3].data = {amount: 109 };
pCoin.chain[3].hash = pCoin.chain[3].calculateHash();
console.log('Is BlockChain Valid? '+ pCoin.isChainValid());
