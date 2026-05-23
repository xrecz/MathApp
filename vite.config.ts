import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'node:path'

export default defineConfig({
  base: './',
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'node_modules/katex/dist/katex.min.css', dest: 'katex' },
        { src: 'node_modules/katex/dist/katex.min.js',  dest: 'katex' },
        { src: 'node_modules/katex/dist/contrib/auto-render.min.js', dest: 'katex/contrib' },
        { src: 'node_modules/katex/dist/fonts/*',       dest: 'katex/fonts' }
      ]
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png', 'katex/**/*'],
      manifest: {
        name: 'MathLab DE',
        short_name: 'MathLab',
        description: 'Lokaler Mathematik-Lernpfad: Realschule → ML/Deep Learning.',
        start_url: '.',
        scope: '.',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#0b1020',
        theme_color: '#0b1020',
        lang: 'de-DE',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2,svg,png,ico,webmanifest}'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true
      }
    })
  ]
})
