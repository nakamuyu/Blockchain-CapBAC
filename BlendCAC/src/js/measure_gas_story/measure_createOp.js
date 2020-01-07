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
  var builded = require('../../../build/contracts/Tokens.json', 'utf8');

  // ABI読み込み
  var abi = builded.abi;

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


// pattern1
  // web3.eth.getAccounts().then(accs => {
  //   // ブロックチェーン上のアカウント(アドレス)をすべて取得
  //   accounts = accs;
  // })
  // .then(function(){
  //   myContract.methods.createOp("").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
  //   .once('confirmation', (confirmationNumber, receipt) => {
  //     // console.log("gas_create'aaaa':",receipt.gasUsed);
  //
  //     myContract.methods.createOp("aaa").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
  //     .once('confirmation', (confirmationNumber, receipt) => {
  //       console.log("gas_create'aaa':",receipt.gasUsed);
  //
  //       myContract.methods.createOp("bbb").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
  //       .once('confirmation', (confirmationNumber, receipt) => {
  //         console.log("gas_create'bbb':",receipt.gasUsed);
  //
  //         myContract.methods.createOp("ccc").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
  //         .once('confirmation', (confirmationNumber, receipt) => {
  //           console.log("gas_create'ccc':",receipt.gasUsed);
  //
  //           myContract.methods.createOp("ddd").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
  //           .once('confirmation', (confirmationNumber, receipt) => {
  //             console.log("gas_create'ddd':",receipt.gasUsed);
  //           })
  //         });
  //       });
  //     });
  //   });
  // });

  // pattern2
    web3.eth.getAccounts().then(accs => {
      // ブロックチェーン上のアカウント(アドレス)をすべて取得
      accounts = accs;
    })
    .then(function(){
      myContract.methods.createOp("read").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
      .once('confirmation', (confirmationNumber, receipt) => {
        console.log("gas_create'read':",receipt.gasUsed);

        myContract.methods.createOp("abcd").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
        .once('confirmation', (confirmationNumber, receipt) => {
          console.log("gas_create'abcd':",receipt.gasUsed);

          myContract.methods.createOp("5678").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
          .once('confirmation', (confirmationNumber, receipt) => {
            console.log("gas_create'bbb':",receipt.gasUsed);

            myContract.methods.createOp("exe2").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
            .once('confirmation', (confirmationNumber, receipt) => {
              console.log("gas_create'exe2':",receipt.gasUsed);
            });
          });
        });
      });
    });
});
