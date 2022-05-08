# README

A very simple basic Faucet/Airdrop app for testnet.
Only drop necessary amount (current 0.01) when requester does not have enough balance.

## Deployment

* Compile static files first:
```
node build.js
```

Intended to be deployed and run on render.com

Create a new web service with the following values:
  * Build Command: `yarn`
  * Start Command: `node app.js`


## Environment Variables

* WALLET_KEY
  - Private key for airdrop wallet

