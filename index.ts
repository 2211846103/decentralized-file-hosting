import express from "express";
import { Block, Blockchain } from "./src/blockchain.js";

const app = express();
app.get("/", (req, res) => {
    res.send("Bonjour");
});
app.get("/create-blockchain", (req, res) => {
    const chain: Blockchain = new Blockchain();
    for (let i = 0; i < 10; i++) {
        chain.addBlock(new Block(Date.now().toString(), {
            from: "Mohamed",
            to: "Ibrahim",
            amount: 100
        }));
    }

    res.send(chain.chain);
})
app.listen(8080);