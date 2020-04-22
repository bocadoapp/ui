import React from "react"
import cn from 'classnames'

import './button.scss'

function Button ({
  children = 'Button',
  loading = false,
  handleOnClick = () => {},
  className = '',
  size = 'md'
}) {
  return (
    <button 
      className={cn('button', size, className && className, loading && 'loading')}
      disabled={loading}
      onClick={handleOnClick}
    >
      {children || 'Button'}
    </button>
  )
}

export default Button