// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract BookPortal {
    uint256 totalBooks;

    uint256 private seed;
    
    event NewBook(address indexed from, uint256 timestamp, string message);

    struct Book {
        address contributor;
        string message;
        uint256 timestamp;
    }

    Book[] books;

    // address and timestamp mapping for tracking last access of the address
    mapping(address => uint256) public lastSuggestedAt;

    constructor() payable {
        console.log("hey, im a contract");

        seed = (block.timestamp + block.difficulty) % 100;
    }

    function addBook(string memory _message) public {
        require(
            lastSuggestedAt[msg.sender] + 30 seconds < block.timestamp,
            "Must wait 30 secs before another suggestion"
        );

        lastSuggestedAt[msg.sender] = block.timestamp;

        totalBooks += 1;
        console.log("%s has added a new book %s!", msg.sender, _message);

        books.push(Book(msg.sender, _message, block.timestamp));

        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated : %d", seed);

        emit NewBook(msg.sender, block.timestamp, _message);

        if(seed <= 50) {
            console.log("%s won", msg.sender);
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }
    }

    function getAllBooks() public view returns (Book[] memory) {
        return books;
    }

    function getTotalBooks() public view returns (uint256) {
        console.log("We have %d total books", totalBooks);
        return totalBooks;
    }
}