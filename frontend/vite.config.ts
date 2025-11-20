import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  define: {
    VITE_API_BASE_URL: JSON.stringify('http://127.0.0.1:8000/admin'),

  },
  server: {
    // 在开发模式下把 /api 前缀代理到后端，避免浏览器的 CORS Preflight
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'~': path.resolve(__dirname, 'src/assets')
		}
	},
})
