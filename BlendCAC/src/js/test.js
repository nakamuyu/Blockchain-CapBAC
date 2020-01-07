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
var builded = require('../../build/contracts/Tokens.json', 'utf8');

// ABI読み込み
var abi = builded.abi;

// addressの読み込み
var networks = builded.networks;
var contractAddress = networks[13].address;

//contractのインスタンス生成
const myContract = new web3.eth.Contract(abi, contractAddress);　//web3_1.0.0-beta用
////////////////////////////////////////////////////////////////////////////////////
var accounts;
//gasPrice定義
gasPrice = 23000000000; //23gwei

web3.eth.getAccounts().then(accs => {
  // ブロックチェーン上のアカウント(アドレス)をすべて取得
  accounts = accs;
})
.then(function(){
  myContract.methods.generateIcap(accounts[0], accounts[1], ["aaa", "bbb"]).send({from: accounts[0], gas: 8000000})
  .once('confirmation', (confirmationNumber, receipt) => {
    console.log("gas: ", receipt.gasUsed);
    myContract.methods.getIcap(accounts[0]).call({from: accounts[0], gas: 8000000})
    .then((result) => {
      console.log(result);
    });
  });
});
