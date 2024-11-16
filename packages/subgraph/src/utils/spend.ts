import { BigInt, Bytes } from '@graphprotocol/graph-ts';

export function buildID(transactionHash: Bytes, transactionIndex: BigInt): string {
  // "Transaction Hash" +
  return transactionHash.toHex().concat('-').concat(transactionIndex.toString());
}
