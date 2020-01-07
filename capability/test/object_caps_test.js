var Web3 = require('web3');
var web3 = new Web3();
// プライベートネットワークと接続
if (!web3.currentProvider) {
    web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
}

const ObjectCaps = artifacts.require("ObjectCaps");

function printCaps(vidAdd, caps){
  console.log(vidAdd);
  process.stdout.write("right: ")
  console.log(caps[0]);
  process.stdout.write("delegationRight: ")
  console.log(caps[1]);
  process.stdout.write("revocationRight: ")
  console.log(caps[2]);
  process.stdout.write("depth: ")
  console.log(caps[3]);
  process.stdout.write("maxDepth: ")
  console.log(caps[4]);
  process.stdout.write("parent: ")
  console.log(caps[5]);
  console.log("children: ");
  console.log(caps[6]);
  console.log("#######################################################");
};

// function getBalance(address){
//   web3.eth.getBalance(address, (error, balance) => {
//     return balance;
//   });
// }

contract('ObjectCapsTest', function(accounts){

  it("gas muasurement 'createAction'", function(){
    var caps;
    //初期Tree作成
    return ObjectCaps.deployed()
    .then(function(instance){
      caps = instance;
      return caps.createAction.sendTransaction("read", 5, {from: accounts[0]});
    }).then(function(transactionHash){
      console.log(web3.eth.getTransactionReceipt(transactionHash.tx));
      return web3.eth.getBalance(accounts[0]);
    }).then(function(balance){
      console.log("balance: " + balance);
    });
  });

  it("test get balance", async function () {
    let instance = await ObjectCaps.deployed();
    console.log("deployed address:" +  instance);
  });

  // it("No.1: should assert true", function(done) {
  //   var object_caps_test = ObjectCaps.deployed();
  //   assert.isTrue(true);
  //   done();
  // });


  // it("No.2: test 'createAction' called from owner ", function(){
  //   var caps;
  //   return ObjectCaps.deployed()
  //   .then(function(instance){
  //     caps = instance;
  //     caps.createAction.sendTransaction("read", 5, {from: accounts[0]});
  //   })
  //
  //   .then(function(){
  //     return caps.getCap.call(accounts[0], "read", {from: accounts[0]});
  //   }).then(function(cap){
  //     printCaps("Caps[address A][read]", cap);
  //     assert.equal(cap[0], true)        //right
  //     assert.equal(cap[1], true);       //delegationRight
  //     assert.equal(cap[2], true);       //revocationRight
  //     assert.equal(cap[3]["c"][0], 0);  //depth
  //     assert.equal(cap[4]["c"][0], 5);  //maxDepth
  //     assert.equal(cap[5], 0x0000000000000000000000000000000000000000); //parent
  //     // assert.equal(cap[6],[]); //chidren
  //   })
  //
  //   .then(function(){
  //     return caps.getCap.call(accounts[0], "write", {from: accounts[0]});
  //   }).then(function(cap){
  //     printCaps("Caps[address A][write]", cap);
  //     assert.equal(cap[0], false)        //right
  //     assert.equal(cap[1], false);       //delegationRight
  //     assert.equal(cap[2], false);       //revocationRight
  //     assert.equal(cap[3]["c"][0], 0);  //depth
  //     assert.equal(cap[4]["c"][0], 0);  //maxDepth
  //     assert.equal(cap[5], 0x0000000000000000000000000000000000000000); //parent
  //     // assert.equal(cap[6],[]); //chidren
  //   });
  // });


  // it("No.3: test 'createAction' called from not owner ", function(){
  //   var caps;
  //   var err = false;
  //   return ObjectCaps.deployed()
  //   .then(function(instance){
  //     caps = instance;
  //     return caps.createAction.sendTransaction("read", 5, {from: accounts[5]});
  //   }).catch(function(error){
  //     err = true;
  //   }).then(function(){
  //     assert.isTrue(err);
  //   });
  // });
  //
  //
  // it("No.4: test 'delegation'", function(){
  //   var caps;
  //   return ObjectCaps.deployed()
  //   .then(function(instance){
  //     caps = instance;
  //     caps.createAction.sendTransaction("read", 5, {from: accounts[0]});
  //   })
  //   .then(function(){
  //     caps.delegation.sendTransaction(accounts[1], "read", true, false, {from: accounts[0]});
  //   })
  //
  //   .then(function(){
  //     return caps.getCap.call(accounts[0], "read", {from: accounts[0]});
  //   }).then(function(cap){
  //     // console.log("Caps[account[0]][read]");
  //     // console.log(cap);
  //     // console.log("#######################################################");
  //     assert.equal(cap[0], true)        //right
  //     assert.equal(cap[1], true);       //delegationRight
  //     assert.equal(cap[2], true);       //revocationRight
  //     assert.equal(cap[3]["c"][0], 0);  //depth
  //     assert.equal(cap[4]["c"][0], 5);  //maxDepth
  //     assert.equal(cap[5], 0x0000000000000000000000000000000000000000); //parent
  //     // assert.equal(cap[6],[accounts[1]]); //chidren
  //   })
  //
  //   .then(function(){
  //     return caps.getCap.call(accounts[1], "read", {from: accounts[1]});
  //   }).then(function(cap){
  //     // console.log("Caps[account[1]][read]");
  //     // console.log(cap);
  //     // console.log("#######################################################");
  //     assert.equal(cap[0], true)        //right
  //     assert.equal(cap[1], true);       //delegationRight
  //     assert.equal(cap[2], false);       //revocationRight
  //     assert.equal(cap[3]["c"][0], 1);  //depth
  //     assert.equal(cap[4]["c"][0], 5);  //maxDepth
  //     assert.equal(cap[5], accounts[0]); //parent
  //     // assert.equal(cap[6],[]); //chidren
  //   });
  // });
  //
  //
  // it("No.5: test 'singleRevocation'", function(){
  //   var caps;
  //   //初期Tree作成
  //   return ObjectCaps.deployed()
  //   .then(function(instance){
  //     caps = instance;
  //     caps.createAction.sendTransaction("read", 5, {from: accounts[0]});
  //   })
  //   .then(function(){
  //     caps.delegation.sendTransaction(accounts[1], "read", true, true, {from: accounts[0]});
  //   })
  //   .then(function(){
  //     caps.delegation.sendTransaction(accounts[4], "read", true, true, {from: accounts[0]});
  //   })
  //   .then(function(){
  //     caps.delegation.sendTransaction(accounts[2], "read", true, true, {from: accounts[1]});
  //   })
  //   .then(function(){
  //     caps.delegation.sendTransaction(accounts[3], "read", false, false, {from: accounts[1]});
  //   })
  //   .then(function(){
  //     caps.delegation.sendTransaction(accounts[5], "read", false, true, {from: accounts[2]});
  //   })
  //
  //   //初期Tree取得＆表示
  //   .then(function(){
  //     return caps.getCap.call(accounts[0], "read", {from: accounts[0]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[0]][read]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[1], "read", {from: accounts[1]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[1]][read]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[2], "read", {from: accounts[2]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[2]][read]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[3], "read", {from: accounts[3]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[3]][read]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[4], "read", {from: accounts[4]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[4]][read]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[5], "read", {from: accounts[5]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[5]][read]", cap);
  //   })
  //
  //   // revocation accounts[1]
  //   .then(function(){
  //     caps.singleRevocation.sendTransaction(accounts[1], "read", {from: accounts[0]});
  //   })
  //
  //   //singleRevocation後のTree取得＆表示
  //   .then(function(){
  //     console.log("#######################################################");
  //     console.log("#######################################################");
  //     return caps.getCap.call(accounts[0], "read", {from: accounts[0]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[0]][read]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[1], "read", {from: accounts[1]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[1]][read]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[2], "read", {from: accounts[2]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[2]][read]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[3], "read", {from: accounts[3]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[3]][read]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[4], "read", {from: accounts[4]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[4]][read]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[5], "read", {from: accounts[5]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[5]][read]", cap);
  //   });
  // });
  //
  // it("No.6: test 'allChildrenRevocation'", function(){
  //   var caps;
  //   //初期Tree作成
  //   return ObjectCaps.deployed()
  //   .then(function(instance){
  //     caps = instance;
  //     caps.createAction.sendTransaction("read", 5, {from: accounts[0]});
  //   })
  //   .then(function(){
  //     caps.delegation.sendTransaction(accounts[1], "read", true, true, {from: accounts[0]});
  //   })
  //   .then(function(){
  //     caps.delegation.sendTransaction(accounts[4], "read", true, true, {from: accounts[0]});
  //   })
  //   .then(function(){
  //     caps.delegation.sendTransaction(accounts[2], "read", true, true, {from: accounts[1]});
  //   })
  //   .then(function(){
  //     caps.delegation.sendTransaction(accounts[3], "read", false, false, {from: accounts[1]});
  //   })
  //   .then(function(){
  //     caps.delegation.sendTransaction(accounts[5], "read", false, true, {from: accounts[2]});
  //   })
  //
  //   //初期Tree取得＆表示
  //   .then(function(){
  //     return caps.getCap.call(accounts[0], "read", {from: accounts[0]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[0]][read]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[1], "read", {from: accounts[1]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[1]][read]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[2], "read", {from: accounts[2]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[2]][read]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[3], "read", {from: accounts[3]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[3]][read]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[4], "read", {from: accounts[4]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[4]][read]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[5], "read", {from: accounts[5]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[5]][read]", cap);
  //   })
  //
  //   // revocation accounts[1]
  //   .then(function(){
  //     caps.allChildrenRevocation.sendTransaction(accounts[1], "read", {from: accounts[0]});
  //   })
  //
  //   //singleRevocation後のTree取得＆表示
  //   .then(function(){
  //     console.log("#######################################################");
  //     console.log("#######################################################");
  //     return caps.getCap.call(accounts[0], "read", {from: accounts[0]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[0]][read]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[1], "read", {from: accounts[1]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[1]][read]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[2], "read", {from: accounts[2]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[2]][read]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[3], "read", {from: accounts[3]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[3]][read]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[4], "read", {from: accounts[4]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[4]][read]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[5], "read", {from: accounts[5]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[5]][read]", cap);
  //   });
  // });

  // it("No.7: test 'delegation'", function(){
  //   var caps;
  //   //初期Tree作成
  //   return ObjectCaps.deployed()
  //   .then(function(instance){
  //     caps = instance;
  //     caps.createAction.sendTransaction("read", 5, {from: accounts[0]});
  //     caps.createAction.sendTransaction("write", 5, {from: accounts[0]});
  //     caps.createAction.sendTransaction("exe", 5, {from: accounts[0]});
  //   })
  //   .then(function(){
  //     caps.delegation.sendTransaction(accounts[1], "read", true, true, {from: accounts[0]});
  //     caps.delegation.sendTransaction(accounts[1], "write", true, true, {from: accounts[0]});
  //     caps.delegation.sendTransaction(accounts[2], "exe", true, true, {from: accounts[0]});
  //   })
  //   .then(function(){
  //     caps.delegation.sendTransaction(accounts[3], "read", false, false, {from: accounts[1]});
  //   })
  //   //初期Tree取得＆表示
  //   .then(function(){
  //     return caps.getCap.call(accounts[1], "read", {from: accounts[0]});
  //   }).then(function(cap){
  //     console.log("Caps[addressB] before delegation");
  //     printCaps("Caps[addressB][read]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[1], "write", {from: accounts[0]});
  //   }).then(function(cap){
  //     printCaps("Caps[addressB][write]", cap);
  //   })
  //
  //   .then(function(){
  //     return caps.getCap.call(accounts[2], "exe", {from: accounts[0]});
  //   }).then(function(cap){
  //     console.log("Caps[addressC] before delegation");
  //     printCaps("Caps[addressC][exe]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[2], "read", {from: accounts[0]});
  //   }).then(function(cap){
  //     printCaps("Caps[addressC][read]", cap);
  //   })
  //
  //   //delegation;
  //   .then(function(){
  //     caps.delegation.sendTransaction(accounts[2], "read", false, false, {from: accounts[1]});
  //   })
  //
  //   //delegation後のCapability表示
  //   .then(function(){
  //     return caps.getCap.call(accounts[1], "read", {from: accounts[0]});
  //   }).then(function(cap){
  //     console.log("Caps[addressB] after delegation");
  //     printCaps("Caps[addressB][read]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[1], "write", {from: accounts[0]});
  //   }).then(function(cap){
  //     printCaps("Caps[addressB][write]", cap);
  //   })
  //
  //   .then(function(){
  //     return caps.getCap.call(accounts[2], "exe", {from: accounts[0]});
  //   }).then(function(cap){
  //     console.log("Caps[addressC] after delegation");
  //     printCaps("Caps[addressC][exe]", cap);
  //   })
  //   .then(function(){
  //     return caps.getCap.call(accounts[2], "read", {from: accounts[0]});
  //   }).then(function(cap){
  //     printCaps("Caps[addressC][read]", cap);
  //   })
  //
  //   .then(function(){
  //     return caps.getCap.call(accounts[6], "aaaa", {from: accounts[0]});
  //   }).then(function(cap){
  //     printCaps("Caps[account[6]][read]", cap);
  //   });
  // });

  // it("No.7: test 'singleRevocation'", function(){
  //   var caps;
  //   //初期Tree作成
  //   return ObjectCaps.deployed()
  //   .then(function(instance){
  //     caps = instance;
  //     caps.createAction.sendTransaction("read", 5, {from: accounts[0]});
  //   }).then(function(){
  //     caps.delegation.sendTransaction(accounts[1], "read", true, true, {from: accounts[0]});
  //   }).then(function(){
  //     caps.delegation.sendTransaction(accounts[2], "read", true, true, {from: accounts[1]});
  //   })
  //
  //   .then(function(){
  //     return caps.getCap.call(accounts[1], "read", {from: accounts[0]});
  //   }).then(function(cap){
  //     console.log("Caps[addressB] before revocation");
  //     printCaps("Caps[addressB][read]", cap);
  //   }).then(function(){
  //     return caps.getCap.call(accounts[2], "read", {from: accounts[0]});
  //   }).then(function(cap){
  //     console.log("Caps[addressC] before revocation");
  //     printCaps("Caps[addressC][read]", cap);
  //   })
  //
  //   .then(function(){
  //     return caps.singleRevocation.sendTransaction(accounts[1], "read", {from: accounts[0]});
  //   })
  //
  //   .then(function(){
  //     return caps.getCap.call(accounts[1], "read", {from: accounts[0]});
  //   }).then(function(cap){
  //     console.log("Caps[addressB] after revocation");
  //     printCaps("Caps[addressB][read]", cap);
  //   }).then(function(){
  //     return caps.getCap.call(accounts[2], "read", {from: accounts[0]});
  //   }).then(function(cap){
  //     console.log("Caps[addressC] after revocation");
  //     printCaps("Caps[addressC][read]", cap);
  //   })
  // });

  // it("No.8: test 'singleRevocation'", function(){
  //   var caps;
  //   //初期Tree作成
  //   return ObjectCaps.deployed()
  //   .then(function(instance){
  //     caps = instance;
  //     return caps.createAction.sendTransaction("read", 5, {from: accounts[0]});
  //   }).then(function(){
  //     return caps.delegation.sendTransaction(accounts[1], "read", true, true, {from: accounts[0]});
  //   }).then(function(){
  //     return caps.getCap.call(accounts[1], "read", {from: accounts[0]});
  //   }).then(function(cap){
  //     console.log("Caps[addressB] after delegation");
  //     printCaps("Caps[addressB][read]", cap);
  //   })
  //
  //   .then(function(){
  //     return caps.delegation.sendTransaction(accounts[2], "read", true, true, {from: accounts[1]});
  //   })
  //
  //   .then(function(){
  //     return caps.getCap.call(accounts[1], "read", {from: accounts[0]});
  //   }).then(function(cap){
  //     console.log("Caps[addressB] after delegation");
  //     printCaps("Caps[addressB][read]", cap);
  //   }).then(function(){
  //     return caps.getCap.call(accounts[2], "read", {from: accounts[0]});
  //   }).then(function(cap){
  //     console.log("Caps[addressC] before revocation");
  //     printCaps("Caps[addressC][read]", cap);
  //   })
  //
  //   .then(function(){
  //     return caps.allChildrenRevocation.sendTransaction(accounts[1], "read", {from: accounts[0]});
  //   })
  //
  //   .then(function(){
  //     return caps.getCap.call(accounts[1], "read", {from: accounts[0]});
  //   }).then(function(cap){
  //     console.log("Caps[addressB] after revocation");
  //     printCaps("Caps[addressB][read]", cap);
  //   }).then(function(){
  //     return caps.getCap.call(accounts[2], "read", {from: accounts[0]});
  //   }).then(function(cap){
  //     console.log("Caps[addressC] after revocation");
  //     printCaps("Caps[addressC][read]", cap);
  //   })
  // });
});
