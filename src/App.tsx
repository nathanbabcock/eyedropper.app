/// <reference types="vite-plugin-svgr/client" />

import chalk from 'chalk'
import { useEffect, useState } from 'react'
import './App.css'
import { ReactComponent as EyedropperIcon } from './assets/eyedropper.svg'
import { CopyButton } from './components/CopyButton'
import {
  shouldShowOnDarkBackground,
  shouldShowOnLightBackground,
} from './util/color-contrast'
import { hexToRgb, rgbToString } from './util/hex-to-rgb'
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
  const [hex, setHex] = useState<string>()
  const rgb = hex ? rgbToString(hexToRgb(hex)) : undefined
  const [open, setOpen] = useState(false)

  const [animations, setAnimations] = useState<string[]>([])

  // Random color on reload (debug only)
  useEffect(() => setHex(randomColorHex()), [])

  const animationTime = 2000 // todo: must match CSS animation duration
  const playAnimation = (hex: string) => {
    const rgb = rgbToString(hexToRgb(hex))
    if ([hex, rgb].includes(document.body.style.backgroundColor)) return
    setAnimations(animations =>
      animations.includes(hex) ? animations : [...animations, hex]
    )
    setTimeout(() => {
      setAnimations(animations => animations.filter(c => c !== hex))
      document.body.style.backgroundColor = hex
    }, animationTime)
  }

  useEffect(() => {
    if (!hex) return
    logColor(hex)
    playAnimation(hex)
  }, [hex])

  async function pick() {
    try {
      if (!window.EyeDropper)
        throw new Error('EyeDropper not supported in this browser')
      const dropper = new window.EyeDropper()
      setOpen(true)
      const color = await dropper.open()
      setHex(color?.sRGBHex)
    } catch (e) {
      console.log(chalk.italic(chalk.gray('User cancelled selection')))
    } finally {
      setOpen(false)
    }
  }

  const [lastCopied, setLastCopied] = useState<'hex' | 'rgb'>()
  const copy = (text: string, type: 'hex' | 'rgb') => {
    navigator.clipboard.writeText(text).catch(console.error)
    setLastCopied(type)
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
        {hex && rgb && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1em',
              margin: '1em',
            }}
          >
            <CopyButton
              children={hex}
              copied={lastCopied === 'hex'}
              onClick={() => copy(hex, 'hex')}
            />
            <CopyButton
              children={rgb}
              copied={lastCopied === 'rgb'}
              onClick={() => copy(rgb, 'rgb')}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default App
