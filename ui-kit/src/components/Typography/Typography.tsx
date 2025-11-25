import { forwardRef } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'

import './Typography.css'

type Variant = 'eyebrow' | 'display' | 'title' | 'body' | 'caption'
type Color = 'default' | 'muted' | 'accent' | 'success' | 'danger' | 'inverse'
type Align = 'start' | 'center' | 'end'
type Weight = 'regular' | 'medium' | 'bold'
type AllowedTag = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'div' | 'label'

const variantToTag: Record<Variant, AllowedTag> = {
  eyebrow: 'p',
  display: 'h1',
  title: 'h2',
  body: 'p',
  caption: 'span'
}

export type TypographyProps = HTMLAttributes<HTMLElement> & {
  as?: AllowedTag
  variant?: Variant
  color?: Color
  align?: Align
  weight?: Weight
  transform?: 'none' | 'uppercase'
  children: ReactNode
  className?: string
}

export const Typography = forwardRef<HTMLElement, TypographyProps>((props, ref) => {
  const {
    as,
    variant = 'body',
    color = 'default',
    align = 'start',
    weight = 'regular',
    transform = 'none',
    className,
    children,
    ...rest
  } = props

  const Tag = (as || variantToTag[variant] || 'p') as AllowedTag
  const classes = [
    'ui-typography',
    `ui-typography--${variant}`,
    `ui-typography--color-${color}`,
    `ui-typography--align-${align}`,
    `ui-typography--weight-${weight}`,
    transform === 'uppercase' ? 'ui-typography--uppercase' : null,
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag ref={ref as any} className={classes} {...rest}>
      {children}
    </Tag>
  )
})

Typography.displayName = 'Typography'

export default Typography

