import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'

const CURRENT_BUILD = typeof __BUILD_VERSION__ !== 'undefined' ? __BUILD_VERSION__ : 'dev'

function startVersionCheck() {
  if (CURRENT_BUILD === 'dev') return
  let reloading = false
  const check = async () => {
    if (reloading) return
    try {
      const res = await fetch(`/version.json?t=${Date.now()}`, { cache: 'no-store' })
      if (!res.ok) return
      const { version } = await res.json()
      if (version && version !== CURRENT_BUILD) {
        reloading = true
        window.location.reload()
      }
    } catch {}
  }
  setTimeout(check, 5000)
  setInterval(check, 60000)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') check()
  })
}

startVersionCheck()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
