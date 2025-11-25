import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

type SharedConfig = Record<
  string,
  {
    singleton?: boolean
    eager?: boolean
    requiredVersion?: string
  }
>

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'ui_kit',
      filename: 'remoteEntry.js',
      exposes: {
        './TextInput': './src/components/TextInput',
        './TodoItem': './src/components/TodoItem'
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: '^18.2.0'
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: '^18.2.0'
        }
      } satisfies SharedConfig
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 4174,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  preview: {
    port: 4174,
    cors: true
  }
})
