import { useEffect, useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [color, setColor] = useState<string>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (color) document.body.style.backgroundColor = color
  }, [color])

  async function pick() {
    try {
      if (!window.EyeDropper)
        throw new Error('EyeDropper not supported in this browser')
      const dropper = new window.EyeDropper()
      setOpen(true)
      const color = await dropper.open()
      if (color) console.log(color.sRGBHex)
      setColor(color?.sRGBHex)
    } catch (e) {
      console.error(e)
    } finally {
      setOpen(false)
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card" style={{ backgroundColor: color }}>
        <button onClick={pick}>
          {open
            ? 'Click anywhere on the screen to select a color, or press ESCAPE to cancel.'
            : 'Pick a color'}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
