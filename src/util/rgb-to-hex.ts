export function rgbToHex(rgbString: string): string {
  return (
    '#' +
    rgbString
      .replace(/rgba?\(/, '')
      .replace(')', '')
      .split(',')
      .map(v => v.trim())
      .map(v => parseInt(v, 10).toString(16).padStart(2, '0'))
      .join('')
      .substring(0, 6) // ignore alpha channel which might be decimal
  )
}
