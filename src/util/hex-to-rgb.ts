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
