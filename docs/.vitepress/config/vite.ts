import Font from 'vite-plugin-font'
import { defineConfig } from 'vite'
import externalGlobals from 'rollup-plugin-external-globals'
import viteCompression from 'vite-plugin-compression'
import { URL, fileURLToPath } from 'node:url'

// https://cn.vitejs.dev/config/
export default defineConfig({
  plugins: [
    Font.vite({
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
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../../.vitepress', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      external: ['mermaid'],
      plugins: [externalGlobals({ mermaid: 'mermaid' })]
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
})
