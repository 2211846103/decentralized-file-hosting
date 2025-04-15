import { createHash } from "crypto";

function SHA256(message: string): string {
    return createHash("sha256").update(message).digest("hex");
}

export class Block {
    timestamp: string;
    data: any;
    hash: string;
    prevHash: string;
    nonce: number;

    constructor(timestamp: string = "", data: any = []) {
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = "";
        this.hash = this.getHash();
        this.nonce = 0;       
    }

    getHash(): string {
        return SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce);
    }

    mine(difficulty: number): void {
        while(!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
            this.nonce++;
            this.hash= this.getHash();
        }
    }
}

export class Blockchain {
    chain: Block[];
    difficulty: number;
    blockTime: number;

    constructor() {
        this.chain = [new Block(Date.now().toString())];
        this.difficulty = 1;
        this.blockTime = 30000;
    }

    getLastBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    addBlock(block: Block): void {
        block.prevHash = this.getLastBlock().hash;
        block.hash = block.getHash();
        block.mine(this.difficulty);

        this.chain.push(Object.freeze(block));

        this.difficulty += Date.now() - parseInt(this.getLastBlock().timestamp) < this.blockTime ? 1 : -1;
    }

    isValid(blockchain: Blockchain = this): boolean {
        for (let i = 1; i < blockchain.chain.length; i++) {
            const currentBlock = blockchain.chain[i];
            const prevBlock = blockchain.chain[i - 1];

            if (currentBlock.hash !== currentBlock.getHash() || prevBlock.hash !== currentBlock.prevHash) {
                return false;
            }
        }

        return true;
    }
}