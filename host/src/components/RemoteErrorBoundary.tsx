import { Component, type ErrorInfo, type ReactNode, Suspense, lazy, type ComponentType } from 'react'
import type { ButtonProps } from 'ui-kit/Button'

import './RemoteErrorBoundary.css'

// @ts-expect-error Remote module provided via Module Federation
const RemoteButton = lazy<ComponentType<ButtonProps>>(() => import('ui_kit/Button'))

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

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
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
            <Suspense
              fallback={
                <button type="button" className="remote-error__fallback-button" onClick={this.handleRetry}>
                  Попробовать ещё раз
                </button>
              }
            >
              <RemoteButton variant="ghost" size="sm" onClick={this.handleRetry}>
                Попробовать ещё раз
              </RemoteButton>
            </Suspense>
          </div>
        )
      )
    }

    return children
  }
}

export default RemoteErrorBoundary

