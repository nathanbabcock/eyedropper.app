export function preferredColorScheme(): 'light' | 'dark' {
  const prefersLight = window.matchMedia?.(`(prefers-color-scheme: light)`)
  return prefersLight.matches ? 'light' : 'dark'
}
