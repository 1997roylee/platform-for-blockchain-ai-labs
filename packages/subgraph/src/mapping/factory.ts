import { RegistryCreated as RegistryCreatedEvent } from '../../generated/BotFactory/BotFactory';
import { Registry } from '../../generated/schema';
import { Registry as RegistryTemplate } from '../../generated/templates';
import { ONE_BIG_INT } from '../utils/constants';
import { getOrCreateFactory } from '../utils/factory';
import { buildID } from '../utils/registry';

export function handleOptionCreated(event: RegistryCreatedEvent): void {
  const factory = getOrCreateFactory(event.address.toHexString());
  factory.registryCount = factory.registryCount.plus(ONE_BIG_INT);
  factory.save();

  const registry = new Registry(buildID(event.params.registry));

  registry.factory = factory.id;
  registry.creator = event.params.creator;
  registry.blockNumber = event.block.number;
  registry.blockTimestamp = event.block.timestamp;
  registry.transactionHash = event.transaction.hash;
  registry.save();
  // let registry = getOrCreateRegistry(event.params.registry)

  RegistryTemplate.create(event.params.registry);
}
