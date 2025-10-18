import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/study-doro/', // IMPORTANT since it’s served under /study-doro
})
