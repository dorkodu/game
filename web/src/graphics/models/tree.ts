import { Tree } from '@core/types'
import * as THREE from 'three'
import { createBarkTexture } from '../textures'

export function createTreeMesh(tree: Tree): THREE.Group {
  const group = new THREE.Group()

  // Scale the tree based on resources (representing size)
  const sizeScale = tree.resources > 70 ? 1.0 : 0.6

  // Tree trunk with improved material
  const trunkGeometry = new THREE.CylinderGeometry(0.5 * sizeScale, 0.7 * sizeScale, 4 * sizeScale, 8)
  const trunkMaterial = new THREE.MeshStandardMaterial({
    map: createBarkTexture(),
    roughness: 0.9,
    metalness: 0.0
  })
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)
  trunk.position.y = 2 * sizeScale
  trunk.castShadow = true
  trunk.receiveShadow = true
  group.add(trunk)

  // Create leaves with better color variations and shapes
  const createLeaves = () => {
    const leavesGroup = new THREE.Group()

    // Define more varied leaf positions for natural appearance
    const positions = [
      { x: 0, y: 4.5, z: 0, scale: 1.2 },     // Top center
      { x: 1, y: 4, z: 0, scale: 0.9 },       // Right
      { x: -1, y: 4, z: 0, scale: 0.9 },      // Left
      { x: 0, y: 4, z: 1, scale: 0.9 },       // Front
      { x: 0, y: 4, z: -1, scale: 0.9 },      // Back
      { x: 0.7, y: 3.5, z: 0.7, scale: 0.7 }, // Diagonal
      { x: -0.7, y: 3.5, z: 0.7, scale: 0.7 },// Diagonal
      { x: 0.7, y: 3.5, z: -0.7, scale: 0.7 },// Diagonal
      { x: -0.7, y: 3.5, z: -0.7, scale: 0.7 }// Diagonal
    ]

    // More vibrant base colors
    const leafColors = [
      0x2e8b57, // Sea Green
      0x228b22, // Forest Green
      0x32cd32, // Lime Green
      0x3cb371  // Medium Sea Green
    ]

    // For smaller trees, use fewer positions
    const treePosCount = sizeScale < 0.7 ? 4 : positions.length
    const usedPositions = positions.slice(0, treePosCount)

    usedPositions.forEach(pos => {
      const size = pos.scale * 1.5 * sizeScale

      // Randomize the color slightly
      const baseColor = new THREE.Color(leafColors[Math.floor(Math.random() * leafColors.length)])

      // Apply random variation to the color
      const leafColor = baseColor.clone()
      leafColor.r += (Math.random() * 0.1 - 0.05)
      leafColor.g += (Math.random() * 0.1 - 0.05)
      leafColor.b += (Math.random() * 0.1 - 0.05)

      const leafGeometry = new THREE.SphereGeometry(size, 8, 8)
      const leafMaterial = new THREE.MeshStandardMaterial({
        color: leafColor,
        roughness: 1.0,
        metalness: 0.0,
        flatShading: true, // Gives a more stylized look
      })

      const leaf = new THREE.Mesh(leafGeometry, leafMaterial)
      leaf.position.set(
        pos.x * sizeScale,
        pos.y * sizeScale,
        pos.z * sizeScale
      )
      leaf.castShadow = true
      leaf.receiveShadow = true

      // Slightly randomize rotation for more natural look
      leaf.rotation.x = Math.random() * 0.3
      leaf.rotation.y = Math.random() * 0.3
      leaf.rotation.z = Math.random() * 0.3

      leavesGroup.add(leaf)
    })

    return leavesGroup
  }

  const leaves = createLeaves()
  group.add(leaves)

  // Set position from the entity data
  group.position.set(
    tree.position.x,
    tree.position.y,
    tree.position.z
  )

  return group
}
