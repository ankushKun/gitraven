// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import {ITablelandTables} from "@tableland/evm/contracts/interfaces/ITablelandTables.sol";

contract gitraven is ERC721Holder {
    ITablelandTables table;
    error throwerror(string);

    uint256 public bountyCount = 0;
    uint256 public solutionCount = 1;
    mapping(address => bool) public registrations;

    string internal regTablePrefix = "registrations";
    uint256 public regTableId;
    string public regTableName;

    string internal bountyTablePrefix = "bounties";
    uint256 public bountyTableId;
    string public bountyTableName;

    string internal solTablePrefix = "solvers";
    uint256 public solTableId;
    string public solTableName;

    constructor() {
        table = TablelandDeployments.get();

        regTableId = table.create(
            address(this),
            SQLHelpers.toCreateFromSchema(
                "addr text, github text",
                regTablePrefix
            )
        );
        regTableName = string.concat(
            regTablePrefix,
            "_",
            Strings.toString(block.chainid),
            "_",
            Strings.toString(regTableId)
        );

        bountyTableId = table.create(
            address(this),
            SQLHelpers.toCreateFromSchema(
                "bid integer primary key, maintainer text, title text, description text, url text, reward int, tags text, solved int",
                bountyTablePrefix
            )
        );
        bountyTableName = string.concat(
            bountyTablePrefix,
            "_",
            Strings.toString(block.chainid),
            "_",
            Strings.toString(bountyTableId)
        );

        solTableId = table.create(
            address(this),
            SQLHelpers.toCreateFromSchema(
                "sid integer primary key, bid int, addr text, url text",
                solTablePrefix
            )
        );
        solTableName = string.concat(
            solTablePrefix,
            "_",
            Strings.toString(block.chainid),
            "_",
            Strings.toString(solTableId)
        );
    }

    function register(string memory githubUsername) public {
        // string memory table = "test_table_11155111_120";
        // sender registered with githubUsername and store in tableland
        table.mutate(
            address(this),
            regTableId,
            SQLHelpers.toInsert(
                regTablePrefix,
                regTableId,
                "addr,github",
                string.concat(
                    SQLHelpers.quote(Strings.toHexString(msg.sender)),
                    ",",
                    SQLHelpers.quote(githubUsername)
                )
            )
        );
        registrations[msg.sender] = true;
    }

    function addPaidBounty(
        string memory title,
        string memory description,
        string memory url,
        string memory tags
    ) public payable {
        require(registrations[msg.sender], "sender is not registered");
        table.mutate(
            address(this),
            bountyTableId,
            SQLHelpers.toInsert(
                bountyTablePrefix,
                bountyTableId,
                "bid,maintainer,title,description,url,reward,tags,solved",
                string.concat(
                    Strings.toString(bountyCount),
                    ",",
                    SQLHelpers.quote(Strings.toHexString(msg.sender)),
                    ",",
                    SQLHelpers.quote(title),
                    ",",
                    SQLHelpers.quote(description),
                    ",",
                    SQLHelpers.quote(url),
                    ",",
                    Strings.toString(msg.value),
                    ",",
                    SQLHelpers.quote(tags),
                    ",",
                    Strings.toString(0)
                )
            )
        );
        bountyCount += 1;
    }

    function addFreeBounty(
        string memory title,
        string memory description,
        string memory url,
        string memory tags
    ) public {
        require(registrations[msg.sender] == true, "sender is not registered");
        table.mutate(
            address(this),
            bountyTableId,
            SQLHelpers.toInsert(
                bountyTablePrefix,
                bountyTableId,
                "bid,maintainer,title,description,url,reward,tags,solved",
                string.concat(
                    Strings.toString(bountyCount),
                    ",",
                    SQLHelpers.quote(Strings.toHexString(msg.sender)),
                    ",",
                    SQLHelpers.quote(title),
                    ",",
                    SQLHelpers.quote(description),
                    ",",
                    SQLHelpers.quote(url),
                    ",",
                    Strings.toString(0),
                    ",",
                    SQLHelpers.quote(tags),
                    ",",
                    Strings.toString(0)
                )
            )
        );
        bountyCount += 1;
    }

    function addSolution(uint256 bountyId, string memory url) public {
        table.mutate(
            address(this),
            solTableId,
            SQLHelpers.toInsert(
                solTablePrefix,
                solTableId,
                "sid,bid,addr,url",
                string.concat(
                    Strings.toString(solutionCount),
                    ",",
                    Strings.toString(bountyId),
                    ",",
                    SQLHelpers.quote(Strings.toHexString(msg.sender)),
                    ",",
                    SQLHelpers.quote(url)
                )
            )
        );
        solutionCount += 1;
    }

    function markAcceptedSolution(uint256 bountyId, uint256 solId) public {
        string memory setters = string.concat(
            "solved=",
            Strings.toString(solId)
        );
        string memory filters = string.concat(
            "maintainer=",
            SQLHelpers.quote(Strings.toHexString(msg.sender)),
            " and bid=",
            Strings.toString(bountyId)
        );
        table.mutate(
            address(this),
            bountyTableId,
            SQLHelpers.toUpdate(
                bountyTablePrefix,
                bountyTableId,
                setters,
                filters
            )
        );
    }
}
