const express = require("express");
const ejs = require('ejs')

const app = express();

const port = process.env.PORT || 3001;
const rpcUrl = process.env.RPC_URL || "https://rpc-evm-testnet.venidium.io/";

const dist = require('./dist.json')

const drop = require("./drop")

const args = {}

app.use(express.json());

function render(key){
    if(!key||key=='/'){
        key = 'index.html'
    }
    return ejs.render(dist[key], args)
}

for(let key in dist){
    app.get(`/${key}`, function(req,res){
        if(key.endsWith('.json')){
            res.set('Content-Type','application/json')
        }
        res.send(render(key))
    })
}

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

args.addr = drop.init(rpcUrl, process.env.WALLET_KEY)

app.listen(port, () => console.log(`Airdrop listen on port ${port}!`));

