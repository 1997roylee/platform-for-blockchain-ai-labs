// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract BotRegistry is Ownable, ReentrancyGuard {
    struct Metadata {
        string name;
        string description;
        string icon;
        string agentId;
        uint256 credits;
        address creator;
    }

    Metadata public metadata;
    mapping(address => bool) public subscribers;
    mapping(address => uint256) public userCredits;
    mapping(address => uint256) public stakingBalance;
    mapping(address => uint256) public lastRewardTime;

    uint256 public constant CREDITS_PER_MONTH = 30;
    uint256 public constant MIN_STAKE_AMOUNT = 0.001 ether;
    uint256 public constant SECONDS_PER_MONTH = 30 days;

    uint256 private totalSubscribers = 0;

    event SubscriptionAdded(address indexed subscriber, uint256 credits);
    event SubscriptionRemoved(address indexed subscriber);
    event CreditsRecalculated(address indexed user, uint256 newCredits);
    event CreditsPurchased(address indexed user, uint256 amount, uint256 cost);

    constructor(
        string memory _name,
        string memory _description,
        string memory _icon,
        string memory _agentId,
        uint256 _credits,
        address _creator
    ) Ownable(_creator) {
        require(_credits > 0, "Fee must be positive");

        metadata = Metadata(
            _name,
            _description,
            _icon,
            _agentId,
            _credits,
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

    // function buyCredits(uint256 creditAmount) external payable {
    //     require(creditAmount > 0, "Must buy at least 1 credit");
    //     uint256 cost = creditAmount * CREDIT_PRICE;
    //     require(msg.value >= cost, "Insufficient payment");

    //     // Update credits
    //     userCredits[msg.sender] += creditAmount;

    //     // Refund excess payment if any
    //     uint256 excess = msg.value - cost;
    //     if (excess > 0) {
    //         (bool success, ) = msg.sender.call{value: excess}("");
    //         require(success, "Refund failed");
    //     }

    //     emit CreditsPurchased(msg.sender, creditAmount, cost);
    // }

    // Add staking function
    function subscribe() external payable {
        require(
            msg.value >= MIN_STAKE_AMOUNT,
            "Minimum stake required: 0.001 ETH"
        );
        require(!subscribers[msg.sender], "Already subscribed");

        subscribers[msg.sender] = true;
        totalSubscribers++;
        stakingBalance[msg.sender] += msg.value;
        userCredits[msg.sender] += CREDITS_PER_MONTH;

        emit SubscriptionAdded(msg.sender, CREDITS_PER_MONTH);
    }

    // Add unstaking function
    function unstake() external {
        require(subscribers[msg.sender], "Not subscribed");
        uint256 amount = stakingBalance[msg.sender];
        require(amount > 0, "No staking balance");

        subscribers[msg.sender] = false;
        totalSubscribers--;
        stakingBalance[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        emit SubscriptionRemoved(msg.sender);
    }

    function recalculateCredits(address user) public returns (uint256) {
        require(stakingBalance[user] > 0, "No staking balance");

        uint256 timeElapsed = block.timestamp - lastRewardTime[user];

        if (timeElapsed <= 0) {
            // Calculate base credits from months elapsed
            uint256 baseCredits = CREDITS_PER_MONTH;

            uint256 totalNewCredits = baseCredits;

            // Update state
            userCredits[user] = totalNewCredits;
            lastRewardTime[user] = block.timestamp;

            emit CreditsRecalculated(user, totalNewCredits);
            return totalNewCredits;
        }

        return 0;
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
}
