import { RegistryCreated as RegistryCreatedEvent } from '../../generated/BotFactory/BotFactory';
import { Registry } from '../../generated/schema';
import { Registry as RegistryTemplate } from '../../generated/templates';
import { ONE_BIG_INT } from '../utils/constants';
import { getOrCreateFactory } from '../utils/factory';
import { buildID, fetchMetadata } from '../utils/registry';
import { BotRegistry as BotRegistryContract } from '../../generated/BotFactory/BotRegistry';

export function handleOptionCreated(event: RegistryCreatedEvent): void {
  const factory = getOrCreateFactory(event.address.toHexString());
  factory.registryCount = factory.registryCount.plus(ONE_BIG_INT);
  factory.save();

  const registry = new Registry(buildID(event.params.registry));

  const registryContract = BotRegistryContract.bind(event.params.registry);
  const metadata = fetchMetadata(registryContract);
  registry.factory = factory.id;
  registry.creator = event.params.creator;
  registry.blockNumber = event.block.number;
  registry.blockTimestamp = event.block.timestamp;
  registry.transactionHash = event.transaction.hash;
  registry.agentId = metadata.getAgentId();
  registry.name = metadata.getName();
  registry.description = metadata.getDescription();
  registry.icon = metadata.getIcon();
  registry.save();
  // let registry = getOrCreateRegistry(event.params.registry)

  RegistryTemplate.create(event.params.registry);
}
