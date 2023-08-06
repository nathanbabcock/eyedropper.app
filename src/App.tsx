/// <reference types="vite-plugin-svgr/client" />

import chalk from 'chalk'
import { useEffect, useState } from 'react'
import './App.css'
import { ReactComponent as EyedropperIcon } from './assets/eyedropper.svg'
import {
  shouldShowOnDarkBackground,
  shouldShowOnLightBackground,
} from './util/color-contrast'
import { hexToRgb } from './util/hex-to-rgb'
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

  const [animations, setAnimations] = useState<string[]>([])

  // Random color on reload (debug only)
  useEffect(() => setColor(randomColorHex()), [])

  const animationTime = 2000 // todo: must match CSS animation duration
  const playAnimation = (color: string) => {
    if (document.body.style.backgroundColor === color) return
    setAnimations(animations =>
      animations.includes(color) ? animations : [...animations, color]
    )
    setTimeout(() => {
      setAnimations(animations => animations.filter(c => c !== color))
      document.body.style.backgroundColor = color
    }, animationTime)
  }

  useEffect(() => {
    if (!color) return
    logColor(color)
    playAnimation(color)
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
      {animations.map(backgroundColor => (
        <div
          key={backgroundColor}
          className="animatedCircle"
          style={{ backgroundColor }}
        />
      ))}

      <div className="foreground">
        <button
          onClick={pick}
          style={{ borderRadius: '50%', padding: 50, width: 200, height: 200 }}
        >
          <EyedropperIcon />
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
      </div>
    </>
  )
}

export default App
