import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  define: {
    'process.env': {
      VITE_API_BASE_URL: JSON.stringify('http://127.0.0.1:8000/admin'),
    }
  },
  resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'~': path.resolve(__dirname, 'src/assets')
		}
	},
})
