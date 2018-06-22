const SHA256 = require('sha256')

class Block{
    constructor(index, timestamp, data, prevHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
        this.nothing = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nothing).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nothing++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: "+ this.hash)
    }
}
class BlockChain{
    constructor(difficulty){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = difficulty;
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2018", "Genesis Block", "0")
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.prevHash = this.getLatestBlock().hash;
        //newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
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

let pCoin = new BlockChain(4);

console.log("Minning Block 1...");
pCoin.addBlock(new Block(1, "10/01/2018", {amount: 5 }));
console.log("Minning Block 2...");
pCoin.addBlock(new Block(2, "20/01/2018", {amount: 10 }));
console.log("Minning Block 3...");
pCoin.addBlock(new Block(3, "25/01/2018", {amount: 15 }));

