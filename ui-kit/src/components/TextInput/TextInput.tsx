import { ChangeEvent, forwardRef } from 'react'

import './TextInput.css'

export type TextInputProps = {
  value: string
  placeholder?: string
  disabled?: boolean
  onChange?: (value: string) => void
  onSubmit?: () => void
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ value, placeholder, disabled, onChange, onSubmit }, ref) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        onSubmit?.()
      }
    }

    return (
      <div className="ui-input-wrapper" data-disabled={disabled}>
        <input
          ref={ref}
          className="ui-input"
          type="text"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <span className="ui-input-focus-ring" />
      </div>
    )
  }
)

TextInput.displayName = 'TextInput'

export default TextInput

