import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

import './Button.css'

type Variant = 'primary' | 'ghost'
type Size = 'md' | 'sm'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant = 'primary',
    size = 'md',
    icon,
    fullWidth = false,
    className,
    children,
    ...rest
  } = props

  const classes = [
    'ui-button',
    `ui-button--${variant}`,
    `ui-button--${size}`,
    fullWidth ? 'ui-button--full' : null,
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button ref={ref} className={classes} {...rest}>
      {icon && <span className="ui-button__icon">{icon}</span>}
      <span>{children}</span>
    </button>
  )
})

Button.displayName = 'Button'

export default Button

