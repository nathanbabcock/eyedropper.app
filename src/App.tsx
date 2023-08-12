/// <reference types="vite-plugin-svgr/client" />

import chalk from 'chalk'
import { useEffect, useState } from 'react'
import './App.css'
import { CopyButton } from './components/CopyButton'
import { EyedropperButton } from './components/EyedropperButton'
import { Footer } from './components/Footer'
import { Unsupported } from './components/Unsupported'
import {
  getPerceivedBrightness,
  shouldShowOnDarkBackground,
  shouldShowOnLightBackground,
} from './util/color-contrast'
import { hexToRgb, rgbToString } from './util/hex-to-rgb'
import { preferredColorScheme } from './util/prefers-color-scheme'
import { randomColorHex } from './util/random-color'
import { rgbToHex } from './util/rgb-to-hex'
import { separatorChar } from './util/separator'

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
  const [open, setOpen] = useState(false)
  const [animations, setAnimations] = useState<string[]>([])
  const [hex, setHex] = useState<string>()
  const rgb = hex ? rgbToString(hexToRgb(hex)) : undefined
  const unsupported = window.EyeDropper === undefined

  // Read URL fragment on load
  useEffect(() => {
    const hash = location.hash?.toUpperCase()
    if (!hash) return
    setHex(hash)
    updateTitle(hash)
  }, [])

  const pickRandomColor = () => {
    const hex = randomColorHex().toUpperCase()
    setHex(hex)
    updateUrl(hex)
  }

  // Apply class to body
  useEffect(() => {
    if (!hex) return
    const brightness = getPerceivedBrightness(hexToRgb(hex))
    console.log({ brightness })
    if (brightness > 128) {
      document.body.classList.add('bg-light')
      document.body.classList.remove('bg-dark')
    } else {
      document.body.classList.add('bg-dark')
      document.body.classList.remove('bg-light')
    }
  }, [hex])

  const animationTime = 2000 // todo: must match CSS animation duration
  const playAnimation = (hex: string) => {
    // const rgb = rgbToString(hexToRgb(hex))
    // if ([hex, rgb].includes(document.body.style.backgroundColor)) return
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

  const updateTitle = (hex: string) =>
    (document.title = `${hex.toUpperCase()} ${separatorChar} eyedropper.app`)

  const updateUrl = (hex: string) =>
    history.pushState(null, '', hex.toUpperCase())

  useEffect(() => {
    const handler = (_event: PopStateEvent) => {
      console.log('popstate', location.hash)
      setHex(location.hash)
    }
    // Listen for the "popstate" event to handle back and forward button clicks
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  })

  const [lastCopied, setLastCopied] = useState<'hex' | 'rgb'>()
  const copy = (text: string, type: 'hex' | 'rgb') => {
    navigator.clipboard.writeText(text).catch(console.error)
    setLastCopied(type)
  }

  async function pick() {
    try {
      if (!window.EyeDropper)
        throw new Error('EyeDropper not supported in this browser')
      const dropper = new window.EyeDropper()
      setOpen(true)
      const { sRGBHex } = await dropper.open()
      if (!sRGBHex) return
      let hex: string
      // 🪲 handle bug where some browsers return RGBA instead of hex
      // <https://github.com/WICG/eyedropper-api/issues/31>
      if (sRGBHex.startsWith('rgb')) hex = rgbToHex(sRGBHex).toUpperCase()
      else hex = sRGBHex.toUpperCase()
      setHex(hex)
      updateUrl(hex)
      updateTitle(hex)
      if (lastCopied === 'rgb') copy(rgbToString(hexToRgb(hex)), 'rgb')
      else copy(hex, 'hex')
    } catch (e) {
      console.log(chalk.italic(chalk.gray('User cancelled selection')))
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
        <main className="main">
          <EyedropperButton
            onClick={pick}
            disabled={unsupported}
            isOpen={open}
          />
          {unsupported && <Unsupported />}
          {hex && (
            <CopyButton
              children={hex}
              copied={lastCopied === 'hex'}
              onClick={() => copy(hex, 'hex')}
            />
          )}
          {rgb && (
            <CopyButton
              children={rgb}
              copied={lastCopied === 'rgb'}
              onClick={() => copy(rgb, 'rgb')}
            />
          )}
        </main>
        <Footer onRandomColorClick={pickRandomColor} />
      </div>
    </>
  )
}

export default App
