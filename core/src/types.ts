// Game entity types and interfaces

export enum EntityType {
  TERRAIN = 'terrain',
  VILLAGER = 'villager',
  HOUSE = 'house',
  TREE = 'tree'
}

export type Position = {
  x: number
  y: number
  z: number
}

export type EntityId = string

export interface Entity {
  id: EntityId
  type: EntityType
  position: Position
}

export interface Terrain extends Entity {
  type: EntityType.TERRAIN
  size: number
}

export interface Villager extends Entity {
  type: EntityType.VILLAGER
  health: number
  selected?: boolean
}

export interface House extends Entity {
  type: EntityType.HOUSE
  health: number
}

export interface Tree extends Entity {
  type: EntityType.TREE
  resources: number
}

export type GameEntityTypes = Terrain | Villager | House | Tree
