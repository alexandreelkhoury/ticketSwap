// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

/**
 * @title TicketSwap
 * @author Alexandre EL-KHOURY
 */

contract ticketswap is ERC1155, ERC1155Supply {

    uint public constant ticket1 = 1;
    uint public constant ticket2 = 2;
    uint public constant maxSupplyTicket1 = 200 ;
    uint public constant maxSupplyTicket2 = 100 ;
    uint public ticketMinted1 = 0 ;
    uint public ticketMinted2 = 0 ;
    address public owner;

    event newBuyer(address indexed _from,uint256 time, uint _value);

    constructor() ERC1155("https://olive-encouraging-gecko-886.mypinata.cloud/ipfs/QmQX3k24ZrePvQtRRSSQDqJX1gFysC9sQjJr4RTPPnyxm4/{id}.json") {
      owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    /**
     * @notice Can be called only by everyone.
     * This is the donate/mint function
     * Emits the event : newBuyer (address: msg.sender, time :block.timestamp, value : msg.value )
     */

    function mintSilverTicket() public payable {
        require(msg.value == 0.01 ether, "Please enter an amount greater than 0.01 ether !");
        require(ticketMinted1 < maxSupplyTicket1, "Sold out !");
        if (msg.value>= 0.01 ether){
            _mint(msg.sender, ticket1, 1, "");
        }
        ticketMinted1 = ticketMinted1 + 1;
        emit newBuyer(msg.sender, block.timestamp, msg.value);
    }

    function mintSGoldTicket() public payable {
        require(msg.value == 0.02 ether, "Please enter an amount greater than 0.01 ether !");
        require(ticketMinted2 < maxSupplyTicket2, "Sold out !");
        if (msg.value >= 0.02 ether){
            _mint(msg.sender, ticket2, 1, "");
        }
        ticketMinted2 = ticketMinted2 + 1;
        emit newBuyer(msg.sender, block.timestamp, msg.value);
    }

    /**
     * @notice Can be called only by owner.
     * It lets the owner to withdraw funds
     */

    function withdraw() public payable onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Failed to send to owner");
    }

    /**
     * @notice Can be called only by owner.
     */

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}