//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
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
    address employeeAddress;
    bool isHirable;
    address[] payees;
    EmployementHistory[] employementHistory;
}

struct ContractDetail {
    uint256 employeeCount;
    uint256 employerCount;
    uint256 contractBalance;
    address contractAddress;
}

contract Employee {
    EmployementHistory[] private employementHistory;
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
        require(employementHistory.length > 0, "Employee has no employer");
        _;
    }
    modifier canHire() {
        require(isHirable == true, "Employee cannot be hired");
        _;
    }

    function recruit(address employeeAddress, string memory position)
        public
        canHire
    {
        employementHistory.push(
            EmployementHistory({
                employer: employeeAddress,
                position: position,
                hiringType: HiringType.RECRUIT,
                timestamp: block.timestamp
            })
        );
        isHirable = false;
    }

    function relieve(address employeeAddress) public hasEmployee {
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
}

contract Employer {
    string private id;
    string private companyName;
    uint256 private employeeCount;
    uint256 private verifiedCount;
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
}

contract HiringApplication {
    Employer[] public employerList;
    Employee[] public employeeList;
    mapping(address => Employer) public employers;
    mapping(address => Employee) public employees;

    event AddEvent(
        address indexed from,
        address indexed createdAddress,
        string msg
    );

    function registerEmployer(string memory id, string memory companyName)
        public
        payable
    {
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
            string(
                abi.encodePacked("Employee ", employeeName, " has been added")
            )
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
            string(
                abi.encodePacked("Employee ", employeeName, " has been added")
            )
        );
    }

    function recruitEmployee(
        address employerAddress,
        address employeeAddress,
        string memory position
    ) public {
        require(
            employers[employerAddress].validatePayee(msg.sender),
            "Not authorized"
        );
        console.log("this is called");
        employers[employerAddress].recruitEmployee(
            employees[employeeAddress],
            position
        );
    }

    function relieveEmployee(address employerAddress, address employeeAddress)
        public
    {
        require(
            employers[employerAddress].validatePayee(msg.sender),
            "Not authorized"
        );
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
                employeeAddress: _employeeAddress,
                isHirable: employee.getIsHirable(),
                payees: employee.getPayee(),
                employementHistory: employee.getEmployementHistory()
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
