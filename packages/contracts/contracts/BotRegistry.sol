// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

contract BotRegistry is Ownable, ReentrancyGuard {
    using Math for uint256;

    struct Metadata {
        string name;
        string description;
        string icon;
        string agentId;
        // uint256 credits;
        address creator;
    }

    Metadata public metadata;
    mapping(address => bool) public subscribers;
    mapping(address => uint256) public userCredits;
    uint256 public ownerBalance;
    uint256 public totalSubscribers = 0;

    // Constants
    uint256 public constant MIN_CREDITS = 30;
    uint256 public constant MAX_CREDITS_PER_PURCHASE = 1000;
    uint256 public constant CREDIT_PRICE = 0.0001 ether;

    // Events
    event CreditsPurchased(address indexed user, uint256 amount, uint256 cost);
    event CreditsUsed(address indexed user, uint256 amount);
    event OwnerWithdrawal(uint256 amount);
    event MetadataUpdated(string name, string description);

    constructor(
        string memory _name,
        string memory _description,
        string memory _icon,
        string memory _agentId,
        // uint256 _credits,
        address _creator
    ) Ownable(_creator) {
        metadata = Metadata(
            _name,
            _description,
            _icon,
            _agentId,
            // _credits,
            _creator
        );
    }

    modifier onlyCreator() {
        require(
            msg.sender == metadata.creator,
            "Only creator can call this function"
        );
        _;
    }

    function withdraw() external onlyOwner {
        require(ownerBalance > 0, "No balance to withdraw");

        uint256 amount = ownerBalance;
        ownerBalance = 0;

        (bool success, ) = payable(owner()).call{value: amount}("");
        require(success, "Transfer failed");

        emit OwnerWithdrawal(amount);
    }

    function buyCredits(uint256 creditAmount) external payable nonReentrant {
        require(creditAmount >= MIN_CREDITS, "Amount below minimum");
        require(
            creditAmount <= MAX_CREDITS_PER_PURCHASE,
            "Amount above maximum"
        );

        uint256 cost = creditAmount * CREDIT_PRICE;
        require(msg.value >= cost, "Insufficient payment");

        // Update credits
        userCredits[msg.sender] += creditAmount;
        ownerBalance += msg.value;

        emit CreditsPurchased(msg.sender, creditAmount, cost);

        if (!subscribers[msg.sender]) {
            subscribers[msg.sender] = true;
            totalSubscribers++;
        }
    }

    // Add credit spending function
    function spendCredits(uint256 amount) external {
        require(userCredits[msg.sender] >= amount, "Insufficient credits");
        userCredits[msg.sender] -= amount;
    }

    // Add credit balance check
    function getCreditsBalance(address user) external view returns (uint256) {
        return userCredits[user];
    }

    function getTotalSubscribers() external view returns (uint256) {
        return totalSubscribers;
    }

    receive() external payable {
        ownerBalance += msg.value;
    }

    fallback() external payable {
        ownerBalance += msg.value;
    }
}
