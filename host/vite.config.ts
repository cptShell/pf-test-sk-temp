import { defineConfig, loadEnv } from 'vite'
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
  const env = loadEnv(mode, process.cwd(), '')
  const todoRemoteUrl =
    env.VITE_TODO_REMOTE_URL ||
    (mode === 'production'
      ? 'http://localhost:4175/assets/remoteEntry.js'
      : 'http://localhost:4175/assets/remoteEntry.js')
  const uiKitRemoteUrl =
    env.VITE_UI_KIT_URL ||
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
      eager: true,
      requiredVersion: '^4.3.2'
    }
  }

  return {
    plugins: [
      react(),
      federation({
        name: 'todo_host',
        remotes: {
          'todo_remote': todoRemoteUrl,
          'ui_kit': uiKitRemoteUrl
        },
        shared: sharedDeps
      })
    ],
    build: {
      target: 'esnext',
      minify: false
    },
    server: {
      port: 4173,
      cors: true
    },
    preview: {
      port: 4173,
      cors: true
    }
  }
})
