import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

function buildVersionPlugin() {
  // Capture the version ONCE so the value baked into the bundle
  // (__BUILD_VERSION__) and the value written to version.json are identical.
  const version = Date.now().toString()
  return {
    name: 'build-version',
    apply: 'build',
    closeBundle() {
      writeFileSync(
        resolve(process.cwd(), 'dist', 'version.json'),
        JSON.stringify({ version })
      )
    },
    config() {
      return {
        define: {
          __BUILD_VERSION__: JSON.stringify(version),
        },
      }
    },
  }
}

export default defineConfig({
  // Tailwind is used only by the /ai-generalist-os route (src/ai-os). It is
  // imported there without preflight and unlayered, so it adds utilities
  // without touching the rest of the site's CSS — see src/ai-os/ai-os.css.
  plugins: [react(), tailwindcss(), buildVersionPlugin()],
})
