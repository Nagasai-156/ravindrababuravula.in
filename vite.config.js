import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
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
  plugins: [react(), buildVersionPlugin()],
})
