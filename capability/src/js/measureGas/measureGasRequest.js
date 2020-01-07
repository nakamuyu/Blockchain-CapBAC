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


exec('truffle migrate --reset', (err, stdout, stderr) => {
  if (err) { console.log(err); }


  // ビルド情報読み込み
  var builded = require('../../../build/contracts/ObjectCaps.json', 'utf8');

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

  //contractのインスタンス生成
  // const myContract　= web3.eth.contract(abi).at(contractAddress);  //web3_0.2.0用
  const myContract = new web3.eth.Contract(abi, contractAddress);　//web3_1.0.0-beta用
  var accounts;
  //gasPrice定義
  gasPrice = 23000000000; //23gwei

  web3.eth.getAccounts().then(accs => {
    // ブロックチェーン上のアカウント(アドレス)をすべて取得
    accounts = accs;
  })
  .then(function(){
    myContract.methods.createAction("read", 10).send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
    .once('confirmation', (confirmationNumber, receipt) => {
      console.log("created \"read\" capability by addressA");

      myContract.methods.delegation(accounts[1], "read", true, true).send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
      .once('confirmation', (confirmationNumber, receipt) => {
        console.log("delegated \"read\" capability from addressA to addressB");

        myContract.methods.accessRequest("read").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
        .once('confirmation', (confirmationNumber, receipt) => {
          console.log("gas_requestFrom0(read):",receipt.gasUsed);
        });

        myContract.methods.accessRequest("read").send({from: accounts[1], gasPrice: gasPrice, gas: 8000000})
        .once('confirmation', (confirmationNumber, receipt) => {
          console.log("gas_requestFrom1(read):",receipt.gasUsed);
        });

        myContract.methods.accessRequest("exe2").send({from: accounts[1], gasPrice: gasPrice, gas: 8000000})
        .once('confirmation', (confirmationNumber, receipt) => {
          console.log("gas_requestFrom1(exe2):",receipt.gasUsed);
        });

        myContract.methods.accessRequest("read").send({from: accounts[2], gasPrice: gasPrice, gas: 8000000})
        .once('confirmation', (confirmationNumber, receipt) => {
          console.log("gas_requestFrom2(read):",receipt.gasUsed);
        });

      });
    });
  });
});
