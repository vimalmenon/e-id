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
    string private name;
    bool private isHirable;

    constructor(string memory _name) {
        name = _name;
        isHirable = true;
    }

    modifier hasEmployee() {
        require(employees.length > 0, "Employee has no employer");
        _;
    }

    function join(address employeeAddress, string memory position) public {
        if (employees.length == 0) {
            employees.push(
                EmployeeEmployer({
                    employer: employeeAddress,
                    startDate: block.timestamp,
                    endDate: 0,
                    isHirable: false,
                    position: position
                })
            );
            return;
        }
        require(
            employees[employees.length - 1].isHirable == true,
            "Employee cannot be hired"
        );
        employees.push(
            EmployeeEmployer({
                employer: employeeAddress,
                startDate: block.timestamp,
                endDate: 0,
                isHirable: false,
                position: position
            })
        );
    }

    function leave(address employeeAddress) public hasEmployee {
        require(
            employees[employees.length - 1].employer == employeeAddress,
            "Operation not allowed"
        );
        employees[employees.length - 1].endDate = block.timestamp;
    }
}


contract Employer {
    string private companyName;
    uint256 private employeeCount;
    uint256 private verifiedCount;
    uint256 private stakeAmount;
    address[] private payees;

    constructor(
        string memory _companyName,
        uint256 _stakeAmount,
        address _registeredAddress
    ) {
        companyName = _companyName;
        stakeAmount = _stakeAmount;
        payees = [_registeredAddress];
    }

    function recruitEmployee(Employee employee, string memory position) public {
        employee.join(address(this), position);
        employeeCount += 1;
    }

    function releaseEmployee(Employee employee) public {
        employee.leave(address(this));
        employeeCount -= 1;
    }

    function addPayee(address payee) public payable {
        payees.push(payee);
    }

    function getName() public view returns (string memory) {
        return companyName;
    }
    function getEmployeeCount() public view returns (uint256) {
        return employeeCount;
    }

    function validatePayee(address payee) public view returns (bool) {
        bool isAvailable = false;
        for (uint256 index = 0; index < payees.length; index++) {
            if (payees[index] == payee) {
                isAvailable = true;
            }
        }
        return isAvailable;
    }
    function getPayees () public view returns(address[] memory) {
        return payees;
    }
}

struct EmployerDetail {
    string name;
    address employerAddress;
    uint256 employeeCount;
    address[] payees;
}

struct EmployeeDetail {
    string name;
    address employerAddress;
    address[] payees;
}

contract HiringApplication {
    Employer[] public employerList;
    mapping(address => Employer) public employers;
    mapping(address => Employee) public employees;

    function registerEmployer(string memory companyName) public payable {
        Employer employer = new Employer(companyName, msg.value, msg.sender);
        employers[address(employer)] = employer;
        employerList.push(employer);
    }

    function registerEmployee(string memory name) public {
        Employee employee = new Employee(name);
        employees[address(employee)] = employee;
    }

    function getEmployerDetails(address _empoyerAddress)
        public
        view
        returns (EmployerDetail memory)
    {
        Employer employer = employers[_empoyerAddress];
        return EmployerDetail({name: employer.getName(), employerAddress:_empoyerAddress, employeeCount: employer.getEmployeeCount(), payees: employer.getPayees()});
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function hireEmployee(address employeeAddress) public view {
        if (employers[employeeAddress].validatePayee(msg.sender)) {
            console.log("this is validated");
        }
    }
    // function releveEmployee () public {

    // }
    function getEmployerDetail (address employer) public view returns (Employer) {
        Employer selectedEmployer;
        for (uint256 index = 0; index < employerList.length; index++) {
            if (employerList[index].validatePayee(employer)) {
                selectedEmployer = employerList[index];
            }
        }
        return selectedEmployer;
    }
}
