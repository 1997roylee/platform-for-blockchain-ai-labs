import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  RegistryCreated,
  RegistryRemoved
} from "../generated/BotFactory/BotFactory"

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createRegistryCreatedEvent(
  registry: Address,
  creator: Address
): RegistryCreated {
  let registryCreatedEvent = changetype<RegistryCreated>(newMockEvent())

  registryCreatedEvent.parameters = new Array()

  registryCreatedEvent.parameters.push(
    new ethereum.EventParam("registry", ethereum.Value.fromAddress(registry))
  )
  registryCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )

  return registryCreatedEvent
}

export function createRegistryRemovedEvent(registry: Address): RegistryRemoved {
  let registryRemovedEvent = changetype<RegistryRemoved>(newMockEvent())

  registryRemovedEvent.parameters = new Array()

  registryRemovedEvent.parameters.push(
    new ethereum.EventParam("registry", ethereum.Value.fromAddress(registry))
  )

  return registryRemovedEvent
}
