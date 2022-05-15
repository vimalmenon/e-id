//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Employee {
    struct EmployeeEmployer {
        address employer;
        string position;
        uint256 startDate;
        uint256 endDate;
    }
    EmployeeEmployer[] public employees;
    string private id;
    string private name;
    bool private isHirable;
    address[] private payees;

    constructor(string memory _id, string memory _name) {
        id = _id;
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
                    position: position
                })
            );
            return;
        }
        require(
            isHirable == true,
            "Employee cannot be hired"
        );
        employees.push(
            EmployeeEmployer({
                employer: employeeAddress,
                startDate: block.timestamp,
                endDate: 0,
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
    function getId() public view returns (string memory) {
        return id;
    }
    function getName() public view returns (string memory) {
        return name;
    }
    function getPayee() public view returns (address[] memory) {
        return payees;
    }
    function getIsHirable () public view returns (bool) {
        return isHirable;
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
    function addPayee (address payee) public {
        payees.push(payee);
    }
}


contract Employer {
    string private id;
    string private companyName;
    uint256 private employeeCount;
    uint256 private verifiedCount;
    uint256 private stakeAmount;
    address[] private payees;

    constructor(
        string memory _id,
        string memory _companyName,
        uint256 _stakeAmount,
        address _registeredAddress
    ) {
        id = _id;
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
    function getId () public view returns (string memory) {
        return id;
    }
}

struct EmployerDetail {
    string id;
    string name;
    address employerAddress;
    uint256 employeeCount;
    address[] payees;
}

struct EmployeeDetail {
    string id;
    string name;
    address employeeAddress;
    bool isHirable;
    address[] payees;
}

contract HiringApplication {
    Employer[] public employerList;
    Employee[] public employeeList;
    mapping(address => Employer) public employers;
    mapping(address => Employee) public employees;

    function registerEmployer(string memory id, string memory companyName) public payable {
        Employer employer = new Employer(id, companyName, msg.value, msg.sender);
        employers[address(employer)] = employer;
        employerList.push(employer);
    }

    function registerEmployee(string memory id, string memory name) public {
        Employee employee = new Employee(id, name);
        employees[address(employee)] = employee;
        employeeList.push(employee);
    }
    function registerEmployeeWithPayee(string memory id, string memory name, address payee) public {
        Employee employee = new Employee(id, name);
        employee.addPayee(payee);
        employees[address(employee)] = employee;
        employeeList.push(employee);
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
    function getEmployerAddress (address employer) public view returns (Employer) {
        Employer selectedEmployer;
        for (uint256 index = 0; index < employerList.length; index++) {
            if (employerList[index].validatePayee(employer)) {
                selectedEmployer = employerList[index];
            }
        }
        return selectedEmployer;
    }
    function getEmployerDetails(address _empoyerAddress)
        public
        view
        returns (EmployerDetail memory)
    {
        Employer employer = employers[_empoyerAddress];
        return EmployerDetail({id: employer.getId(), name: employer.getName(), employerAddress:_empoyerAddress, employeeCount: employer.getEmployeeCount(), payees: employer.getPayees()});
    }

    function getEmployeeAddress (address employee) public view returns (Employee) {
        Employee selectedEmployee;
        for (uint256 index = 0; index < employeeList.length; index++) {
            if (employeeList[index].validatePayee(employee)) {
                selectedEmployee = employeeList[index];
            }
        }
        return selectedEmployee;
    }
    function getEmployeeDetails (address _employeeAddress) public view returns (EmployeeDetail memory){
        Employee employee = employees[_employeeAddress];
        return EmployeeDetail({id: employee.getId(), name: employee.getName(), employeeAddress: _employeeAddress, isHirable: employee.getIsHirable(), payees: employee.getPayee()});
    }
}
