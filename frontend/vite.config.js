import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api/v1/users': 'https://expense-tracker-1-rke4.onrender.com',
      '/api/v1/expenses': 'https://expense-tracker-1-rke4.onrender.com',
    },
  },
  plugins: [react(), tailwindcss(),],
})
