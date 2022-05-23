//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Employee.sol";
import "./Employer.sol";

struct EmployerDetail {
    string id;
    string name;
    address employerAddress;
    uint256 employeeCount;
    address[] payees;
    Employee[] employees;
}

struct EmployeeDetail {
    string id;
    string name;
    bool isHirable;
    address employeeAddress;
    address[] payees;
    string position;
    EmployementHistory[] employementHistory;
}

struct ContractDetail {
    uint256 employeeCount;
    uint256 employerCount;
    uint256 contractBalance;
    address contractAddress;
}

contract HiringApplication {
    Employer[] private employerList;
    Employee[] private employeeList;
    mapping(address => Employer) private employers;
    mapping(address => Employee) private employees;

    event AddEvent(
        address indexed from,
        address indexed createdAddress,
        string msg
    );

    function registerEmployer(string memory id, string memory companyName)
        public
        payable
    {
        require(
            address(getEmployerAddress(msg.sender)) == address(0x0),
            "Payee already registered"
        );
        Employer employer = new Employer(
            id,
            companyName,
            msg.value,
            msg.sender
        );
        employers[address(employer)] = employer;
        employerList.push(employer);
        emit AddEvent(
            msg.sender,
            address(employer),
            string(
                abi.encodePacked("Employer ", companyName, " has been added")
            )
        );
    }

    function registerEmployee(string memory id, string memory employeeName)
        public
    {
        Employee employee = new Employee(id, employeeName);
        employees[address(employee)] = employee;
        employeeList.push(employee);
        emit AddEvent(
            msg.sender,
            address(employee),
            string(abi.encodePacked("Company ", employeeName, " added"))
        );
    }

    function registerEmployeeWithPayee(
        string memory id,
        string memory employeeName,
        address payee
    ) public {
        Employee employee = new Employee(id, employeeName);
        employee.addPayee(payee);
        employees[address(employee)] = employee;
        employeeList.push(employee);
        emit AddEvent(
            msg.sender,
            address(employee),
            string(abi.encodePacked("Employee ", employeeName, " added"))
        );
    }

    function recruitEmployee(
        address employerAddress,
        address employeeAddress,
        string memory position
    ) public {
        require(employers[employerAddress].validatePayee(msg.sender), "NA");
        employers[employerAddress].recruitEmployee(
            employees[employeeAddress],
            position
        );
    }

    function relieveEmployee(address employerAddress, address employeeAddress)
        public
    {
        require(employers[employerAddress].validatePayee(msg.sender), "NA");
        employers[employerAddress].relieveEmployee(employees[employeeAddress]);
    }

    function getEmployerAddress(address employer)
        public
        view
        returns (Employer)
    {
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
        return
            EmployerDetail({
                id: employer.getId(),
                name: employer.getName(),
                employerAddress: _empoyerAddress,
                employeeCount: employer.getEmployeeCount(),
                payees: employer.getPayees(),
                employees: employer.getEmployees()
            });
    }

    function getEmployeeAddress(address employee)
        public
        view
        returns (Employee)
    {
        Employee selectedEmployee;
        for (uint256 index = 0; index < employeeList.length; index++) {
            if (employeeList[index].validatePayee(employee)) {
                selectedEmployee = employeeList[index];
            }
        }
        return selectedEmployee;
    }

    function getEmployeeDetails(address _employeeAddress)
        public
        view
        returns (EmployeeDetail memory)
    {
        Employee employee = employees[_employeeAddress];
        return
            EmployeeDetail({
                id: employee.getId(),
                name: employee.getName(),
                isHirable: employee.getIsHirable(),
                payees: employee.getPayee(),
                employeeAddress: _employeeAddress,
                employementHistory: employee.getEmployementHistory(),
                position: employee.getPosition()
            });
    }

    function getContractDetail() public view returns (ContractDetail memory) {
        return
            ContractDetail({
                employeeCount: employeeList.length,
                employerCount: employerList.length,
                contractBalance: address(this).balance,
                contractAddress: address(this)
            });
    }
}
