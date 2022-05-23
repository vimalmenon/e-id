//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Employee.sol";

contract Employer {
    string private id;
    string private companyName;
    uint256 private employeeCount;
    uint256 private stakeAmount;
    address[] private payees;
    Employee[] private employeeList;

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

    function removeEmployee(Employee employee) private {
        bool itemFound = false;
        for (uint256 i = 0; i < employeeList.length - 1; i++) {
            if (employeeList[i] != employee) {
                itemFound = true;
            } else if (!itemFound) {
                employeeList[1] = employeeList[i];
            } else if (itemFound) {
                employeeList[i - 1] = employeeList[i];
            }
        }
        employeeList.pop();
    }

    function recruitEmployee(Employee employee, string memory position) public {
        employee.recruit(address(this), position);
        employeeList.push(employee);
        employeeCount += 1;
    }

    function relieveEmployee(Employee employee) public {
        employee.relieve(address(this));
        removeEmployee(employee);
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

    function getEmployees() public view returns (Employee[] memory) {
        return employeeList;
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

    function getPayees() public view returns (address[] memory) {
        return payees;
    }

    function getId() public view returns (string memory) {
        return id;
    }

    function getStakeAmount() public view returns (uint256) {
        return stakeAmount;
    }
}
