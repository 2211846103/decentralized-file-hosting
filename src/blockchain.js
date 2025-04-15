"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blockchain = exports.Block = void 0;
var crypto_1 = require("crypto");
function SHA256(message) {
    return (0, crypto_1.createHash)("sha256").update(message).digest("hex");
}
var Block = /** @class */ (function () {
    function Block(timestamp, data) {
        if (timestamp === void 0) { timestamp = ""; }
        if (data === void 0) { data = []; }
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = "";
        this.hash = this.getHash();
        this.nonce = 0;
    }
    Block.prototype.getHash = function () {
        return SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce);
    };
    Block.prototype.mine = function (difficulty) {
        while (!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
            this.nonce++;
            this.hash = this.getHash();
        }
    };
    return Block;
}());
exports.Block = Block;
var Blockchain = /** @class */ (function () {
    function Blockchain() {
        this.chain = [new Block(Date.now().toString())];
        this.difficulty = 1;
    }
    Blockchain.prototype.getLastBlock = function () {
        return this.chain[this.chain.length - 1];
    };
    Blockchain.prototype.addBlock = function (block) {
        block.prevHash = this.getLastBlock().hash;
        block.hash = block.getHash();
        block.mine(this.difficulty);
        this.chain.push(Object.freeze(block));
    };
    Blockchain.prototype.isValid = function (blockchain) {
        if (blockchain === void 0) { blockchain = this; }
        for (var i = 1; i < blockchain.chain.length; i++) {
            var currentBlock = blockchain.chain[i];
            var prevBlock = blockchain.chain[i - 1];
            if (currentBlock.hash !== currentBlock.getHash() || prevBlock.hash !== currentBlock.prevHash) {
                return false;
            }
        }
        return true;
    };
    return Blockchain;
}());
exports.Blockchain = Blockchain;
