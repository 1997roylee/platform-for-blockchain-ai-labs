import { Purchase, Spend } from "../../../generated/schema";
import {
  CreditsPurchased as CreditsPurchasedEvent,
  CreditsUsed as CreditsUsedEvent,
} from "../../../generated/templates/Registry/BotRegistry";
import { buildID as buildPurchasId } from "../../utils/purchase";
import { buildID as buildSpendId } from "../../utils/spend";
import { getOrCreateRegistry } from "../../utils/registry";

export function handleCreditsPurchased(event: CreditsPurchasedEvent): void {
  const id = buildPurchasId(event.transaction.hash, event.transaction.index);

  const registry = getOrCreateRegistry(event.address);

  const purchase = new Purchase(id);

  purchase.registry = registry.id;
  purchase.buyer = event.params.user;
  purchase.credits = event.params.amount;
  purchase.costs = event.params.cost;

  purchase.blockNumber = event.block.number;
  purchase.blockTimestamp = event.block.timestamp;
  purchase.transactionHash = event.transaction.hash;
  purchase.save();
}

export function handleCreditsUsed(event: CreditsUsedEvent): void {
  const id = buildSpendId(event.transaction.hash, event.transaction.index);

  const registry = getOrCreateRegistry(event.address);

  const spend = new Spend(id);

  spend.registry = registry.id;
  spend.spender = event.params.user;
  spend.credits = event.params.amount;
  spend.blockNumber = event.block.number;
  spend.blockTimestamp = event.block.timestamp;
  spend.transactionHash = event.transaction.hash;
  spend.save();
}
