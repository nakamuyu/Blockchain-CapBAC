pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Tokens {

  // global variables
  address iotOwner;
  // string[] functions = ["delegateTokens", "revokeTokens"];

  struct Right{
    bool        isValid;
    string[]    op;
    // address   vidO;
  }

  struct Node{
    address     vidP;
    address[]   vidC;
    uint        depth;
    // string[]    dar;
  }

  struct Tree{
    uint        maxDepth;
    Node        rootNode;
  }

  mapping(address => Right) Icap;
  mapping(address => Node)  IDC;
  mapping(address => Tree)  IDT;

  constructor (uint _maxDepth) public{
    iotOwner = msg.sender;

    Icap[msg.sender].isValid = true;
    // Icap[msg.sender].op = [];

    IDC[msg.sender].depth = 0;
    // IDC[msg.sender].dar = functions;

    IDT[msg.sender].maxDepth = _maxDepth;
    IDT[msg.sender].rootNode = IDC[msg.sender];
  }


  function createOp(string memory _op) public {
    require(
      msg.sender == iotOwner,
      "'createOp' was called by not owner"
    );

    // check if the owner already exists the specified operation or not
    for(uint i = 0; i < Icap[msg.sender].op.length; i++){
      require(
        isSameString(Icap[msg.sender].op[i], _op) == false,
        "The specified operation name already exists"
      );
    }

    // add new operation to owner
    Icap[msg.sender].op.push(_op);
  }

  function delegateTokens(address _delegatee, string memory _op) public{
    // check if the msg.sender is parent of the specified elegatee
    require(
      IDC[_delegatee].vidP == msg.sender ||
      IDC[_delegatee].vidP == address(0),
      "'delegateOp' was called by not parent of specified delegatee"
    );

    // ckeck if the delegatee's depth is within maxDepth
    require(
      IDC[msg.sender].depth < IDT[iotOwner].maxDepth,
      "The depth of delegated tokens exceeds maxDepth"
    );

    // check if the msg.sender has the specified operation or not
    bool cheker = false;
    for(uint i = 0; i < Icap[msg.sender].op.length; i++){
      if(isSameString(Icap[msg.sender].op[i], _op) == true){
        cheker = true;
        break;
      }
    }
    require(
      cheker == true,
      "The delegator dont have the specified operation"
    );

    //delegate OP and create Tokens
    Icap[_delegatee].isValid = true;
    Icap[_delegatee].op.push(_op);

    IDC[_delegatee].depth = IDC[msg.sender].depth + 1;

    if(IDC[_delegatee].vidP == 0x0000000000000000000000000000000000000000){
      IDC[_delegatee].vidP = msg.sender;
      IDC[msg.sender].vidC.push(_delegatee);
    }
  }

  function revokeTokens(address _target) public {
    // check if msg.sender is ancestor of target address or not
    require(
      checkParent(msg.sender, _target) == true,
      "msg.sender is not ancestor of target address"
    );

    // 削除対象の親のchildren配列から削除対象アドレスを削除
    address parent = IDC[_target].vidP;
    for(uint i = 0; i < IDC[parent].vidC.length; i++){
      if(IDC[parent].vidC[i] == _target){
        delete IDC[parent].vidC[i];
      }
    }

    childrenRevocation(_target);
  }


  function getIcap(address _subject) public view returns(Right memory){
    return(Icap[_subject]);
  }
  function getIDC(address _subject) public view returns(Node memory){
    return(IDC[_subject]);
  }

  function isSameString(string memory _origin, string memory _target) public pure returns (bool) {
     return keccak256(abi.encodePacked(_origin)) == keccak256(abi.encodePacked(_target));
  }

  function checkParent(address _parent, address _child) private view returns(bool){
    bool checked = false;
    address temp = _child;

    for(uint i = 0; i < IDC[_child].depth+1; i++){
      if(temp == _parent){
        checked = true;
        break;
      }else{
        temp = IDC[temp].vidP;
      }
    }

    return checked;
  }

  function childrenRevocation(address _revokedAddress) private{

    for(uint i = 0; i < IDC[_revokedAddress].vidC.length; i++){
      childrenRevocation(IDC[_revokedAddress].vidC[i]);
    }
    delete Icap[_revokedAddress];
    delete IDC[_revokedAddress];
  }

}
