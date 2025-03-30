import { addComponent } from 'bitecs'
import * as Components from '../components'
import { world, createEntityWithId } from '../world'

// System to initialize the game world with initial entities
export function initializeWorld() {
  createTerrain()
  createVillagers()
  createHouse()
  createTrees()
  createForest(-20, 15, 15, 20)
}

function createTerrain() {
  const [entity] = createEntityWithId()

  addComponent(world, Components.Terrain, entity)
  addComponent(world, Components.Position, entity)
  Components.Position.f32[entity * 3 + 0] = 0 // x
  Components.Position.f32[entity * 3 + 1] = 0 // y
  Components.Position.f32[entity * 3 + 2] = 0 // z

  addComponent(world, Components.Size, entity)
  Components.Size.f32[entity] = 100
}

function createVillagers() {
  for (let i = 0; i < 3; i++) {
    const [entity] = createEntityWithId()

    addComponent(world, Components.Villager, entity)

    addComponent(world, Components.Position, entity)
    Components.Position.f32[entity * 3 + 0] = -5 + (i * 3) // x
    Components.Position.f32[entity * 3 + 1] = 0 // y (will be adjusted in render system)
    Components.Position.f32[entity * 3 + 2] = -2 // z

    addComponent(world, Components.Health, entity)
    Components.Health.ui16[entity] = 100

    addComponent(world, Components.Selectable, entity)
    Components.Selectable.ui8[entity] = 0 // Not selected by default
  }
}

function createHouse() {
  const [entity] = createEntityWithId()

  addComponent(world, Components.House, entity)

  addComponent(world, Components.Position, entity)
  Components.Position.f32[entity * 3 + 0] = 0 // x
  Components.Position.f32[entity * 3 + 1] = 0 // y
  Components.Position.f32[entity * 3 + 2] = -8 // z

  addComponent(world, Components.Health, entity)
  Components.Health.ui16[entity] = 200
}

function createTrees() {
  const scatteredPositions = [
    [10, -10], [15, 0], [15, 10],
    [-15, -15], [0, 15], [10, 15]
  ]

  scatteredPositions.forEach(([x, z]) => {
    createTree(x, 0, z, 100)
  })
}

function createForest(centerX: number, centerZ: number, width: number, depth: number) {
  // Number of trees to generate in the forest
  const forestDensity = 25

  for (let i = 0; i < forestDensity; i++) {
    // Random position within the forest area
    const x = centerX + (Math.random() * width - width / 2)
    const z = centerZ + (Math.random() * depth - depth / 2)

    // Add some randomness to the resource amount
    const resources = 80 + Math.floor(Math.random() * 40)

    createTree(x, 0, z, resources)

    // Add some variation in tree sizes
    if (Math.random() > 0.7) {
      // Create a smaller tree nearby (like a sapling or younger tree)
      const offsetX = x + (Math.random() * 2 - 1)
      const offsetZ = z + (Math.random() * 2 - 1)
      createTree(offsetX, 0, offsetZ, 30 + Math.floor(Math.random() * 20))
    }
  }
}

export function createTree(x: number, y: number, z: number, resources: number) {
  const [entity] = createEntityWithId()

  addComponent(world, Components.Tree, entity)

  addComponent(world, Components.Position, entity)
  Components.Position.f32[entity * 3 + 0] = x
  Components.Position.f32[entity * 3 + 1] = y
  Components.Position.f32[entity * 3 + 2] = z

  addComponent(world, Components.Resource, entity)
  Components.Resource.ui16[entity] = resources
}
