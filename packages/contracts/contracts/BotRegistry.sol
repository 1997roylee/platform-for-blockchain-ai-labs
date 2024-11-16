// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract BotRegistry is Ownable, ReentrancyGuard {
    struct Metadata {
        string name;
        string description;
        string icon;
        string apiEndpoint;
        uint256 credits;
        address creator;
    }

    Metadata public metadata;
    mapping(address => bool) public subscribers;
    mapping(address => uint256) public userCredits;
    mapping(address => uint256) public stakingBalance;
    mapping(address => uint256) public lastRewardTime;

    uint256 public constant CREDITS_PER_MONTH = 30;
    uint256 public constant MIN_STAKE_AMOUNT = 0.01 ether;
    uint256 public constant SECONDS_PER_MONTH = 30 days;

    event SubscriptionAdded(address indexed subscriber, uint256 credits);
    event SubscriptionRemoved(address indexed subscriber);
    event CreditsRecalculated(address indexed user, uint256 newCredits);

    constructor(
        string memory _name,
        string memory _description,
        string memory _icon,
        string memory _apiEndpoint,
        uint256 _credits,
        address _creator
    ) Ownable(_creator) {
        require(_credits > 0, "Fee must be positive");

        metadata = Metadata(
            _name,
            _description,
            _icon,
            _apiEndpoint,
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

    // Add staking function
    function subscribe() external payable {
        require(
            msg.value >= MIN_STAKE_AMOUNT,
            "Minimum stake required: 0.1 ETH"
        );
        require(!subscribers[msg.sender], "Already subscribed");

        subscribers[msg.sender] = true;
        stakingBalance[msg.sender] += msg.value;
        userCredits[msg.sender] += CREDITS_PER_MONTH;
        // lastRewardTime[msg.sender] = block.timestamp;
        emit SubscriptionAdded(msg.sender, CREDITS_PER_MONTH);
    }

    // Add unstaking function
    function unstake() external {
        require(subscribers[msg.sender], "Not subscribed");
        uint256 amount = stakingBalance[msg.sender];
        require(amount > 0, "No staking balance");

        subscribers[msg.sender] = false;
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

            // Calculate bonus credits based on stake amount
            // uint256 stakeMultiplier = stakingBalance[user] / MIN_STAKE_AMOUNT;
            // uint256 bonusCredits = (baseCredits * stakeMultiplier) / 10; // 10% bonus per MIN_STAKE_AMOUNT

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
    // function updateMetadata(
    //     string memory _name,
    //     string memory _apiInfo,
    //     uint8 _version,
    //     uint256 _fee
    // ) external onlyCreator {
    //     require(_fee > 0, "Fee must be positive");

    //     metadata.name = _name;
    //     metadata.apiInfo = _apiInfo;
    //     metadata.version = _version;
    //     metadata.fee = _fee;

    //     emit MetadataUpdated(_name, _apiInfo, _version, _fee);
    // }
}
