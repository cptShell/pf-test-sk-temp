import { Component, type ErrorInfo, type ReactNode } from 'react'

import './RemoteErrorBoundary.css'

type Props = {
  children: ReactNode
  fallback?: ReactNode
}

type State = {
  hasError: boolean
  error?: Error
}

export class RemoteErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('[RemoteErrorBoundary] remote failed', error, info)
  }

  render() {
    const { children, fallback } = this.props
    const { hasError, error } = this.state

    if (hasError) {
      return (
        fallback || (
          <div className="remote-error">
            <h2>Не удалось загрузить микрофронтенд</h2>
            <p>Проверьте, что remote-приложение запущено и доступно по указанному URL.</p>
            {error?.message && <pre>{error.message}</pre>}
            <button type="button" onClick={() => this.setState({ hasError: false, error: undefined })}>
              Попробовать ещё раз
            </button>
          </div>
        )
      )
    }

    return children
  }
}

export default RemoteErrorBoundary

