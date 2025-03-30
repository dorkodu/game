import * as THREE from 'three'

// Generate procedural textures
export function createGrassTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const context = canvas.getContext('2d')

  if (context) {
    // Base green color - using a more vibrant grass green
    context.fillStyle = '#4CAF50'
    context.fillRect(0, 0, canvas.width, canvas.height)

    // Add more subtle variations for texture without making it too noisy
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = Math.random() * 3 + 1 // Slightly larger patches

      // More subtle green variations
      context.fillStyle = Math.random() > 0.5
        ? 'rgba(60, 140, 60, 0.2)' // Darker green
        : 'rgba(120, 200, 80, 0.2)' // Lighter green

      context.beginPath()
      context.arc(x, y, size, 0, Math.PI * 2)
      context.fill()
    }

    // Add a subtle grid pattern to represent grass patches
    context.strokeStyle = 'rgba(50, 120, 50, 0.1)'
    context.lineWidth = 1

    const gridSize = 16
    for (let x = 0; x < canvas.width; x += gridSize) {
      context.beginPath()
      context.moveTo(x, 0)
      context.lineTo(x, canvas.height)
      context.stroke()
    }

    for (let y = 0; y < canvas.height; y += gridSize) {
      context.beginPath()
      context.moveTo(0, y)
      context.lineTo(canvas.width, y)
      context.stroke()
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(10, 10)

  return texture
}

export function createBrickTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')

  if (ctx) {
    // Base wall color
    ctx.fillStyle = '#D2B48C'
    ctx.fillRect(0, 0, 128, 128)

    // Draw brick pattern
    ctx.fillStyle = '#BC8F8F'
    const brickHeight = 10
    const brickWidth = 20

    for (let y = 0; y < 128; y += brickHeight) {
      const offset = (y % (brickHeight * 2)) === 0 ? 0 : brickWidth / 2
      for (let x = 0; x < 128; x += brickWidth) {
        ctx.fillRect(x + offset, y, brickWidth - 1, brickHeight - 1)
      }
    }

    // Add some darker lines for mortar
    ctx.strokeStyle = '#A89078'
    ctx.lineWidth = 1
    for (let y = 0; y < 128; y += brickHeight) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(128, y)
      ctx.stroke()
    }

    for (let x = 0; x < 128; x += brickWidth) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, 128)
      ctx.stroke()
    }
  }

  return new THREE.CanvasTexture(canvas)
}

export function createRoofTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')

  if (ctx) {
    // Base color
    ctx.fillStyle = '#8B4513'
    ctx.fillRect(0, 0, 128, 128)

    // Add tile pattern
    ctx.fillStyle = '#A52A2A'
    const tileSize = 10

    for (let y = 0; y < 128; y += tileSize) {
      for (let x = 0; x < 128; x += tileSize) {
        if ((x + y) % (tileSize * 2) === 0) {
          ctx.fillRect(x, y, tileSize, tileSize)
        }
      }
    }
  }

  return new THREE.CanvasTexture(canvas)
}

export function createBarkTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')

  if (ctx) {
    // Base brown color
    ctx.fillStyle = '#8B4513'
    ctx.fillRect(0, 0, 128, 128)

    // Add vertical streaks for bark texture
    for (let i = 0; i < 20; i++) {
      const x = Math.floor(Math.random() * 128)
      const width = Math.floor(Math.random() * 5) + 2
      const height = Math.floor(Math.random() * 60) + 40
      const y = Math.floor(Math.random() * (128 - height))

      ctx.fillStyle = Math.random() > 0.5 ? '#A0522D' : '#6B4226'
      ctx.fillRect(x, y, width, height)
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1, 2)

  return texture
}
