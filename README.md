# Requirement 
- NodeJS v8.9.4 or later
- Windows, Linux or Mac OS X

# Installation
## Install Ganache or Geth
### Ganache

Ganache is the local Ethereum blockchain.
It has many useful functions in developing Smart-Contract, such as creating an Ethereum account as soon as it starting and resetting the chain with one button, etc.

Install from the link below  
<https://www.trufflesuite.com/ganache>

### Geth
Geth is a CUI client implemented by the programming language Go, which joins the Ethereum network as a full node by installing Geth,
- mining ether
- ether transfer
- Generate smart contract
- Generate transaction
- Check blockchain

Such operations are possible.

#### For Ubuntu
```
$ sudo add-apt-repository -y ppa:ethereum/ethereum
$ sudo apt-get update
$ sudo apt-get install ethereum
```

#### For Mac OS
```
$ brew tap ethereum/ethereum
$ brew install ethereum
```
 
## Install Truffle
Truffle (<https://www.trufflesuite.com/>) is the framework of "Solidity" which is the programming language for Smart-Contract.

```
$ npm install -g truffle
```

# Usage
1. Startup the Ganache or the Geth client  
If using the Geth, run the mining with bellow command.
```
> miner.start()
```
2. Deplpy the Smart-Contract
```
$ truffle compile
$ truffle migration
```
3. Monitor Smart-Contract on object side.
```
$ node src/js/watching.js
```
4. Create new action  
```
$ node src/js/createAction.js
```
5. Delegate new action  
```
$ node src/js/delegateAction.js
```
6. Send access request
```
$ node src/js/sendRequest.js
```