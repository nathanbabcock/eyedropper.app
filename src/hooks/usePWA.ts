import { useEffect } from 'react'

// import chalk from 'chalk'
// const log = console.log.bind(console, chalk.yellow('[pwa]'))

export function usePWA() {
  useEffect(() => {
    if (!isPWA()) return
    positionWindow()
  }, [])
}

export function isPWA() {
  const isChromePWA = window.matchMedia('(display-mode: standalone)').matches
  const isSafariPWA = (window.navigator as any).standalone
  const isAndroidPWA = document.referrer.includes('android-app://')
  return isChromePWA || isSafariPWA || isAndroidPWA
}

function positionWindow() {
  // https://issues.chromium.org/issues/41408600
  const width = 500
  const height = 500
  window.resizeTo(width, height)

  const left = Math.round(window.screen.width - window.innerWidth)
  const top = Math.round(window.screen.height - window.innerHeight)
  window.moveTo(left, top)
}
