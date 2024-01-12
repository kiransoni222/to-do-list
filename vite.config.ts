import { resolve } from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const root = resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@actions": resolve(root, 'store/actions'),
      "@reducers": resolve(root, 'store/reducers'),
      "@shared": resolve(root, 'shared'),
    }
  }
})
