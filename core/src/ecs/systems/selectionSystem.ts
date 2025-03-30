import { IWorld, hasComponent } from 'bitecs'
import * as Components from '../components'
import { selectedQuery } from '../queries'

export function updateSelectionSystem(world: IWorld) {
  const entities = selectedQuery(world)

  // This system would contain logic for handling selection state changes
  // For now it's a placeholder that would be expanded with user input and selection logic

  return world
}

export function selectEntity(world: IWorld, entity: number) {
  if (hasComponent(world, Components.Selectable, entity)) {
    Components.Selectable.ui8[entity] = 1
  }
}

export function deselectEntity(world: IWorld, entity: number) {
  if (hasComponent(world, Components.Selectable, entity)) {
    Components.Selectable.ui8[entity] = 0
  }
}

export function isEntitySelected(world: IWorld, entity: number): boolean {
  if (hasComponent(world, Components.Selectable, entity)) {
    return Components.Selectable.ui8[entity] === 1
  }
  return false
}
