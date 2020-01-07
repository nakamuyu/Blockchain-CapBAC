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

  // pattern1. revocate 1node decrement 0node
  web3.eth.getAccounts().then(accs => {
    // ブロックチェーン上のアカウント(アドレス)をすべて取得
    accounts = accs;
  })
  .then(function(){
    myContract.methods.createAction("read1", 10).send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
    .once('confirmation', (confirmationNumber, receipt) => {

      myContract.methods.delegation(accounts[1], "read1", true, true).send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
      .once('confirmation', (confirmationNumber, receipt) => {

        myContract.methods.allChildrenRevocation(accounts[1], "read1").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
        .once('confirmation', (confirmationNumber, receipt) => {
          console.log("gas_allChildrenRevocationP1:",receipt.gasUsed);
        });
      });
    });
  });

  // pattern2. revocate 1node decrement 1node
  web3.eth.getAccounts().then(accs => {
    // ブロックチェーン上のアカウント(アドレス)をすべて取得
    accounts = accs;
  })
  .then(function(){
    myContract.methods.createAction("read2", 10).send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
    .once('confirmation', (confirmationNumber, receipt) => {

      myContract.methods.delegation(accounts[1], "read2", true, true).send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
      .once('confirmation', (confirmationNumber, receipt) => {

        myContract.methods.delegation(accounts[2], "read2", true, true).send({from: accounts[1], gasPrice: gasPrice, gas: 8000000})
        .once('confirmation', (confirmationNumber, receipt) => {

          myContract.methods.allChildrenRevocation(accounts[1], "read2").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
          .once('confirmation', (confirmationNumber, receipt) => {
            console.log("gas_allChildrenRevocationP2:",receipt.gasUsed);
          });
        });
      });
    });
  });

  // pattern3. revocate 1node decrement 2node
  web3.eth.getAccounts().then(accs => {
    // ブロックチェーン上のアカウント(アドレス)をすべて取得
    accounts = accs;
  })
  .then(function(){
    myContract.methods.createAction("read3", 10).send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
    .once('confirmation', (confirmationNumber, receipt) => {

      myContract.methods.delegation(accounts[1], "read3", true, true).send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
      .once('confirmation', (confirmationNumber, receipt) => {

        myContract.methods.delegation(accounts[2], "read3", true, true).send({from: accounts[1], gasPrice: gasPrice, gas: 8000000})
        .once('confirmation', (confirmationNumber, receipt) => {

          myContract.methods.delegation(accounts[3], "read3", true, true).send({from: accounts[2], gasPrice: gasPrice, gas: 8000000})
          .once('confirmation', (confirmationNumber, receipt) => {

          myContract.methods.allChildrenRevocation(accounts[1], "read3").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
          .once('confirmation', (confirmationNumber, receipt) => {
            console.log("gas_allChildrenRevocationP3:",receipt.gasUsed);
          });
          });
        });
      });
    });
  });

  // pattern3a. revocate 1node decrement 2node
  web3.eth.getAccounts().then(accs => {
    // ブロックチェーン上のアカウント(アドレス)をすべて取得
    accounts = accs;
  })
  .then(function(){
    myContract.methods.createAction("red3a", 10).send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
    .once('confirmation', (confirmationNumber, receipt) => {

      myContract.methods.delegation(accounts[1], "red3a", true, true).send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
      .once('confirmation', (confirmationNumber, receipt) => {

        myContract.methods.delegation(accounts[2], "red3a", true, true).send({from: accounts[1], gasPrice: gasPrice, gas: 8000000})
        .once('confirmation', (confirmationNumber, receipt) => {

          myContract.methods.delegation(accounts[3], "red3a", true, true).send({from: accounts[1], gasPrice: gasPrice, gas: 8000000})
          .once('confirmation', (confirmationNumber, receipt) => {

          myContract.methods.allChildrenRevocation(accounts[1], "red3a").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
          .once('confirmation', (confirmationNumber, receipt) => {
            console.log("gas_allChildrenRevocationP3a:",receipt.gasUsed);
          });
          });
        });
      });
    });
  });

  // // pattern4. revocate 1node decrement 3node
  web3.eth.getAccounts().then(accs => {
    // ブロックチェーン上のアカウント(アドレス)をすべて取得
    accounts = accs;
  })
  .then(function(){
    myContract.methods.createAction("read4", 10).send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
    .once('confirmation', (confirmationNumber, receipt) => {

      myContract.methods.delegation(accounts[1], "read4", true, true).send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
      .once('confirmation', (confirmationNumber, receipt) => {

        myContract.methods.delegation(accounts[2], "read4", true, true).send({from: accounts[1], gasPrice: gasPrice, gas: 8000000})
        .once('confirmation', (confirmationNumber, receipt) => {

          myContract.methods.delegation(accounts[3], "read4", true, true).send({from: accounts[2], gasPrice: gasPrice, gas: 8000000})
          .once('confirmation', (confirmationNumber, receipt) => {

            myContract.methods.delegation(accounts[4], "read4", true, true).send({from: accounts[3], gasPrice: gasPrice, gas: 8000000})
            .once('confirmation', (confirmationNumber, receipt) => {

              myContract.methods.allChildrenRevocation(accounts[1], "read4").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
              .once('confirmation', (confirmationNumber, receipt) => {
                console.log("gas_allChildrenRevocationP4:",receipt.gasUsed);
              });
            });
          });
        });
      });
    });
  });

  // pattern5. revocate 1node decrement 4node
  web3.eth.getAccounts().then(accs => {
    // ブロックチェーン上のアカウント(アドレス)をすべて取得
    accounts = accs;
  })
  .then(function(){
    myContract.methods.createAction("read5", 10).send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
    .once('confirmation', (confirmationNumber, receipt) => {

      myContract.methods.delegation(accounts[1], "read5", true, true).send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
      .once('confirmation', (confirmationNumber, receipt) => {

        myContract.methods.delegation(accounts[2], "read5", true, true).send({from: accounts[1], gasPrice: gasPrice, gas: 8000000})
        .once('confirmation', (confirmationNumber, receipt) => {

          myContract.methods.delegation(accounts[3], "read5", true, true).send({from: accounts[2], gasPrice: gasPrice, gas: 8000000})
          .once('confirmation', (confirmationNumber, receipt) => {

            myContract.methods.delegation(accounts[4], "read5", true, true).send({from: accounts[3], gasPrice: gasPrice, gas: 8000000})
            .once('confirmation', (confirmationNumber, receipt) => {

              myContract.methods.delegation(accounts[5], "read5", true, true).send({from: accounts[4], gasPrice: gasPrice, gas: 8000000})
              .once('confirmation', (confirmationNumber, receipt) => {

                myContract.methods.allChildrenRevocation(accounts[1], "read5").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
                .once('confirmation', (confirmationNumber, receipt) => {
                  console.log("gas_allChildrenRevocationP5:",receipt.gasUsed);
                });
              });
            });
          });
        });
      });
    });
  });
});
