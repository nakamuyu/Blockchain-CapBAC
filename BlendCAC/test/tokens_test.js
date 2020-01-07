const Tokens = artifacts.require("Tokens");

contract('TokensTest', function(accounts) {
  it("should assert true", function(done) {
    var tokens_test = Tokens.deployed();
    assert.isTrue(true);
    done();
  });

////////////////////////////////////////////////////////////////
  it("test createOp", function(){
    return Tokens.deployed()
    .then(function(instance){
      tokens = instance;
      console.log("●create 'read' from addressA");
      return tokens.createOp.sendTransaction("read", {from: accounts[0]});
    }).then(function(){
      return tokens.getIcap.call(accounts[0], {from: accounts[0]});
    }).then(function(Icap){
      console.log("Icap[addressA]");
      console.log(Icap);
      console.log("--------------------------------");
      return tokens.getIDC.call(accounts[0], {from: accounts[0]});
    }).then(function(IDC){
      console.log("IDC[addressA]");
      console.log(IDC);
      console.log();
      console.log("////////////////////////////////////////");
      console.log("////////////////////////////////////////");
    })

    .then(function(){
      console.log("●create 'exe' from addressA");
      return tokens.createOp.sendTransaction("exe", {from: accounts[0]});
    }).then(function(){
      return tokens.getIcap.call(accounts[0], {from: accounts[0]});
    }).then(function(Icap){
      console.log("Icap[addressA]");
      console.log(Icap);
      console.log("--------------------------------");
      return tokens.getIDC.call(accounts[0], {from: accounts[0]});
    }).then(function(IDC){
      console.log("IDC[addressA]");
      console.log(IDC);
      console.log();
      console.log("////////////////////////////////////////");
      console.log("////////////////////////////////////////");
    })

    .then(function(){
      console.log("●create 'read' from addressB (not IoT ownner)");
      return tokens.createOp.sendTransaction("read", {from: accounts[1]});
    }).catch(function(error){
      console.log(error);
      console.log();
      console.log("////////////////////////////////////////");
      console.log("////////////////////////////////////////");
    })

    .then(function(){
      console.log("●create 'read' from addressA again");
      return tokens.createOp.sendTransaction("read", {from: accounts[0]});
    }).catch(function(error){
      console.log(error);
      console.log();
      console.log("////////////////////////////////////////");
      console.log("////////////////////////////////////////");
    });
  });

////////////////////////////////////////////////////////////////
  // it("test delegateTokens", function(){
  //   return Tokens.deployed()
  //   .then(function(instance){
  //     tokens = instance;
  //
  //     console.log("●create 'read' from addressA");
  //     return tokens.createOp.sendTransaction("read", {from: accounts[0]});
  //   }).then(function(){
  //     return tokens.getIcap.call(accounts[0], {from: accounts[0]});
  //   }).then(function(Icap){
  //     console.log("Icap[addressA]");
  //     console.log(Icap);
  //     console.log("--------------------------------");
  //     return tokens.getIDC.call(accounts[0], {from: accounts[0]});
  //   }).then(function(IDC){
  //     console.log("IDC[addressA]");
  //     console.log(IDC);
  //     console.log();
  //     console.log("////////////////////////////////////////");
  //     return tokens.getIcap.call(accounts[1], {from: accounts[0]});
  //   }).then(function(Icap){
  //     console.log("Icap[addressB]");
  //     console.log(Icap);
  //     console.log("--------------------------------");
  //     return tokens.getIDC.call(accounts[1], {from: accounts[0]});
  //   }).then(function(IDC){
  //     console.log("IDC[addressB]");
  //     console.log(IDC);
  //     console.log();
  //     console.log("////////////////////////////////////////");
  //     return tokens.getIcap.call(accounts[2], {from: accounts[0]});
  //   }).then(function(Icap){
  //     console.log("Icap[addressC]");
  //     console.log(Icap);
  //     console.log("--------------------------------");
  //     return tokens.getIDC.call(accounts[2], {from: accounts[0]});
  //   }).then(function(IDC){
  //     console.log("IDC[addressC]");
  //     console.log(IDC);
  //     console.log();
  //     console.log("////////////////////////////////////////");
  //     console.log("////////////////////////////////////////");
  //   })
  //
  //   .then(function(){
  //     console.log("●delegate 'read' from addressA to adddressB");
  //     return tokens.delegateTokens.sendTransaction(accounts[1], "read", {from: accounts[0]});
  //   }).then(function(){
  //     return tokens.getIcap.call(accounts[0], {from: accounts[0]});
  //   }).then(function(Icap){
  //     console.log("Icap[addressA]");
  //     console.log(Icap);
  //     console.log("--------------------------------");
  //     return tokens.getIDC.call(accounts[0], {from: accounts[0]});
  //   }).then(function(IDC){
  //     console.log("IDC[addressA]");
  //     console.log(IDC);
  //     console.log();
  //     console.log("////////////////////////////////////////");
  //     return tokens.getIcap.call(accounts[1], {from: accounts[0]});
  //   }).then(function(Icap){
  //     console.log("Icap[addressB]");
  //     console.log(Icap);
  //     console.log("--------------------------------");
  //     return tokens.getIDC.call(accounts[1], {from: accounts[0]});
  //   }).then(function(IDC){
  //     console.log("IDC[addressB]");
  //     console.log(IDC);
  //     console.log();
  //     console.log("////////////////////////////////////////");
  //     return tokens.getIcap.call(accounts[2], {from: accounts[0]});
  //   }).then(function(Icap){
  //     console.log("Icap[addressC]");
  //     console.log(Icap);
  //     console.log("--------------------------------");
  //     return tokens.getIDC.call(accounts[2], {from: accounts[0]});
  //   }).then(function(IDC){
  //     console.log("IDC[addressC]");
  //     console.log(IDC);
  //     console.log();
  //     console.log("////////////////////////////////////////");
  //     console.log("////////////////////////////////////////");
  //   })
  //
  //   .then(function(){
  //     console.log("●delegate 'read' from addressB to adddressC");
  //     return tokens.delegateTokens.sendTransaction(accounts[2], "read", {from: accounts[1]});
  //   }).then(function(){
  //     return tokens.getIcap.call(accounts[0], {from: accounts[0]});
  //   }).then(function(Icap){
  //     console.log("Icap[addressA]");
  //     console.log(Icap);
  //     console.log("--------------------------------");
  //     return tokens.getIDC.call(accounts[0], {from: accounts[0]});
  //   }).then(function(IDC){
  //     console.log("IDC[addressA]");
  //     console.log(IDC);
  //     console.log();
  //     console.log("////////////////////////////////////////");
  //     return tokens.getIcap.call(accounts[1], {from: accounts[0]});
  //   }).then(function(Icap){
  //     console.log("Icap[addressB]");
  //     console.log(Icap);
  //     console.log("--------------------------------");
  //     return tokens.getIDC.call(accounts[1], {from: accounts[0]});
  //   }).then(function(IDC){
  //     console.log("IDC[addressB]");
  //     console.log(IDC);
  //     console.log();
  //     console.log("////////////////////////////////////////");
  //     return tokens.getIcap.call(accounts[2], {from: accounts[0]});
  //   }).then(function(Icap){
  //     console.log("Icap[addressC]");
  //     console.log(Icap);
  //     console.log("--------------------------------");
  //     return tokens.getIDC.call(accounts[2], {from: accounts[0]});
  //   }).then(function(IDC){
  //     console.log("IDC[addressC]");
  //     console.log(IDC);
  //     console.log();
  //     console.log("////////////////////////////////////////");
  //     console.log("////////////////////////////////////////");
  //   });
  // });

////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
  // it("test revokeTokens", function(){
  //   return Tokens.deployed()
  //   .then(function(instance){
  //     tokens = instance;
  //
  //     console.log("●create 'read' from addressA");
  //     return tokens.createOp.sendTransaction("read", {from: accounts[0]});
  //   }).then(function(){
  //     console.log("●delegate 'read' from addressA to adddressB");
  //     return tokens.delegateTokens.sendTransaction(accounts[1], "read", {from: accounts[0]});
  //   }).then(function(){
  //     console.log("●delegate 'read' from addressB to adddressC");
  //     return tokens.delegateTokens.sendTransaction(accounts[2], "read", {from: accounts[1]});
  //   }).then(function(){
  //     return tokens.getIcap.call(accounts[0], {from: accounts[0]});
  //   }).then(function(Icap){
  //     console.log("Icap[addressA]");
  //     console.log(Icap);
  //     console.log("--------------------------------");
  //     return tokens.getIDC.call(accounts[0], {from: accounts[0]});
  //   }).then(function(IDC){
  //     console.log("IDC[addressA]");
  //     console.log(IDC);
  //     console.log();
  //     console.log("////////////////////////////////////////");
  //     return tokens.getIcap.call(accounts[1], {from: accounts[0]});
  //   }).then(function(Icap){
  //     console.log("Icap[addressB]");
  //     console.log(Icap);
  //     console.log("--------------------------------");
  //     return tokens.getIDC.call(accounts[1], {from: accounts[0]});
  //   }).then(function(IDC){
  //     console.log("IDC[addressB]");
  //     console.log(IDC);
  //     console.log();
  //     console.log("////////////////////////////////////////");
  //     return tokens.getIcap.call(accounts[2], {from: accounts[0]});
  //   }).then(function(Icap){
  //     console.log("Icap[addressC]");
  //     console.log(Icap);
  //     console.log("--------------------------------");
  //     return tokens.getIDC.call(accounts[2], {from: accounts[0]});
  //   }).then(function(IDC){
  //     console.log("IDC[addressC]");
  //     console.log(IDC);
  //     console.log();
  //     console.log("////////////////////////////////////////");
  //     console.log("////////////////////////////////////////");
  //   })
  //
  //   .then(function(){
  //     console.log("●revoke Token from addressB");
  //     return tokens.revokeTokens.sendTransaction(accounts[1], {from: accounts[0]});
  //   }).then(function(){
  //     return tokens.getIcap.call(accounts[0], {from: accounts[0]});
  //   }).then(function(Icap){
  //     console.log("Icap[addressA]");
  //     console.log(Icap);
  //     console.log("--------------------------------");
  //     return tokens.getIDC.call(accounts[0], {from: accounts[0]});
  //   }).then(function(IDC){
  //     console.log("IDC[addressA]");
  //     console.log(IDC);
  //     console.log();
  //     console.log("////////////////////////////////////////");
  //     return tokens.getIcap.call(accounts[1], {from: accounts[0]});
  //   }).then(function(Icap){
  //     console.log("Icap[addressB]");
  //     console.log(Icap);
  //     console.log("--------------------------------");
  //     return tokens.getIDC.call(accounts[1], {from: accounts[0]});
  //   }).then(function(IDC){
  //     console.log("IDC[addressB]");
  //     console.log(IDC);
  //     console.log();
  //     console.log("////////////////////////////////////////");
  //     return tokens.getIcap.call(accounts[2], {from: accounts[0]});
  //   }).then(function(Icap){
  //     console.log("Icap[addressC]");
  //     console.log(Icap);
  //     console.log("--------------------------------");
  //     return tokens.getIDC.call(accounts[2], {from: accounts[0]});
  //   }).then(function(IDC){
  //     console.log("IDC[addressC]");
  //     console.log(IDC);
  //     console.log();
  //     console.log("////////////////////////////////////////");
  //     console.log("////////////////////////////////////////");
  //   });
  // });
});
