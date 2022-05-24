//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Employee.sol";
import "./Employer.sol";

contract Data {
    Employer[] private employerList;
    Employee[] private employeeList;
    mapping(address => Employer) private employers;
    mapping(address => Employee) private employees;
}
