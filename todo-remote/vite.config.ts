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

export default defineConfig(({ mode }) => {
  const uiKitRemoteUrl =
    process.env.VITE_UI_KIT_URL ||
    (mode === 'production'
      ? 'http://localhost:4174/assets/remoteEntry.js'
      : 'http://localhost:4174/assets/remoteEntry.js')

  const sharedDeps: SharedConfig = {
    react: {
      singleton: true,
      eager: true,
      requiredVersion: '^18.2.0'
    },
    'react-dom': {
      singleton: true,
      eager: true,
      requiredVersion: '^18.2.0'
    },
    zustand: {
      singleton: true,
      eager: true
    }
  }

  return {
    plugins: [
      react(),
      federation({
        name: 'todo_remote',
        filename: 'remoteEntry.js',
        remotes: {
          'ui-kit': uiKitRemoteUrl
        },
        exposes: {
          './TodoApp': './src/App.tsx'
        },
        shared: sharedDeps
      })
    ],
    build: {
      target: 'esnext',
      minify: false
    },
    server: {
      port: 4175,
      cors: true
    },
    preview: {
      port: 4175,
      cors: true
    }
  }
})
