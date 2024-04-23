/// <reference types="vite-plugin-svgr/client" />

import chalk from 'chalk'
import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { AppProvider, useAppContext } from './AppContext'
import { CopyButton } from './components/CopyButton'
import { EyedropperButton } from './components/EyedropperButton'
import { Footer } from './components/Footer'
import { InputColor } from './components/InputColor'
import { Unsupported } from './components/Unsupported'
import { type ColorState } from './types/ColorState'
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
import { usePWA } from './hooks/usePWA'

function logColor(color: string) {
  const consoleHasDarkBg = preferredColorScheme() === 'dark'

  let bgColorFunction = (x: string) => x
  if (consoleHasDarkBg && shouldShowOnLightBackground(color))
    bgColorFunction = chalk.bgWhite
  else if (!consoleHasDarkBg && shouldShowOnDarkBackground(color))
    bgColorFunction = chalk.bgBlack
  console.log(bgColorFunction(chalk.hex(color)(` ■ ${color} `)))
}

function AppContent() {
  usePWA()
  const { open, setOpen } = useAppContext()

  const [animations, setAnimations] = useState<string[]>([])
  const [color, setColor] = useState<ColorState>()
  const setHex = (hex: string, source?: ColorState['source']) =>
    setColor({
      hex,
      rgb: rgbToString(hexToRgb(hex)),
      source,
    })
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
    updateTitle(hex)
  }

  // Apply class to body
  useEffect(() => {
    if (!color) return
    const brightness = getPerceivedBrightness(hexToRgb(color.hex))
    if (brightness > 128) {
      document.body.classList.add('bg-light')
      document.body.classList.remove('bg-dark')
    } else {
      document.body.classList.add('bg-dark')
      document.body.classList.remove('bg-light')
    }
  }, [color])

  const animationTime = 2000 // todo: must match CSS animation duration
  const setBackgroundColor = (hex: string) =>
    void (document.body.style.backgroundColor = hex)

  const playAnimation = useCallback((hex: string) => {
    // const rgb = rgbToString(hexToRgb(hex))
    // if ([hex, rgb].includes(document.body.style.backgroundColor)) return
    setAnimations(animations =>
      animations.includes(hex) ? animations : [...animations, hex]
    )
    setTimeout(() => {
      setAnimations(animations => animations.filter(c => c !== hex))
      setBackgroundColor(hex)
    }, animationTime)
  }, [])

  useEffect(() => {
    if (!color) return

    // `<input type="color">` fires many events per second;
    // don't spam logs and animations when that happens.
    if (color.source === 'colorInput') return setBackgroundColor(color.hex)

    logColor(color.hex)
    playAnimation(color.hex)
  }, [color, playAnimation])

  const updateTitle = (hex: string) =>
    (document.title = `${hex.toUpperCase()} ${separatorChar} eyedropper.app`)

  const updateUrl = (hex: string) =>
    history.pushState(null, '', hex.toUpperCase())

  useEffect(() => {
    const handler = (_event: PopStateEvent) => void setHex(location.hash)
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

      // 🪲 handle bug where some browsers return RGBA instead of hex
      // <https://github.com/WICG/eyedropper-api/issues/31>
      let hex: string
      if (sRGBHex.startsWith('rgb')) hex = rgbToHex(sRGBHex).toUpperCase()
      else hex = sRGBHex.toUpperCase()

      // Update state
      setHex(hex)
      updateUrl(hex)
      updateTitle(hex)

      // If opened from bookmarklet, request close
      // todo: show a closing countdown animation
      if (window.opener) setTimeout(() => window.close(), 1000)

      // Copy to clipboard
      if (lastCopied === 'rgb') copy(rgbToString(hexToRgb(hex)), 'rgb')
      else copy(hex, 'hex')
    } catch (e) {
      console.log(chalk.italic(chalk.gray('User canceled selection')))
    } finally {
      setOpen(false)

      // Blur the eyedropper button to play its transition animation
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur()
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
          <div style={{ position: 'relative', display: 'flex' }}>
            <EyedropperButton
              onClick={pick}
              disabled={unsupported}
              isOpen={open}
            />
            {/* <BookmarkletNote /> */}
          </div>
          {unsupported && <Unsupported />}
          {color && (
            <CopyButton
              children={color.hex}
              copied={lastCopied === 'hex'}
              onClick={() => copy(color.hex, 'hex')}
            />
          )}
          {color && (
            <CopyButton
              children={color.rgb}
              copied={lastCopied === 'rgb'}
              onClick={() => copy(color.rgb, 'rgb')}
            />
          )}
          {color && (
            <InputColor
              value={color.hex}
              onChange={e =>
                setHex(e.currentTarget.value.toUpperCase(), 'colorInput')
              }
              onBlur={() => {
                logColor(color.hex)
                updateUrl(color.hex)
                updateTitle(color.hex)
                copy(
                  lastCopied === 'rgb' ? color.rgb : color.hex,
                  lastCopied ?? 'hex'
                )
              }}
            />
          )}
        </main>
        <Footer onRandomColorClick={pickRandomColor} />
      </div>
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
