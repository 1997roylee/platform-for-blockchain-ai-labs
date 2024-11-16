import { Address } from '@graphprotocol/graph-ts';
import {
  BotRegistry__metadataResult,
  BotRegistry as BotRegistryContract,
} from '../../generated/BotFactory/BotRegistry';
import { Registry } from '../../generated/schema';

export function buildID(id: Address): string {
  return id.toHexString();
}

export function getOrCreateRegistry(registryAddress: Address): Registry {
  let registry = Registry.load(buildID(registryAddress));

  if (registry == null) {
    registry = new Registry(buildID(registryAddress));
    registry.save();
  }

  return registry as Registry;
}

export function fetchMetadata(registry: BotRegistryContract): BotRegistry__metadataResult {
  const metadata = registry.try_metadata();

  //   if (metadata.reverted) {
  //     return ZERO_ADDRESS;
  //   }

  assert(
    !metadata.reverted,
    'accessed value of a reverted call, ' +
      'please check the `reverted` field before accessing the `value` field'
  );

  return metadata.value;
}

// export function fetchUnderlyingAmountPerOption(option: OptionContract): BigInt {
//   const underlyingAmount = option.try_underlyingAmountPerOption();

//   if (underlyingAmount.reverted) {
//     return BigInt.fromI32(0);
//   }

//   return underlyingAmount.value;
// }

// export function fetchPriceFeed(option: OptionContract): Address {
//   const priceFeed = option.try_priceFeed();

//   if (priceFeed.reverted) {
//     return ZERO_ADDRESS;
//   }

//   return priceFeed.value;
// }

// export function fetchUri(option: OptionContract): string {
//   const uri = option.try_uri(ONE_BIG_INT);

//   if (uri.reverted) {
//     return '';
//   }

//   return uri.value;
// }

// export function fetchTotalOptions(option: OptionContract): BigInt {
//   const amountOfOptions = option.try_totalOptions();

//   if (amountOfOptions.reverted) {
//     return BigInt.fromI32(0);
//   }

//   return amountOfOptions.value;
// }

// export function fetchOptionExecuted(option: OptionContract): boolean {
//   const optionExecuted = option.try_optionExecuted();

//   if (optionExecuted.reverted) {
//     return false;
//   }

//   return optionExecuted.value;
// }

// export function fetchRemainingBalance(option: OptionContract): BigInt {
//   const remainingBalance = option.try_remainingBalance();

//   if (remainingBalance.reverted) {
//     return BigInt.fromI32(0);
//   }

//   return remainingBalance.value;
// }

// export function fetchUniswapRouter(option: OptionContract): Address {
//   const uniswapRouter = option.try_uniswapRouter();

//   if (uniswapRouter.reverted) {
//     return ZERO_ADDRESS;
//   }

//   return uniswapRouter.value;
// }

// export function fetchStrikeTimestamp(option: OptionContract): BigInt {
//   const strikeTimestamp = option.try_strikeTimestamp();

//   if (strikeTimestamp.reverted) {
//     return BigInt.fromI32(0);
//   }

//   return strikeTimestamp.value;
// }

// export function touchOption(option: Option, transaction: Transaction): Option {
//   option.updatedAtBlock = transaction.blockNumber;
//   option.updatedAtTimestamp = transaction.timestamp;
//   return option;
//   // option.save();
// }
