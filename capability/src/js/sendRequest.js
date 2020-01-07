// 必要なパッケージをインポート
const fs = require("fs");
const Web3 = require('web3');

// web3の初期化
web3 = new Web3();
// プライベートネットワークと接続
if (!web3.currentProvider) {
    web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
}

//simplestorageのABI
// var contract = require('../../build/contracts/ObjectCaps.json', 'utf8');
var ABI = [
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "action",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "permission",
        "type": "bool"
      }
    ],
    "name": "AccessRequest",
    "type": "event",
    "signature": "0x5cf708c60ca8732e826008dfe94baf442473f2af405faded1345a344507f7b1c"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_action",
        "type": "string"
      },
      {
        "name": "_maxDepth",
        "type": "uint256"
      }
    ],
    "name": "createAction",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x60ce3260"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "delegatee",
        "type": "address"
      },
      {
        "name": "_action",
        "type": "string"
      },
      {
        "name": "_delegationRight",
        "type": "bool"
      },
      {
        "name": "_revocationRight",
        "type": "bool"
      }
    ],
    "name": "delegation",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x7e320878"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_revocatedAddress",
        "type": "address"
      },
      {
        "name": "_action",
        "type": "string"
      }
    ],
    "name": "singleRevocation",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x9ce9c3d3"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_revocatedAddress",
        "type": "address"
      },
      {
        "name": "_action",
        "type": "string"
      }
    ],
    "name": "allChildrenRevocation",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xc4a8a3b2"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_target",
        "type": "address"
      },
      {
        "name": "_action",
        "type": "string"
      }
    ],
    "name": "getCap",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      },
      {
        "name": "",
        "type": "bool"
      },
      {
        "name": "",
        "type": "bool"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x14277adb"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_action",
        "type": "string"
      }
    ],
    "name": "accessRequest",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x250654e3"
  }
];
// console.log(ABI);
var address = "0x6961Fd473201036681392CC70a192E2Bb94376a3";
// console.log(address);
var capability = web3.eth.contract(ABI).at(address);
// console.log(smartKey);
capability.accessRequest.sendTransaction("read", {from: web3.eth.accounts[0]});
