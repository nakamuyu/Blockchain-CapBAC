pragma solidity ^0.5.0;

contract ObjectCaps {

  // global variables
  address owner;
  string[] actions;

  // sturcts
  struct Cap{
    bool right;
    bool delegationRight;
    bool revocationRight;
    uint depth;
    uint maxDepth;
    address parent;
    address[] children;
  }

  // mappings
  mapping(address => mapping(string => Cap)) Caps; //Caps[address]["write"].delegation == "true"

  //events
  event AccessRequest(address from, string action, bool permission);

  //functions
  constructor() public{
    owner = msg.sender;
  }

  function createAction(string memory _action, uint _maxDepth) public{
    require(
      msg.sender == owner,
      "'createAction' was called by a account who is not owner"
    );
    require(
      Caps[owner][_action].right == false,
      "action_name already exists"
    );
    Caps[owner][_action].right = true;
    Caps[owner][_action].delegationRight = true;
    Caps[owner][_action].revocationRight = true;
    Caps[owner][_action].depth = 0;
    Caps[owner][_action].maxDepth = _maxDepth;
    actions.push(_action);
  }

  function delegation(address delegatee, string memory _action, bool _delegationRight, bool _revocationRight) public{
    require(
      Caps[delegatee][_action].right == false,
      "delegatee already have this action right"
    );
    require(
      Caps[msg.sender][_action].delegationRight == true,
      "'delegation' was called by a account who don't have delegationRight "
    );
    if(_revocationRight == true){
      require(
        Caps[msg.sender][_action].revocationRight == true,
        "The message sender doesn't have revocationRight"
      );
    }

    Caps[delegatee][_action].right = true;
    Caps[delegatee][_action].delegationRight = _delegationRight;
    Caps[delegatee][_action].revocationRight = _revocationRight;
    Caps[delegatee][_action].depth = Caps[msg.sender][_action].depth + 1;
    Caps[delegatee][_action].maxDepth = Caps[msg.sender][_action].maxDepth;
    Caps[delegatee][_action].parent = msg.sender;

    Caps[msg.sender][_action].children.push(delegatee);
  }


  function singleRevocation(address _revocatedAddress, string memory _action) public{
    require(
      Caps[msg.sender][_action].revocationRight == true,
      "'singleRevocation' was called by a account who don't have revocationRight"
    );
    require(
      checkParent(msg.sender, _revocatedAddress, _action) == true,
      "'singleRevocation' was called by a account who is not parent"
    ); //削除対象が呼び出し元の子供であるかをチェック

    //「削除対象の親」と「削除対象の子供」をつなぐ
    // address[] memory tempChildren = Caps[_revocatedAddress][_action].children; //削除対象のchildrenを格納
    // address tempParent = Caps[_revocatedAddress][_action].parent; //削除対象のparentを格納
    for(uint i = 0; i < Caps[_revocatedAddress][_action].children.length; i++){
      Caps[Caps[_revocatedAddress][_action].parent][_action].children.push(Caps[_revocatedAddress][_action].children[i]); //parentにchildを追加
      Caps[Caps[_revocatedAddress][_action].children[i]][_action].parent = Caps[_revocatedAddress][_action].parent; //childのparentを更新
    }

    // 削除対象の親のchildren配列から削除対象アドレスを削除
    for(uint j = 0; j < Caps[Caps[_revocatedAddress][_action].parent][_action].children.length; j++){
      if(Caps[Caps[_revocatedAddress][_action].parent][_action].children[j] == _revocatedAddress){
        delete Caps[Caps[_revocatedAddress][_action].parent][_action].children[j];
        break;
      }
    }

    decrementDepth(_revocatedAddress, _action); //削除対象の子供のdepthをデクリメント

    delete Caps[_revocatedAddress][_action]; // 権限削除
  }

  function decrementDepth(address _target, string memory _action) private {
    // address[] memory tempChildren = Caps[_target][_action].children; //decrement対象のchildrenを格納
    for(uint i = 0; i < Caps[_target][_action].children.length; i++){
      decrementDepth(Caps[_target][_action].children[i], _action);
    }
    Caps[_target][_action].depth = Caps[_target][_action].depth - 1;
  }


  function allChildrenRevocation(address _revocatedAddress, string memory _action) public{
    require(
      Caps[msg.sender][_action].revocationRight == true,
      "'allChildrenRevocation' was called by a account who don't have revocationRight"
    );
    require(
      checkParent(msg.sender, _revocatedAddress, _action) == true,
      "'allChildrenRevocation' was called by a account who is not parent"
    ); //削除対象が呼び出し元の子供であるかをチェック

    // 削除対象の親のchildren配列から削除対象アドレスを削除
    // address tempParent = Caps[_revocatedAddress][_action].parent; //削除対象のparentを格納
    for(uint j = 0; j < Caps[Caps[_revocatedAddress][_action].parent][_action].children.length; j++){
      if(Caps[Caps[_revocatedAddress][_action].parent][_action].children[j] == _revocatedAddress){
        delete Caps[Caps[_revocatedAddress][_action].parent][_action].children[j];
        break;
      }
    }

    childrenRevocation(_revocatedAddress, _action);
  }

  function childrenRevocation(address _revocatedAddress, string memory _action) private{
    // address[] memory temp = Caps[_revocatedAddress][_action].children;
    for(uint i = 0; i < Caps[_revocatedAddress][_action].children.length; i++){
      childrenRevocation(Caps[_revocatedAddress][_action].children[i], _action);
    }
    delete Caps[_revocatedAddress][_action];
  }


  function checkParent(address _parent, address _child, string memory _action) private view returns(bool){
    bool checked = false;
    address temp = _child;

    for(uint i = 0; i < Caps[_child][_action].depth+1; i++){
      if(temp == _parent){
        checked = true;
        break;
      }else{
        temp = Caps[temp][_action].parent;
      }
    }

    return checked;
  }

  function getCap(address _target, string memory _action) public view returns (bool, bool, bool, uint, uint, address, address[] memory){
    Cap memory temp = Caps[_target][_action];
    return (temp.right, temp.delegationRight, temp.revocationRight, temp.depth, temp.maxDepth, temp.parent, temp.children);
  }

  function accessRequest(string memory _action) public{
    // bool permission = false;
    // if(Caps[msg.sender][_action].right == true){
    //   permission = true;
    // }
    emit AccessRequest(msg.sender, _action, Caps[msg.sender][_action].right);
  }
}
