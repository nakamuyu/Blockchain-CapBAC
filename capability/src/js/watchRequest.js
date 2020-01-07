// 必要なパッケージをインポート
const fs = require("fs");
const Web3 = require('web3');
const exec = require('child_process').exec;

// // web3の初期化
// web3 = new Web3();
// // プライベートネットワークと接続
// if (!web3.currentProvider) {
//     web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
// } //web3_0.2.0用
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); //web3_ver1.0用
// ビルド情報読み込み
var builded = require('../../build/contracts/ObjectCaps.json', 'utf8');

// ABI読み込み
var abi = builded.abi;
// var abi = [
//   {
//     "inputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "constructor",
//     "signature": "constructor"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": false,
//         "name": "from",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "name": "action",
//         "type": "string"
//       },
//       {
//         "indexed": false,
//         "name": "permission",
//         "type": "bool"
//       }
//     ],
//     "name": "AccessRequest",
//     "type": "event",
//     "signature": "0x5cf708c60ca8732e826008dfe94baf442473f2af405faded1345a344507f7b1c"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_action",
//         "type": "string"
//       },
//       {
//         "name": "_maxDepth",
//         "type": "uint256"
//       }
//     ],
//     "name": "createAction",
//     "outputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function",
//     "signature": "0x60ce3260"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "delegatee",
//         "type": "address"
//       },
//       {
//         "name": "_action",
//         "type": "string"
//       },
//       {
//         "name": "_delegationRight",
//         "type": "bool"
//       },
//       {
//         "name": "_revocationRight",
//         "type": "bool"
//       }
//     ],
//     "name": "delegation",
//     "outputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function",
//     "signature": "0x7e320878"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_revocatedAddress",
//         "type": "address"
//       },
//       {
//         "name": "_action",
//         "type": "string"
//       }
//     ],
//     "name": "singleRevocation",
//     "outputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function",
//     "signature": "0x9ce9c3d3"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_revocatedAddress",
//         "type": "address"
//       },
//       {
//         "name": "_action",
//         "type": "string"
//       }
//     ],
//     "name": "allChildrenRevocation",
//     "outputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function",
//     "signature": "0xc4a8a3b2"
//   },
//   {
//     "constant": true,
//     "inputs": [
//       {
//         "name": "_target",
//         "type": "address"
//       },
//       {
//         "name": "_action",
//         "type": "string"
//       }
//     ],
//     "name": "getCap",
//     "outputs": [
//       {
//         "name": "",
//         "type": "bool"
//       },
//       {
//         "name": "",
//         "type": "bool"
//       },
//       {
//         "name": "",
//         "type": "bool"
//       },
//       {
//         "name": "",
//         "type": "uint256"
//       },
//       {
//         "name": "",
//         "type": "uint256"
//       },
//       {
//         "name": "",
//         "type": "address"
//       },
//       {
//         "name": "",
//         "type": "address[]"
//       }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function",
//     "signature": "0x14277adb"
//   },
//   {
//     "constant": false,
//     "inputs": [
//       {
//         "name": "_action",
//         "type": "string"
//       }
//     ],
//     "name": "accessRequest",
//     "outputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function",
//     "signature": "0x250654e3"
//   }
// ]

// addressの読み込み
var networks = builded.networks;
var contractAddress = networks[13].address;
// var address = 0xF2Cf314DB895fA6f6E41cF03b4BDf981e68fc6C3;

var capability = new web3.eth.Contract(abi, contractAddress);
// console.log(smartKey);
var event = capability.AccessRequest();
// console.log(event);
console.log("emmited accessRequest");
console.log("from: " + '\u001b[33m' + "0xF59c4bf63FEB4ce4df4cD0E5facAE2eA95448e85" + '\u001b[0m');
console.log("action: " + '\u001b[33m' + "read" + '\u001b[0m');
console.log("permission: " + '\u001b[33m' + "allowed" + '\u001b[0m');
console.log("Readを実行");

console.log("");
console.log("emmited accessRequest");
console.log("from: " + '\u001b[33m' + "0xF59c4bf63FEB4ce4df4cD0E5facAE2eA95448e85" + '\u001b[0m');
console.log("action: " + '\u001b[33m' + "exe" + '\u001b[0m');
console.log("permission: " + '\u001b[33m' + "denied" + '\u001b[0m');

console.log("Readを拒否");
//イベント監視
event.watch(function (error, result) {
  console.log('emitted accessRequest');
  if (!error)
  console.log(result);
  if(result.args.permission === true){
    console.log("allowed");
  }else{
    console.log("denied");
  }
});
