// SPDX-License-Identifier: MIT  
pragma solidity >=0.7.0 <0.9.0;

interface IERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract CeloDonate{
    
    struct Organization{
        address payable organizationAddress;
        string name;
        string description;
        string category;
        uint totalAmount;
        uint totalPersons;
    }
    
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    address internal adminAddress = 0xb7BF999D966F287Cd6A1541045999aD5f538D3c6;
     
    uint organizationLength = 0;
    mapping(uint => Organization) organizations;
    
    modifier isAdmin(){
         require(msg.sender == adminAddress,"Only the admin can access this");
        _;
    }
    
    function addOrganization(
        address payable _organizationAddress,
        string memory _name,
        string memory _category,
        string memory _description
    
    )public isAdmin(){
        organizations[organizationLength] = Organization(
            _organizationAddress,
            _name,
            _category,
            _description,
            0,
            0
        );
        
         organizationLength++;
        
    }
    
    function donateToOrganization(uint _index, uint _amount)public payable{
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                organizations[_index].organizationAddress,
                _amount
            ),
            "Transaction could not be performed"
        );
        organizations[_index].totalAmount+=_amount;
        organizations[_index].totalPersons++;
    }
    
    function getOrganizations(uint _index)public view returns(
        address payable,
        string memory,
        string memory,
        string memory,
        uint,
        uint
    ){
        Organization storage organization = organizations[_index];
        return(
            organization.organizationAddress,
            organization.name,
            organization.category,
            organization.description,
            organization.totalAmount,
            organization.totalPersons
        );
    }
    
    function getOrganizationLength() public view returns (uint) {
        return (organizationLength);
    }
    
    function isUserAdmin(address _address) public view returns (bool){
        if(_address ==adminAddress){
            return true;
        }else{
          return false;  
        }
        
    }
        
    
}