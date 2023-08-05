export function randomColorHex(): string {
  // Generate random values for red, green, and blue components
  const red = Math.floor(Math.random() * 256)
  const green = Math.floor(Math.random() * 256)
  const blue = Math.floor(Math.random() * 256)

  // Convert the RGB values to a hex code
  const hexCode =
    '#' +
    red.toString(16).padStart(2, '0') +
    green.toString(16).padStart(2, '0') +
    blue.toString(16).padStart(2, '0')

  return hexCode
}
