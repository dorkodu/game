import { Villager } from '@core/types'
import * as THREE from 'three'

export function createVillagerMesh(villager: Villager): THREE.Group {
  const group = new THREE.Group()

  // Body
  const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.2, 8)
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xd2b48c })
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
  body.position.y = 0.6
  body.castShadow = true
  group.add(body)

  // Head
  const headGeometry = new THREE.SphereGeometry(0.4, 8, 8)
  const headMaterial = new THREE.MeshStandardMaterial({ color: 0xe0ac69 })
  const head = new THREE.Mesh(headGeometry, headMaterial)
  head.position.y = 1.5
  head.castShadow = true
  group.add(head)

  // Arms
  const armGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.8, 8)
  const armMaterial = new THREE.MeshStandardMaterial({ color: 0xd2b48c })

  const leftArm = new THREE.Mesh(armGeometry, armMaterial)
  leftArm.position.set(-0.55, 0.7, 0)
  leftArm.rotation.z = Math.PI / 6
  leftArm.castShadow = true
  group.add(leftArm)

  const rightArm = new THREE.Mesh(armGeometry, armMaterial)
  rightArm.position.set(0.55, 0.7, 0)
  rightArm.rotation.z = -Math.PI / 6
  rightArm.castShadow = true
  group.add(rightArm)

  // Legs
  const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.8, 8)
  const legMaterial = new THREE.MeshStandardMaterial({ color: 0x4682b4 }) // Blue jeans color

  const leftLeg = new THREE.Mesh(legGeometry, legMaterial)
  leftLeg.position.set(-0.25, 0, 0)
  leftLeg.castShadow = true
  group.add(leftLeg)

  const rightLeg = new THREE.Mesh(legGeometry, legMaterial)
  rightLeg.position.set(0.25, 0, 0)
  rightLeg.castShadow = true
  group.add(rightLeg)

  // Position the entire group at the entity's position
  // Use a small offset to ensure the villager stands properly on the ground
  group.position.set(
    villager.position.x,
    0.4, // Lift the villager slightly so feet are on the ground
    villager.position.z
  )

  // Add a selection ring if the villager is selected
  if (villager.selected) {
    const ringGeometry = new THREE.RingGeometry(0.8, 1.0, 32)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    })
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.rotation.x = -Math.PI / 2 // Make it flat at the bottom of the villager
    ring.position.y = -0.39 // Position at ground level (adjusted for the group's position)
    group.add(ring)
  }

  return group
}
