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

  const doReload = () => {
    if (reloading) return
    // Guard against reload storms: right after a deploy a CDN edge may
    // briefly serve a stale index.html (old bundle) while version.json
    // is already new. Without this, such a tab would reload forever.
    try {
      const last = Number(sessionStorage.getItem('__vrl') || 0)
      if (Date.now() - last < 20000) return
      sessionStorage.setItem('__vrl', String(Date.now()))
    } catch { /* sessionStorage blocked (private mode) — proceed once */ }
    reloading = true
    window.location.reload()
  }

  const check = async () => {
    // Skip while hidden; a visible/focus/pageshow event re-triggers it.
    if (reloading || document.visibilityState === 'hidden') return
    try {
      const res = await fetch(`/version.json?t=${Date.now()}`, { cache: 'no-store' })
      if (!res.ok) return
      const { version } = await res.json()
      if (version && version !== CURRENT_BUILD) doReload()
    } catch { /* offline / fetch failed — try again next tick */ }
  }

  setTimeout(check, 3000)
  setInterval(check, 60000)

  // Cover every "user is back on the page" path across desktop & mobile:
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') check()
  })
  window.addEventListener('focus', check)
  window.addEventListener('online', check)
  // Safari / mobile back-forward cache: page restored from memory without
  // re-running any JS — `pageshow` with persisted=true is the only signal.
  window.addEventListener('pageshow', (e) => { if (e.persisted) check() })
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
