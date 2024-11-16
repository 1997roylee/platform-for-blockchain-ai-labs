import {
  OwnershipTransferred as OwnershipTransferredEvent,
  RegistryCreated as RegistryCreatedEvent,
  RegistryRemoved as RegistryRemovedEvent
} from "../generated/BotFactory/BotFactory"
import {
  OwnershipTransferred,
  RegistryCreated,
  RegistryRemoved
} from "../generated/schema"

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRegistryCreated(event: RegistryCreatedEvent): void {
  let entity = new RegistryCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.registry = event.params.registry
  entity.creator = event.params.creator

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRegistryRemoved(event: RegistryRemovedEvent): void {
  let entity = new RegistryRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.registry = event.params.registry

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
