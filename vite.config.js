import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [
    vue({ 
      template: { transformAssetUrls }
    }),
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
  ],
  define: { 'process.env': {
    'VUE_APP_API_DEV_URL' : process.env.VUE_APP_API_DEV_URL,
    'VUE_APP_TEMP_TOKEN' : process.env.VUE_APP_TEMP_TOKEN
  } },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
})
