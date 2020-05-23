import React, { useState, useEffect, useRef } from 'react'
import cn from 'classnames'
import { INotification } from './notification.d'

import './notification.scss'

function Notification (props: INotification) {
  const [mounted, setMounted] = useState(true)
  const timeout = useRef(null)
  const { style, children, onDisappear, disappear, delay, type, size } = props

  useEffect(() => {
    if (disappear) {
      timeout.current = setTimeout(() => {
        setMounted(false)

        if (onDisappear) {
          onDisappear()
        }
      }, delay)
    }
    setMounted(true)

    return () => {
      clearTimeout(timeout.current)
      timeout.current = null
    }
  }, [])

  const className = cn(
    'notification',
    props.className,
    type,
    size
  )

  if (!mounted) {
    return null
  }

  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

Notification.defaultProps = {
  children: 'Notification',
  disappear: true,
  delay: 3000,
  type: 'default',
  size: 'md',
  className: '',
  onDisappear: null,
  style: {}
}

export default Notification
