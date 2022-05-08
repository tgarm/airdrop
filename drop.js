const ethers = require('ethers')

const minAmount = ethers.utils.parseEther('0.01')

const chain = {}

function init(rpcUrl, walletKey){
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
    chain.provider = provider
    const wallet = new ethers.Wallet(walletKey, provider)
    chain.signer = wallet
    return wallet.address
}

async function dropTo(addr){
    const ubalance = await chain.provider.getBalance(addr)
    if(ubalance.gte(minAmount)) return "balance"
    const fund = await chain.provider.getBalance(chain.signer.address)
    if(fund.lte(minAmount)) return "fund"
    const tx = {
        to: addr,
        value: minAmount
    }
    const receipt = await chain.signer.sendTransaction(tx)
    return { txid: receipt.hash }
}

function address(addr){
    if(ethers.utils.isAddress(addr)){
       addr = ethers.utils.getAddress(addr)
       return addr
    }
    return false
}

exports.init = init
exports.to = dropTo
exports.address = address
