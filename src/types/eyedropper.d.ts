// @source https://gist.github.com/bkrmendy/f4582173f50fab209ddfef1377ab31e3

interface EyeDropperConstructor {
  new (): EyeDropper
  readonly prototype: EyeDropper
}

interface ColorSelectionOptions {
  signal: AbortSignal
}

interface ColorSelectionResult {
  sRGBHex: string
}

/** @source https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper */
interface EyeDropper extends EyeDropperConstructor {
  open: (options?: ColorSelectionOptions) => Promise<ColorSelectionResult>
}

interface Window {
  EyeDropper?: EyeDropperConstructor
}
