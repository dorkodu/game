import { EntityType, Position, EntityId, GameEntityTypes } from './types'
import { nanoid } from 'nanoid'

// World state management
export class World {
  private entities: Map<EntityId, GameEntityTypes> = new Map();

  constructor() { }

  public initialize() {
    // Create initial world state
    this.createTerrain()
    this.createVillagers()
    this.createHouse()
    this.createTrees()
  }

  private createTerrain() {
    const terrainId = nanoid()
    this.entities.set(terrainId, {
      id: terrainId,
      type: EntityType.TERRAIN,
      position: { x: 0, y: 0, z: 0 },
      size: 100
    })
  }

  private createVillagers() {
    for (let i = 0; i < 3; i++) {
      const villagerId = nanoid()
      this.entities.set(villagerId, {
        id: villagerId,
        type: EntityType.VILLAGER,
        position: { x: -5 + (i * 3), y: 1, z: -2 },
        health: 100
      })
    }
  }

  private createHouse() {
    const houseId = nanoid()
    this.entities.set(houseId, {
      id: houseId,
      type: EntityType.HOUSE,
      position: { x: 0, y: 0, z: -8 },
      health: 200
    })
  }

  private createTrees() {
    // Create a forest in the northwest quadrant (-15 to -30, 10 to 25)
    this.createForest(-20, 15, 15, 20) // x, z, width, depth of forest

    // Add some additional scattered trees around the map
    const scatteredPositions = [
      [10, -10], [15, 0], [15, 10],
      [-15, -15], [0, 15], [10, 15]
    ]

    scatteredPositions.forEach(([x, z]) => {
      const treeId = nanoid()
      this.entities.set(treeId, {
        id: treeId,
        type: EntityType.TREE,
        position: { x, y: 0, z },
        resources: 100
      })
    })
  }

  // New method to create a dense forest
  private createForest(centerX: number, centerZ: number, width: number, depth: number) {
    // Number of trees to generate in the forest
    const forestDensity = 25

    for (let i = 0; i < forestDensity; i++) {
      // Random position within the forest area
      const x = centerX + (Math.random() * width - width / 2)
      const z = centerZ + (Math.random() * depth - depth / 2)

      // Add some randomness to the resource amount
      const resources = 80 + Math.floor(Math.random() * 40)

      const treeId = nanoid()
      this.entities.set(treeId, {
        id: treeId,
        type: EntityType.TREE,
        position: { x, y: 0, z },
        resources
      })

      // Add some variation in tree sizes
      if (Math.random() > 0.7) {
        // Create a smaller tree nearby (like a sapling or younger tree)
        const offsetX = x + (Math.random() * 2 - 1)
        const offsetZ = z + (Math.random() * 2 - 1)
        const saplingId = nanoid()
        this.entities.set(saplingId, {
          id: saplingId,
          type: EntityType.TREE,
          position: { x: offsetX, y: 0, z: offsetZ },
          resources: 30 + Math.floor(Math.random() * 20) // Less resources for smaller trees
        })
      }
    }
  }

  public getEntities(): GameEntityTypes[] {
    return Array.from(this.entities.values())
  }

  public getEntityById(id: EntityId): GameEntityTypes | undefined {
    return this.entities.get(id)
  }

  public updateEntityPosition(id: EntityId, position: Position): boolean {
    const entity = this.entities.get(id)
    if (!entity) return false

    entity.position = position
    this.entities.set(id, entity)
    return true
  }
}

// Export singleton instance
export const world = new World()
