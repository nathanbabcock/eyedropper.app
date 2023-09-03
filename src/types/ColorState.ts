export type ColorState = {
  hex: string
  rgb: string
  // hsl: string // 🚧 todo

  /**
   * Where the color came from affects behavior:
   * - whether to play an animation
   * - whether to log to console
   * - etc.
   *
   * Including this metadata in the state type gives a lot of flexibility when
   * composing `useEffects` that subscribe to changes.
   */
  source?: 'eyedropper' | 'url' | 'colorInput'
}
