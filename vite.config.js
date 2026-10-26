import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.mov', '**/*.mp4', '**/*.avi', '**/*.mkv'],
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/.git/**']
    }
  }
})
