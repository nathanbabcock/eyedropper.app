export type Rgb = { r: number; g: number; b: number }

export function hexToRgb(hex: string): Rgb {
  // Remove the "#" character if present
  hex = hex.replace('#', '')

  // Convert the hex code to RGB values
  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return { r, g, b }
}

export function rgbToString({ r, g, b }: Rgb): string {
  return `rgb(${r}, ${g}, ${b})`
}
