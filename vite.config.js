/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'), // Thêm dòng này
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@libs': path.resolve(__dirname, 'src/libs'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@services': path.resolve(__dirname, 'src/services'),
    }
  }
})
