import { defineComponent, Types } from 'bitecs'

// Basic components
export const Position = defineComponent([
  Types.f32, // x
  Types.f32, // y
  Types.f32, // z
])

export const Rotation = defineComponent([
  Types.f32, // x
  Types.f32, // y
  Types.f32, // z
])

export const Scale = defineComponent([
  Types.f32, // x
  Types.f32, // y
  Types.f32, // z
])

// Tag components to identify entity types
export const Terrain = defineComponent()
export const Villager = defineComponent()
export const House = defineComponent()
export const Tree = defineComponent()

// Gameplay components
export const Health = defineComponent([
  Types.ui16, // current health value
])

export const Resource = defineComponent([
  Types.ui16, // resource amount
])

export const Selectable = defineComponent([
  Types.ui8, // 0 = not selected, 1 = selected
])

// Geometry information for rendering
export const Size = defineComponent([
  Types.f32, // width/size
])

// Component for storing entity IDs (for external reference)
export const EntityId = defineComponent([
  Types.ui32, // 4 bytes to store a hash of the ID
])

// Component to track creation time
export const Created = defineComponent([
  Types.ui32, // creation timestamp
])
