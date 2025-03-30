import { createWorld, addEntity, addComponent, IWorld, removeEntity } from 'bitecs'
import { nanoid } from 'nanoid'
import { xxHash32 } from 'js-xxhash'
import * as Components from './components'

// Create the ECS world
export const world = createWorld()

// Map to store string IDs to entity numbers for external reference
export const entityIdMap = new Map<string, number>()
export const reverseEntityIdMap = new Map<number, string>()

// Helper to create an entity with an ID
export function createEntityWithId(): [number, string] {
  const entity = addEntity(world)
  const id = nanoid()

  // Store a hash of the ID in a component for efficient queries
  const hash = xxHash32(id, 0)
  addComponent(world, Components.EntityId, entity)
  Components.EntityId.ui32[entity] = hash

  // Track creation time
  addComponent(world, Components.Created, entity)
  Components.Created.ui32[entity] = Date.now()

  // Store mapping
  entityIdMap.set(id, entity)
  reverseEntityIdMap.set(entity, id)

  return [entity, id]
}

// Helper to remove an entity and its mapping
export function removeEntityById(id: string): boolean {
  const entity = entityIdMap.get(id)
  if (entity === undefined) return false

  removeEntity(world, entity)
  entityIdMap.delete(id)
  reverseEntityIdMap.delete(entity)
  return true
}

// Helper to get entity number from ID
export function getEntityByStringId(id: string): number | undefined {
  return entityIdMap.get(id)
}

// Helper to get ID from entity number
export function getStringIdByEntity(entity: number): string | undefined {
  return reverseEntityIdMap.get(entity)
}

// Reset the world (for testing or game restarts)
export function resetWorld(): void {
  // Create a new world instance
  const newWorld = createWorld()

  // Copy reference to the new world
  Object.assign(world, newWorld)

  // Clear entity mappings
  entityIdMap.clear()
  reverseEntityIdMap.clear()
}
