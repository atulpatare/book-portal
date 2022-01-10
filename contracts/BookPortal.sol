// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract BookPortal {
    uint256 totalBooks;

    constructor() {
        console.log("hey, im a contract");
    }

    function addBook() public {
        totalBooks += 1;
        console.log("%s has added a new book!", msg.sender);
    }

    function getTotalBooks() public view returns (uint256) {
        console.log("We have %d total books", totalBooks);
        return totalBooks;
    }
}