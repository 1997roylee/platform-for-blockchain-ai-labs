import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts';

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
export const ZERO_BIG_INT = BigInt.fromI32(0);
export const ZERO_BIG_DECIMAL = new BigDecimal(ZERO_BIG_INT);
export const ONE_BIG_INT = BigInt.fromI32(1);
export const ZERO_ADDRESS = Address.fromString(ADDRESS_ZERO);
