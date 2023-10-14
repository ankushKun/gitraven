// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract contribution{
    //0x0000000000000000000000000000000000000000
    //320000000000000
    struct maintainer{
        address maintainerAddress;
        string githubURL;
        uint reward;
    }

    mapping(address=>uint) public mapMaintainer_id;
    mapping (uint=>maintainer) public maintainer_info;

    // constructor (){
    //     mapMaintainer[msg.sender].maintainerAddress=msg.sender;
    // }

    function setReward(uint _rewardPrice) public payable {
         require(msg.value>0.00032 ether,"Reward should be atleast greater than $0.50");
         
    }

    function repoUpolad(string memory _githubURL) public payable {
        // require(mapMaintainer[msg.sender].maintainerAddress==msg.sender,"You are not repo maintainer");
        require(msg.value>0.00032 ether,"Reward should be atleast greater than $0.50");
        mapMaintainer[msg.sender].reward=msg.value;
        mapMaintainer[msg.sender].githubURL=_githubURL;       
    }
    
} 