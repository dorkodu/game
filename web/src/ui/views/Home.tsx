import { Box } from "@mantine/core"
import { useEffect, useRef } from "react"
import { GameRenderer } from "@web/graphics/renderer"
import { world } from "@core/src/ecs/world"
import { initializeWorld } from "@core/src/ecs/systems/worldInitSystem"
import { pipe } from 'bitecs'
import { updateSelectionSystem } from "@core/src/ecs/systems/selectionSystem"

export default function Home() {
  const mountRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<GameRenderer | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Initialize the ECS world
    initializeWorld()

    // Create pipeline of systems
    const pipeline = pipe(updateSelectionSystem)

    // Set up renderer
    const renderer = new GameRenderer(mountRef.current)
    rendererRef.current = renderer

    // Game loop
    let lastTime = performance.now()
    const gameLoop = () => {
      const time = performance.now()
      const delta = time - lastTime
      lastTime = time

      // Run all ECS systems
      pipeline(world)

      // Update renderer with current ECS world state
      renderer.updateFromECS(world)

      // Schedule next frame
      requestAnimationFrame(gameLoop)
    }

    // Start game and animation loops
    renderer.animate() // Handles rendering
    gameLoop() // Handles game logic

    // Clean up resources on unmount
    return () => {
      renderer.dispose()
      rendererRef.current = null
    }
  }, [])

  return (
    <Box sx={{ width: '100%', height: '100vh', overflow: 'hidden' }} ref={mountRef}>
      {/* Three.js canvas will be inserted here */}
    </Box>
  )
}