// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./BotRegistry.sol";

contract BotFactory is Ownable {
    address[] registries;

    event RegistryCreated(address indexed registry, address indexed creator);
    event RegistryRemoved(address indexed registry);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function createRegistry(
        string memory name,
        string memory apiInfo,
        uint256 version,
        uint256 fee
    ) external onlyOwner returns (address) {
        BotRegistry newRegistry = new BotRegistry(
            name,
            apiInfo,
            version,
            fee,
            msg.sender
        );

        registries.push(address(newRegistry));
        emit RegistryCreated(address(newRegistry), msg.sender);
        return address(newRegistry);
    }

    function getRegistries() public view returns (address[] memory) {
        return registries;
    }

    function removeRegistry(address _registry) external onlyOwner {
        require(_registry != address(0), "Invalid registry address");

        for (uint256 i = 0; i < registries.length; i++) {
            if (registries[i] == _registry) {
                registries[i] = registries[registries.length - 1];
                registries.pop();
                emit RegistryRemoved(_registry);
                return;
            }
        }
        revert("Registry not found");
    }
}
