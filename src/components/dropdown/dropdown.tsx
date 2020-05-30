import React, { useRef, useState, useEffect } from 'react'
import cn from 'classnames'

import './dropdown.scss'

const Dropdown = (props: any) => {
  const { children } = props
  const refs = { wrapper: useRef(null), trigger: useRef(null), menu: useRef(null) }
  const [isOpen, toggleOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  function getTriggerProps() {
    return {
      onClick: handleOnClick,
      ref: refs.trigger,
      className: cn('dropdown-trigger'),
      key: 'dropdown-trigger'
    }
  }

  function getMenuProps () {
    return {
      className: 'dropdown-menu',
      key: 'dropdown-menu',
      ref: refs.menu
    }
  }

  function handleOnClick () {
    toggleOpen(!isOpen)
  }

  function outerClick (e) {
    return !refs.wrapper.current.contains(e.target) && toggleOpen(false)
  }

  useEffect(() => {
    if (!mounted) {
      return setMounted(true)
    }

    if (isOpen) {
      let left = (refs.menu.current.offsetWidth / 2) - (refs.trigger.current.offsetWidth / 2)
      const menuBounding = refs.menu.current.getBoundingClientRect()
      const triggerBounding = refs.trigger.current.getBoundingClientRect()
      const posWidth = Math.max(menuBounding.width, triggerBounding.width)
      const rightDiff = window.innerWidth - (triggerBounding.right + posWidth / 2)
      const leftDiff = triggerBounding.left - menuBounding.width / 2
  
      if (rightDiff < 0) {
        left = left - rightDiff
      }
  
      if (leftDiff < 0) {
        left = left + leftDiff
      }
  
      refs.menu.current.style.left = `-${left}px`
    }

    document.addEventListener('click', outerClick)

    return () => document.removeEventListener('click', outerClick)
  }, [mounted, isOpen])

  return (
    <div
      className={cn('dropdown', props.className)}
      ref={refs.wrapper}
      key={`dropdown-${props.className}`}
    >
      {children({ getTriggerProps, getMenuProps, isOpen, toggleOpen, handleOnClick })}
    </div>
  )
}

export default Dropdown