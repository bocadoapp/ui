import React from "react"
import cn from 'classnames'

import { IButton } from './button.d'
import Loading from './loading'
import './button.scss'

function Button (props: IButton) {
  const { style, type, size, loading, onClick, children, outline } = props
  const className = cn(
    'button',
    size,
    props.className,
    loading && 'loading',
    style,
    outline && 'outline'
  )

  return (
    <button
      type={type}
      className={className}
      disabled={loading}
      onClick={onClick}
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
  style: 'default',
  outline: false
}

export default Button