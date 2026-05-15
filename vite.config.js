import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

function buildVersionPlugin() {
  return {
    name: 'build-version',
    apply: 'build',
    closeBundle() {
      const version = Date.now().toString()
      writeFileSync(
        resolve(process.cwd(), 'dist', 'version.json'),
        JSON.stringify({ version })
      )
    },
    config() {
      return {
        define: {
          __BUILD_VERSION__: JSON.stringify(Date.now().toString()),
        },
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), buildVersionPlugin()],
})
