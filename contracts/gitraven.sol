// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract eth is ERC721Holder {
    uint256 public reg_Id;
    string private constant reg_PREFIX = "registration";

    uint256 public bounty_Id;
    string private constant bounty_PREFIX = "bounties";

    uint256 public solver_Id;
    string private constant solver_PREFIX = "solver";

    uint256 private _BID = 0;

    mapping(address=>uint[]) public record;

    error throwError(string);

    constructor() {
        reg_Id = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(
                "address text primary key,"
                "github text unique NOT NULL",
                reg_PREFIX
            )
        );

        bounty_Id = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(
                "bid integer primary key,"
                "title text,"
                "maintainer text,"
                "url text,"
                "description text,"
                "reward integer,"
                "tags text,"
                // "Solver text,"
                "solved integer",
                bounty_PREFIX
            )
        );

        solver_Id=TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(
                "bid integer primary key,"
                "solver text,"
                "url text,",
                solver_PREFIX
            )
        );
    }

    function registration(address Address, string memory Github) public {
        TablelandDeployments.get().mutate(
            address(this),
            reg_Id,
            SQLHelpers.toInsert(
                reg_PREFIX,
                reg_Id,
                "address,github",
                string.concat(
                    SQLHelpers.quote(Strings.toHexString(Address)),
                    ",",
                    SQLHelpers.quote(Github)
                )
            )
        );
    }

function bountyFree(string[4] memory _textData) public {
        _BID = _BID + 1;

        record[msg.sender].push(_BID);

        TablelandDeployments.get().mutate(
            address(this),
            bounty_Id,
            SQLHelpers.toInsert(
                bounty_PREFIX,
                bounty_Id,
                "bid,title,maintainer,url,description,reward,tags,solved",
                string.concat(
                    Strings.toString(_BID),
                    ",",
                    SQLHelpers.quote(_textData[0]), // TITLE
                    ",", 
                    SQLHelpers.quote(Strings.toHexString(msg.sender)),
                    ",",
                    SQLHelpers.quote(_textData[2]), // URL
                    ",", 
                    SQLHelpers.quote(_textData[1]), // DESC
                    ",",
                    SQLHelpers.quote(Strings.toHexString(0)),
                    ",",
                    SQLHelpers.quote(_textData[3]), // TAGS
                    // ",", 
                    // SQLHelpers.quote(""),
                    ",",
                    SQLHelpers.quote(Strings.toHexString(0))
                )
            )
        );
    }

    function bounty(string[4] memory _textData) public payable {
        _BID = _BID + 1;

        record[msg.sender].push(_BID);

        TablelandDeployments.get().mutate(
            address(this),
            bounty_Id,
            SQLHelpers.toInsert(
                bounty_PREFIX,
                bounty_Id,
                "bid,title,maintainer,url,description,reward,tags,solved",
                string.concat(
                    Strings.toString(_BID),
                    ",",
                    SQLHelpers.quote(_textData[0]), // TITLE
                    ",", 
                    SQLHelpers.quote(Strings.toHexString(msg.sender)),
                    ",",
                    SQLHelpers.quote(_textData[2]), // URL
                    ",", 
                    SQLHelpers.quote(_textData[1]), // DESC
                    ",",
                    Strings.toString(msg.value),
                    ",",
                    SQLHelpers.quote(_textData[3]), // TAGS
                    // ",", 
                    // SQLHelpers.quote(""),
                    ",",
                    SQLHelpers.quote(Strings.toHexString(0))
                )
            )
        );
    }

function solver(uint _Bid,string memory _URL) public{
TablelandDeployments.get().mutate(
            address(this),
            solver_Id,
            SQLHelpers.toInsert(
                solver_PREFIX,
                solver_Id,
                "bid,solver,url",
                string.concat(
                    Strings.toString(_Bid),
                    ",",
                    SQLHelpers.quote(Strings.toHexString(msg.sender)), // TITLE
                    ",", 
                    SQLHelpers.quote(_URL)              
                )
            )
        );
}

    function solver_update(string memory _URL,uint _Bid) public {
            
        string memory update = string.concat(
    "url=",
    SQLHelpers.quote(_URL) 
  ); 

  string memory from = string.concat(
    "bid=",
    Strings.toString(_Bid) 
  ); 

  TablelandDeployments.get().mutate(
    address(this),
    solver_Id,
    SQLHelpers.toUpdate(
      solver_PREFIX,
      solver_Id,
      update,
      from
    )
  );

    }

    function bounty_update(uint _bid,string[4] memory update) public{
    
    bool access=false;
     for(uint i=0;i<record[msg.sender].length;i++){
        if(record[msg.sender][i]==_bid){
            access=true;
        }
     }
     if(access==false){
        revert throwError("This bounty is not yours");
     }

      TablelandDeployments.get().mutate(
    address(this),
    bounty_Id,
    SQLHelpers.toUpdate(
      bounty_PREFIX,
      bounty_Id,
      string.concat("title=",SQLHelpers.quote(update[0])),
      string.concat("bid=",Strings.toString(_bid))
    ));

    TablelandDeployments.get().mutate(
    address(this),
    bounty_Id,
    SQLHelpers.toUpdate(
      bounty_PREFIX,
      bounty_Id,
      string.concat("url=",SQLHelpers.quote(update[1])),
      string.concat("bid=",Strings.toString(_bid))
    ));

    TablelandDeployments.get().mutate(
    address(this),
    bounty_Id,
    SQLHelpers.toUpdate(
      bounty_PREFIX,
      bounty_Id,
      string.concat("description=",SQLHelpers.quote(update[2])),
      string.concat("bid=",Strings.toString(_bid))
    ));

    TablelandDeployments.get().mutate(
    address(this),
    bounty_Id,
    SQLHelpers.toUpdate(
      bounty_PREFIX,
      bounty_Id,
      string.concat("solved=",SQLHelpers.quote(update[3])),
      string.concat("bid=",Strings.toString(_bid))
    ));

    }
}
