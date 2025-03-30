import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { IWorld, hasComponent } from 'bitecs'
import {
  terrainQuery, villagerQuery, houseQuery, treeQuery,
  renderableEnterQuery, renderableExitQuery
} from '@core/src/ecs/queries'
import * as Components from '@core/src/ecs/components'
import { getStringIdByEntity } from '@core/src/ecs/world'
import { createTerrainMesh } from './models/terrain'
import { createVillagerMesh } from './models/villager'
import { createHouseMesh } from './models/house'
import { createTreeMesh } from './models/tree'

// Manages the Three.js scene and rendering based on ECS entities
export class GameRenderer {
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private controls: OrbitControls
  private entityMeshes: Map<number, THREE.Object3D> = new Map()

  constructor(private container: HTMLElement) {
    // Scene setup
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x87ceeb) // Sky blue background

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      45, // Field of view
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.1, // Near clipping plane
      1000 // Far clipping plane
    )
    this.camera.position.set(20, 20, 20)
    this.camera.lookAt(0, 0, 0)

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMap.enabled = true
    this.container.appendChild(this.renderer.domElement)

    // Controls setup
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.screenSpacePanning = false
    this.controls.maxPolarAngle = Math.PI / 2.5 // Limit camera angle to not go below the ground
    this.controls.minDistance = 10
    this.controls.maxDistance = 50

    // Lighting setup
    this.setupLights()

    // Event listeners
    window.addEventListener('resize', this.handleResize)
  }

  private setupLights(): void {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    this.scene.add(ambientLight)

    // Directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(50, 50, 50)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    this.scene.add(directionalLight)
  }

  // Update based on ECS world
  public updateFromECS(ecsWorld: IWorld): void {
    // Handle entities that have been added
    const enteredEntities = renderableEnterQuery(ecsWorld)
    for (const entity of enteredEntities) {
      this.createEntityMesh(ecsWorld, entity)
    }

    // Handle entities that have been removed
    const exitedEntities = renderableExitQuery(ecsWorld)
    for (const entity of exitedEntities) {
      this.removeEntityMesh(entity)
    }

    // Update positions of existing entities
    const terrainEntities = terrainQuery(ecsWorld)
    const villagerEntities = villagerQuery(ecsWorld)
    const houseEntities = houseQuery(ecsWorld)
    const treeEntities = treeQuery(ecsWorld)

    // Update all entity positions
    const allEntities = [
      ...terrainEntities,
      ...villagerEntities,
      ...houseEntities,
      ...treeEntities
    ]

    for (const entity of allEntities) {
      this.updateEntityPosition(ecsWorld, entity)
    }

    // Update selection state
    for (const entity of villagerEntities) {
      this.updateEntitySelection(ecsWorld, entity)
    }
  }

  private createEntityMesh(world: IWorld, entity: number): void {
    let mesh: THREE.Object3D | null = null

    // Get position
    const x = Components.Position.f32[entity * 3 + 0]
    const y = Components.Position.f32[entity * 3 + 1]
    const z = Components.Position.f32[entity * 3 + 2]

    // Create the appropriate mesh based on entity components
    if (hasComponent(world, Components.Terrain, entity)) {
      const size = Components.Size.f32[entity]
      mesh = createTerrainMesh({ size, position: { x, y, z } })
    }
    else if (hasComponent(world, Components.Villager, entity)) {
      const health = Components.Health.ui16[entity]
      const selected = hasComponent(world, Components.Selectable, entity) &&
        Components.Selectable.ui8[entity] === 1
      mesh = createVillagerMesh({
        position: { x, y, z },
        health,
        selected
      })
    }
    else if (hasComponent(world, Components.House, entity)) {
      const health = Components.Health.ui16[entity]
      mesh = createHouseMesh({
        position: { x, y, z },
        health
      })
    }
    else if (hasComponent(world, Components.Tree, entity)) {
      const resources = Components.Resource.ui16[entity]
      mesh = createTreeMesh({
        position: { x, y, z },
        resources
      })
    }

    if (mesh) {
      // Store entity reference on the mesh
      mesh.userData.entityId = entity
      mesh.userData.stringId = getStringIdByEntity(entity)

      this.scene.add(mesh)
      this.entityMeshes.set(entity, mesh)
    }
  }

  private updateEntityPosition(world: IWorld, entity: number): void {
    const mesh = this.entityMeshes.get(entity)
    if (!mesh) return

    const x = Components.Position.f32[entity * 3 + 0]
    const y = Components.Position.f32[entity * 3 + 1]
    const z = Components.Position.f32[entity * 3 + 2]

    // For villagers, we need to use the specific y offset
    if (hasComponent(world, Components.Villager, entity)) {
      mesh.position.set(x, 0.4, z) // Use fixed y-position for villagers
    } else {
      mesh.position.set(x, y, z)
    }
  }

  private updateEntitySelection(world: IWorld, entity: number): void {
    const mesh = this.entityMeshes.get(entity)
    if (!mesh || !hasComponent(world, Components.Selectable, entity)) return

    const isSelected = Components.Selectable.ui8[entity] === 1

    // First, check if selection state is already correct
    if (mesh.userData.selected === isSelected) return

    // Otherwise, recreate the mesh with the updated selection state
    this.removeEntityMesh(entity)
    this.createEntityMesh(world, entity)
  }

  private removeEntityMesh(entity: number): void {
    const mesh = this.entityMeshes.get(entity)
    if (mesh) {
      this.scene.remove(mesh)

      // Dispose geometries and materials
      if (mesh instanceof THREE.Mesh) {
        if (mesh.geometry) mesh.geometry.dispose()
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(m => this.disposeMaterial(m))
          } else {
            this.disposeMaterial(mesh.material)
          }
        }
      }

      this.entityMeshes.delete(entity)
    }
  }

  // Animation loop
  public animate(): void {
    requestAnimationFrame(this.animate.bind(this))
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  private handleResize = (): void => {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  public dispose(): void {
    window.removeEventListener('resize', this.handleResize)

    // Dispose all entity meshes
    for (const entity of this.entityMeshes.keys()) {
      this.removeEntityMesh(entity)
    }

    this.renderer.dispose()
    this.entityMeshes.clear()

    if (this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement)
    }
  }

  private disposeMaterial(material: THREE.Material): void {
    if ('map' in material && material.map) material.map.dispose()
    material.dispose()
  }
}
