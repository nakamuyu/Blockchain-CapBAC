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

  web3.eth.getAccounts().then(accs => {
    // ブロックチェーン上のアカウント(アドレス)をすべて取得
    accounts = accs;
  })
  .then(function(){
    myContract.methods.createOp("read").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
    .once('confirmation', (confirmationNumber, receipt) => {

      myContract.methods.delegateTokens(accounts[1], "read").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
      .once('confirmation', (confirmationNumber, receipt) => {
        console.log("gas_delegateFrom0To1:",receipt.gasUsed);

        myContract.methods.delegateTokens(accounts[2], "read").send({from: accounts[1], gasPrice: gasPrice, gas: 8000000})
        .once('confirmation', (confirmationNumber, receipt) => {
          console.log("gas_delegateFrom1To2:",receipt.gasUsed);

          myContract.methods.delegateTokens(accounts[4], "read").send({from: accounts[2], gasPrice: gasPrice, gas: 8000000})
          .once('confirmation', (confirmationNumber, receipt) => {
            console.log("gas_delegateFrom2To3:",receipt.gasUsed);

            myContract.methods.delegateTokens(accounts[6], "read").send({from: accounts[2], gasPrice: gasPrice, gas: 8000000})
            .once('confirmation', (confirmationNumber, receipt) => {
              console.log("gas_delegateFrom2To4:",receipt.gasUsed);

              myContract.methods.delegateTokens(accounts[7], "read").send({from: accounts[2], gasPrice: gasPrice, gas: 8000000})
              .once('confirmation', (confirmationNumber, receipt) => {
                console.log("gas_delegateFrom2To5:",receipt.gasUsed);
              });
            });
          });
        });
      });
    });
  });
});
