import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
import externalGlobals from 'rollup-plugin-external-globals'
import viteFont from 'vite-plugin-font'

// https://cn.vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteFont({
      scanFiles: {
        // ?subsets 将会匹配 default
        default: ['docs/**/*.{json,js,jsx,ts,tsx,vue,md}']
      },
      css: {
        fontWeight: false
      }
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br'
    })
  ],
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  build: {
    rollupOptions: {
      external: ['mermaid'],
      plugins: [externalGlobals({ mermaid: 'mermaid' })]
    }
  }
})
