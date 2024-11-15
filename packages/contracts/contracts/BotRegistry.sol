// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract BotRegistry is Ownable, ReentrancyGuard {
    struct Metadata {
        string name;
        string icon;
        string apiEndpoint;
        uint256 fee;
        address creator;
    }

    Metadata public metadata;
    mapping(uint256 => mapping(address => bool)) public subscribers;

    event ServicePaid(
        uint256 indexed botId,
        address indexed user,
        uint256 amount
    );
    event MetadataUpdated(
        string name,
        string apiInfo,
        uint256 version,
        uint256 fee
    );
    event SubscriptionAdded(uint256 indexed botId, address indexed subscriber);
    event SubscriptionRemoved(
        uint256 indexed botId,
        address indexed subscriber
    );

    constructor(
        string memory _name,
        string memory _icon,
        string memory _apiEndpoint,
        uint256 _fee,
        address _creator
    ) Ownable(_creator) {
        require(_fee > 0, "Fee must be positive");

        metadata = Metadata(_name, _icon, _apiEndpoint, _fee, _creator);
    }

    function subscribe(uint256 botId) external payable nonReentrant {
        require(msg.value >= metadata.fee, "Insufficient payment");
        require(!subscribers[botId][msg.sender], "Already subscribed");

        subscribers[botId][msg.sender] = true;
        emit SubscriptionAdded(botId, msg.sender);
        // emit ServicePaid(botId, msg.sender, msg.value);
    }

    // Add unsubscribe function
    function unsubscribe(uint256 botId) external nonReentrant {
        require(subscribers[botId][msg.sender], "Not subscribed");

        subscribers[botId][msg.sender] = false;
        emit SubscriptionRemoved(botId, msg.sender);

        // Optional: Refund remaining time if implementing time-based subscriptions
        // uint256 refundAmount = calculateRefund();
        // if (refundAmount > 0) {
        //     (bool success, ) = msg.sender.call{value: refundAmount}("");
        //     require(success, "Refund failed");
        // }
    }

    modifier onlyCreator() {
        require(
            msg.sender == metadata.creator,
            "Only creator can call this function"
        );
        _;
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
