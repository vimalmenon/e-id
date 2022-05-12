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
    address[] public addresses;


    constructor(string memory _companyName, uint256 _stakeAmount, address _registeredAddress) public {
        companyName = _companyName;
        stakeAmount = _stakeAmount;
        addresses = [_registeredAddress];
    }
    function recruitEmployee (Employee employee, string memory position) public {
        employee.join(address(this), position);
        employeeCount+=1;
    }
    function releaseEmployee (Employee employee) public {
        employee.leave(address(this));
        employeeCount-=1;
    }
    function getName() public view returns (string memory) {
        return companyName;
    }
}

contract HiringApplication {
    address[] public list;
    mapping(address => Employer) public employers;

    function registerEmployer (string memory companyName) public payable returns (Employer) {
        Employer employer = new Employer(companyName, msg.value, msg.sender);
        employers[address(employer)] = employer;
        list.push(address(employer));
        return employer;
    }
    function getEmployerDetails (address _empoyerAddress) public view returns (string memory) {
        return employers[_empoyerAddress].getName();
    }
}