import { hexToRgb } from './hex-to-rgb'

export function getPerceivedBrightness(rgb: {
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

  // You can adjust the threshold based on your preference
  return brightness < 64
}

export function shouldShowOnDarkBackground(hex: string): boolean {
  const rgb = hexToRgb(hex)
  const brightness = getPerceivedBrightness(rgb)

  // You can adjust the threshold based on your preference
  return brightness > 255 - 64
}
