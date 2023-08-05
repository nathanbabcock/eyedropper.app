/// <reference types="vite-plugin-svgr/client" />

import chalk from 'chalk'
import { useEffect, useState } from 'react'
import './App.css'
import { ReactComponent as EyedropperIcon } from './assets/eyedropper.svg'
import {
  hexToRgb,
  shouldShowOnDarkBackground,
  shouldShowOnLightBackground,
} from './util/color-contrast'
import { preferredColorScheme } from './util/prefers-color-scheme'
import { randomColorHex } from './util/random-color'

function logColor(color: string) {
  const consoleHasDarkBg = preferredColorScheme() === 'dark'

  let bgColorFunction = (x: string) => x
  if (consoleHasDarkBg && shouldShowOnLightBackground(color))
    bgColorFunction = chalk.bgWhite
  else if (!consoleHasDarkBg && shouldShowOnDarkBackground(color))
    bgColorFunction = chalk.bgBlack
  console.log(bgColorFunction(chalk.hex(color)(` ■ ${color} `)))
}

function App() {
  const [color, setColor] = useState<string>()
  const rgb = color ? hexToRgb(color) : undefined
  const [open, setOpen] = useState(false)

  // Random color on reload
  useEffect(() => setColor(randomColorHex()), [])

  useEffect(() => {
    if (!color) return
    document.body.style.backgroundColor = color
    logColor(color)
  }, [color])

  async function pick() {
    try {
      if (!window.EyeDropper)
        throw new Error('EyeDropper not supported in this browser')
      const dropper = new window.EyeDropper()
      setOpen(true)
      const color = await dropper.open()
      setColor(color?.sRGBHex)
    } catch (e) {
      console.error(e)
    } finally {
      setOpen(false)
    }
  }

  return (
    <>
      <button onClick={pick}>
        <EyedropperIcon />
        Pick a color
      </button>
      {color && (
        <div>
          <div>
            <code>{color}</code>
          </div>
          <div>
            <code>
              rgb({rgb!.r}, {rgb!.g}, {rgb!.b})
            </code>
          </div>
        </div>
      )}
    </>
  )
}

export default App
