//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

enum HiringType {
    RECRUIT,
    RESIGN
}

struct EmployementHistory {
    address employer;
    string position;
    HiringType hiringType;
    uint256 timestamp;
}

contract Employee {
    EmployementHistory[] private employementHistory;
    string private id;
    string private name;
    bool private isHirable;
    address[] private payees;
    string private position;

    constructor(string memory _id, string memory _name) {
        id = _id;
        name = _name;
        isHirable = true;
        position = "";
    }

    function recruit(address employeeAddress, string memory _position) public {
        require(isHirable == true, "Employee cannot be hired");
        employementHistory.push(
            EmployementHistory({
                employer: employeeAddress,
                position: _position,
                hiringType: HiringType.RECRUIT,
                timestamp: block.timestamp
            })
        );
        isHirable = false;
        position = _position;
    }

    function relieve(address employeeAddress) public {
        require(employementHistory.length > 0, "Employee has no employer");
        require(
            employementHistory[employementHistory.length - 1].employer ==
                employeeAddress,
            "Operation not allowed"
        );
        employementHistory.push(
            EmployementHistory({
                employer: employeeAddress,
                position: employementHistory[employementHistory.length - 1]
                    .position,
                hiringType: HiringType.RESIGN,
                timestamp: block.timestamp
            })
        );
        isHirable = true;
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

    function getIsHirable() public view returns (bool) {
        return isHirable;
    }

    function getEmployementHistory()
        public
        view
        returns (EmployementHistory[] memory)
    {
        return employementHistory;
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

    function addPayee(address payee) public {
        payees.push(payee);
    }

    function getPosition() public view returns (string memory) {
        return position;
    }
}
