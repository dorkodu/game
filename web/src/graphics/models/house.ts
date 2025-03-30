import { House } from '@core/types'
import * as THREE from 'three'
import { createBrickTexture, createRoofTexture } from '../textures'

export function createHouseMesh(house: House): THREE.Group {
  const group = new THREE.Group()

  // Main structure
  const baseGeometry = new THREE.BoxGeometry(4, 3, 4)
  const baseMaterial = new THREE.MeshStandardMaterial({ map: createBrickTexture() })
  const base = new THREE.Mesh(baseGeometry, baseMaterial)
  base.position.y = 1.5
  base.castShadow = true
  base.receiveShadow = true
  group.add(base)

  // Roof
  const roofGeometry = new THREE.ConeGeometry(3.5, 2, 4)
  const roofMaterial = new THREE.MeshStandardMaterial({ map: createRoofTexture() })
  const roof = new THREE.Mesh(roofGeometry, roofMaterial)
  roof.position.y = 4
  roof.rotation.y = Math.PI / 4 // Align with walls
  roof.castShadow = true
  roof.receiveShadow = true
  group.add(roof)

  // Door
  const doorGeometry = new THREE.PlaneGeometry(1, 2)
  const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513, side: THREE.DoubleSide })
  const door = new THREE.Mesh(doorGeometry, doorMaterial)
  door.position.set(0, 1, 2.01) // Slightly in front of the house
  door.castShadow = true
  door.receiveShadow = true
  group.add(door)

  // Windows
  const windowGeometry = new THREE.PlaneGeometry(0.8, 0.8)
  const windowMaterial = new THREE.MeshStandardMaterial({
    color: 0xADD8E6,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.7
  })

  const window1 = new THREE.Mesh(windowGeometry, windowMaterial)
  window1.position.set(-1.5, 2, 2.01)
  group.add(window1)

  const window2 = new THREE.Mesh(windowGeometry, windowMaterial)
  window2.position.set(1.5, 2, 2.01)
  group.add(window2)

  // Set position from the entity data
  group.position.set(
    house.position.x,
    house.position.y,
    house.position.z
  )

  return group
}
