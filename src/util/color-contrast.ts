export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove the "#" character if present
  hex = hex.replace('#', '')

  // Convert the hex code to RGB values
  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return { r, g, b }
}

function getPerceivedBrightness(rgb: {
  r: number
  g: number
  b: number
}): number {
  // Calculate the perceived brightness using the YIQ color space formula
  const { r, g, b } = rgb
  return (r * 299 + g * 587 + b * 114) / 1000
}

export function shouldShowOnLightBackground(hex: string): boolean {
  const rgb = hexToRgb(hex)
  const brightness = getPerceivedBrightness(rgb)

  console.log({ brightness })

  // You can adjust the threshold based on your preference
  return brightness < 64
}

export function shouldShowOnDarkBackground(hex: string): boolean {
  const rgb = hexToRgb(hex)
  const brightness = getPerceivedBrightness(rgb)

  console.log({ brightness })

  // You can adjust the threshold based on your preference
  return brightness > 255 - 64
}
