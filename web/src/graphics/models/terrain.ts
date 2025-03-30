import * as THREE from 'three'
import { createGrassTexture } from '../textures'

interface TerrainProps {
  size: number
  position: { x: number, y: number, z: number }
}

export function createTerrainMesh(props: TerrainProps): THREE.Mesh {
  const { size, position } = props

  // Create a simpler terrain geometry without as many subdivisions
  const geometry = new THREE.PlaneGeometry(size, size, 1, 1)

  // Create a solid material with a grass texture
  const grassTexture = createGrassTexture()

  // Make sure the texture is properly configured
  grassTexture.wrapS = THREE.RepeatWrapping
  grassTexture.wrapT = THREE.RepeatWrapping
  grassTexture.repeat.set(20, 20) // Increase repeats to avoid stretching

  const material = new THREE.MeshStandardMaterial({
    map: grassTexture,
    color: 0x4CAF50, // Ensure there's a base grass color
    roughness: 0.8,
    metalness: 0.1,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.rotation.x = -Math.PI / 2 // Rotate to be flat on the ground
  mesh.receiveShadow = true

  // Set the position
  mesh.position.set(position.x, position.y, position.z)

  return mesh
}
