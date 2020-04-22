import React from "react"
import cn from 'classnames'

import { ReactComponent as Loading } from './loading.svg'
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
      {loading ? <Loading /> : children || 'Button'}
    </button>
  )
}

export default Button