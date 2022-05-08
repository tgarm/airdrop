const express = require("express");
const app = express();

const port = process.env.PORT || 3001;
const rpcUrl = process.env.RPC_URL || "https://rpc-evm-testnet.venidium.io/";

const drop = require("./drop")

app.use(express.static('public'))
app.use(express.json());

app.post("/airdrop", async (req, res) => {
    console.log('req', req.body.addr, req.body.chain)
    if(req.body.chain=='0x1336'){
        const addr = drop.address(req.body.addr)
        if(addr){
            const recp = await drop.to(addr)
            if(typeof(recp)=='string'){
                res.send({success:false, reason:recp})
            }else if('txid' in recp){
                res.send({success:true, txid:recp.txid})
            }
        }else{
            res.send({success:false, reason:'address'})
        }
    }else{
        res.send({success:false, reason:'chain'})
    }
})

drop.init(rpcUrl, process.env.WALLET_KEY)

app.listen(port, () => console.log(`Airdrop listen on port ${port}!`));

