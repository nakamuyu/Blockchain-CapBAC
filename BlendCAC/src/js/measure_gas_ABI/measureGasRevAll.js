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

  // // pattern1. revocate 1node decrement 0node
  // web3.eth.getAccounts().then(accs => {
  //   // ブロックチェーン上のアカウント(アドレス)をすべて取得
  //   accounts = accs;
  // })
  // .then(function(){
  //   myContract.methods.createOp("read1").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
  //   .once('confirmation', (confirmationNumber, receipt) => {
  //
  //     myContract.methods.delegateTokens(accounts[1], "read1").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
  //     .once('confirmation', (confirmationNumber, receipt) => {
  //
  //       myContract.methods.revokeTokens(accounts[1]).send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
  //       .once('confirmation', (confirmationNumber, receipt) => {
  //         console.log("gas_revokeTokensP1:",receipt.gasUsed);
  //       });
  //     });
  //   });
  // });

  // // pattern2. revocate 1node decrement 1node
  // web3.eth.getAccounts().then(accs => {
  //   // ブロックチェーン上のアカウント(アドレス)をすべて取得
  //   accounts = accs;
  // })
  // .then(function(){
  //   myContract.methods.createOp("read2").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
  //   .once('confirmation', (confirmationNumber, receipt) => {
  //
  //     myContract.methods.delegateTokens(accounts[1], "read2").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
  //     .once('confirmation', (confirmationNumber, receipt) => {
  //
  //       myContract.methods.delegateTokens(accounts[2], "read2").send({from: accounts[1], gasPrice: gasPrice, gas: 8000000})
  //       .once('confirmation', (confirmationNumber, receipt) => {
  //
  //         myContract.methods.revokeTokens(accounts[1]).send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
  //         .once('confirmation', (confirmationNumber, receipt) => {
  //           console.log("gas_revokeTokensP2:",receipt.gasUsed);
  //         });
  //       });
  //     });
  //   });
  // });
  //
  // // pattern3. revocate 1node decrement 2node
  // web3.eth.getAccounts().then(accs => {
  //   // ブロックチェーン上のアカウント(アドレス)をすべて取得
  //   accounts = accs;
  // })
  // .then(function(){
  //   myContract.methods.createOp("read3").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
  //   .once('confirmation', (confirmationNumber, receipt) => {
  //
  //     myContract.methods.delegateTokens(accounts[1], "read3").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
  //     .once('confirmation', (confirmationNumber, receipt) => {
  //
  //       myContract.methods.delegateTokens(accounts[2], "read3").send({from: accounts[1], gasPrice: gasPrice, gas: 8000000})
  //       .once('confirmation', (confirmationNumber, receipt) => {
  //
  //         myContract.methods.delegateTokens(accounts[3], "read3").send({from: accounts[2], gasPrice: gasPrice, gas: 8000000})
  //         .once('confirmation', (confirmationNumber, receipt) => {
  //
  //         myContract.methods.revokeTokens(accounts[1]).send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
  //         .once('confirmation', (confirmationNumber, receipt) => {
  //           console.log("gas_revokeTokensP3:",receipt.gasUsed);
  //         });
  //         });
  //       });
  //     });
  //   });
  // });
  //
  // // pattern3a. revocate 1node decrement 2node
  // web3.eth.getAccounts().then(accs => {
  //   // ブロックチェーン上のアカウント(アドレス)をすべて取得
  //   accounts = accs;
  // })
  // .then(function(){
  //   myContract.methods.createOp("red3a").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
  //   .once('confirmation', (confirmationNumber, receipt) => {
  //
  //     myContract.methods.delegateTokens(accounts[1], "red3a").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
  //     .once('confirmation', (confirmationNumber, receipt) => {
  //
  //       myContract.methods.delegateTokens(accounts[2], "red3a").send({from: accounts[1], gasPrice: gasPrice, gas: 8000000})
  //       .once('confirmation', (confirmationNumber, receipt) => {
  //
  //         myContract.methods.delegateTokens(accounts[3], "red3a").send({from: accounts[1], gasPrice: gasPrice, gas: 8000000})
  //         .once('confirmation', (confirmationNumber, receipt) => {
  //
  //         myContract.methods.revokeTokens(accounts[1]).send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
  //         .once('confirmation', (confirmationNumber, receipt) => {
  //           console.log("gas_revokeTokensP3a:",receipt.gasUsed);
  //         });
  //         });
  //       });
  //     });
  //   });
  // });
  //
  // // // pattern4. revocate 1node decrement 3node
  // web3.eth.getAccounts().then(accs => {
  //   // ブロックチェーン上のアカウント(アドレス)をすべて取得
  //   accounts = accs;
  // })
  // .then(function(){
  //   myContract.methods.createOp("read4").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
  //   .once('confirmation', (confirmationNumber, receipt) => {
  //
  //     myContract.methods.delegateTokens(accounts[1], "read4").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
  //     .once('confirmation', (confirmationNumber, receipt) => {
  //
  //       myContract.methods.delegateTokens(accounts[2], "read4").send({from: accounts[1], gasPrice: gasPrice, gas: 8000000})
  //       .once('confirmation', (confirmationNumber, receipt) => {
  //
  //         myContract.methods.delegateTokens(accounts[3], "read4").send({from: accounts[2], gasPrice: gasPrice, gas: 8000000})
  //         .once('confirmation', (confirmationNumber, receipt) => {
  //
  //           myContract.methods.delegateTokens(accounts[4], "read4").send({from: accounts[3], gasPrice: gasPrice, gas: 8000000})
  //           .once('confirmation', (confirmationNumber, receipt) => {
  //
  //             myContract.methods.revokeTokens(accounts[1]).send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
  //             .once('confirmation', (confirmationNumber, receipt) => {
  //               console.log("gas_revokeTokensP4:",receipt.gasUsed);
  //             });
  //           });
  //         });
  //       });
  //     });
  //   });
  // });
  //
  // pattern5. revocate 1node decrement 4node
  web3.eth.getAccounts().then(accs => {
    // ブロックチェーン上のアカウント(アドレス)をすべて取得
    accounts = accs;
  })
  .then(function(){
    myContract.methods.createOp("read5").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
    .once('confirmation', (confirmationNumber, receipt) => {

      myContract.methods.delegateTokens(accounts[1], "read5").send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
      .once('confirmation', (confirmationNumber, receipt) => {

        myContract.methods.delegateTokens(accounts[2], "read5").send({from: accounts[1], gasPrice: gasPrice, gas: 8000000})
        .once('confirmation', (confirmationNumber, receipt) => {

          myContract.methods.delegateTokens(accounts[3], "read5").send({from: accounts[2], gasPrice: gasPrice, gas: 8000000})
          .once('confirmation', (confirmationNumber, receipt) => {

            myContract.methods.delegateTokens(accounts[4], "read5").send({from: accounts[3], gasPrice: gasPrice, gas: 8000000})
            .once('confirmation', (confirmationNumber, receipt) => {

              myContract.methods.delegateTokens(accounts[5], "read5").send({from: accounts[4], gasPrice: gasPrice, gas: 8000000})
              .once('confirmation', (confirmationNumber, receipt) => {

                myContract.methods.revokeTokens(accounts[1]).send({from: accounts[0], gasPrice: gasPrice, gas: 8000000})
                .once('confirmation', (confirmationNumber, receipt) => {
                  console.log("gas_revokeTokensP5:",receipt.gasUsed);
                });
              });
            });
          });
        });
      });
    });
  });
});
