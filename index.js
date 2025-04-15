"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var blockchain_1 = require("./src/blockchain");
var app = (0, express_1.default)();
app.get("/", function (req, res) {
    res.send("Bonjour");
});
app.get("/create-blockchain", function (req, res) {
    var chain = new blockchain_1.Blockchain();
    chain.addBlock(new blockchain_1.Block(Date.now().toString(), {
        from: "Mohamed",
        to: "Ibrahim",
        amount: 100
    }));
});
app.listen(8080);
