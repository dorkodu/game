import { defineQuery, enterQuery, exitQuery } from 'bitecs'
import * as Components from './components'

// Query for renderable entities (has position)
export const renderableQuery = defineQuery([Components.Position])
export const renderableEnterQuery = enterQuery(renderableQuery)
export const renderableExitQuery = exitQuery(renderableQuery)

// Query for terrain entities
export const terrainQuery = defineQuery([Components.Terrain, Components.Position, Components.Size])

// Query for villager entities
export const villagerQuery = defineQuery([Components.Villager, Components.Position, Components.Health])
export const villagerEnterQuery = enterQuery(villagerQuery)
export const villagerExitQuery = exitQuery(villagerQuery)

// Query for house entities
export const houseQuery = defineQuery([Components.House, Components.Position, Components.Health])
export const houseEnterQuery = enterQuery(houseQuery)
export const houseExitQuery = exitQuery(houseQuery)

// Query for tree entities
export const treeQuery = defineQuery([Components.Tree, Components.Position, Components.Resource])
export const treeEnterQuery = enterQuery(treeQuery)
export const treeExitQuery = exitQuery(treeQuery)

// Query for selected entities
export const selectedQuery = defineQuery([Components.Selectable, Components.Position])
export const selectedEnterQuery = enterQuery(selectedQuery)
export const selectedExitQuery = exitQuery(selectedQuery)
