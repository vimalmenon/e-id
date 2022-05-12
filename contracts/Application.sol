//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Employee {
    struct EmployeeEmployer {
        address employer;
        string position;
        uint256 startDate;
        uint256 endDate;
        bool isHirable;
    }
    EmployeeEmployer[] public employees;

    modifier hasEmployee {
        require(employees.length > 0, "Employee has no employer");
        _;
    }    
    function join(address employeeAddress, string memory position) public {
        if (employees.length == 0) {
            employees.push(EmployeeEmployer({employer:employeeAddress, startDate:block.timestamp, endDate:0, isHirable: false, position:position})); 
            return;
        }
        require(employees[employees.length-1].isHirable == true, "Employee cannot be hired");
        employees.push(EmployeeEmployer({employer:employeeAddress, startDate:block.timestamp, endDate:0, isHirable: false, position:position}));
    }
    
    function leave (address employeeAddress) public hasEmployee {
        require(employees[employees.length-1].employer == employeeAddress, "Employee was not employed with that employer");
        employees[employees.length-1].endDate = block.timestamp;
    }
}
contract Employer {
    string private companyName;
    uint256 private employeeCount;
    uint256 private verifiedCount;
    uint256 private stakeAmount;


    constructor(string memory _companyName, uint256 _stakeAmount) public {
        companyName = _companyName;
        stakeAmount = _stakeAmount;
    }
    function recruitEmployee (Employee employee, string memory position) public {
        employeeCount+=1;
        employee.join(address(this), position);
    }
    function releaseEmployee (Employee employee) public {
        employeeCount-=1;
        employee.leave(address(this));
    }
}

contract HiringApplication {

    mapping(address => Employer) private employers;

    function registerEmployer (string memory companyName) public payable {
        employers[msg.sender] = new Employer(companyName, msg.value);
    }
    function registerEmployee () public {

    }
}