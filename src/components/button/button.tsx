import React from "react"
import cn from 'classnames'

import { IButton } from './button.d'
import Loading from './loading'
import './button.scss'

function Button (props: IButton) {
  const { disabled, styled, style, type, size, loading, onClick, children, outline } = props
  const className = cn(
    'button',
    size,
    props.className,
    loading && 'loading',
    disabled && 'disabled',
    styled ? styled : !props.className ? 'default' : '',
    outline && 'outline'
  )

  return (
    <button
      type={type}
      className={className}
      disabled={disabled || loading}
      onClick={onClick}
      style={style}
    >
      {loading ? <Loading /> : children}
    </button>
  )
}

Button.defaultProps = {
  type: 'button',
  size: 'md',
  className: '',
  loading: false,
  children: 'Button',
  onClick: () => {},
  styled: '',
  outline: false,
  style: {},
  disabled: false
}

export default Button