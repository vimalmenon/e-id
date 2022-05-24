//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./HiringApplication.sol";

contract Testing {
    HiringApplication private app;

    constructor(address _application) {
        app = HiringApplication(_application);
    }

    function getContractDetail() public view returns (ContractDetail memory) {
        return
            ContractDetail({
                employeeCount: 0,
                employerCount: 0,
                contractBalance: address(app).balance,
                contractAddress: address(this)
            });
    }
    function getAddress() public view returns (address) {
        return address(this);
    }
}
