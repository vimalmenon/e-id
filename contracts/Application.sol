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
        require(employees[employees.length-1].employer == employeeAddress, "You are not employed with that address");
        employees[employees.length-1].endDate = block.timestamp;
    }
}
contract Employer {
    

}

contract Application {

}