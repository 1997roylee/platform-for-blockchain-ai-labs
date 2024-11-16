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
        address creator;
    }

    Metadata public metadata;
    mapping(address => bool) public subscribers;
    mapping(address => uint256) public userCredits;
    uint256 public totalSubscribers = 0;

    // Constants
    uint256 public constant MIN_CREDITS = 30;
    uint256 public constant MAX_CREDITS_PER_PURCHASE = 1000;
    uint256 public constant CREDIT_PRICE = 0.0001 ether;

    // Events
    event CreditsPurchased(address indexed user, uint256 amount, uint256 cost);
    event CreditsUsed(address indexed user, uint256 amount);
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

        // Refund excess payment
        if (msg.value > cost) {
            (bool refundSuccess, ) = payable(msg.sender).call{
                value: msg.value - cost
            }("");
            require(refundSuccess, "Refund failed");
        }

        // Transfer payment to owner using safe transfer
        (bool success, ) = payable(owner()).call{value: cost}("");
        require(success, "Transfer to owner failed");

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

        emit CreditsUsed(msg.sender, amount);
    }

    // Add credit balance check
    function getCreditsBalance(address user) external view returns (uint256) {
        return userCredits[user];
    }

    function getTotalSubscribers() external view returns (uint256) {
        return totalSubscribers;
    }
}
