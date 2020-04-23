import React, { useRef ,useState, useCallback } from 'react'
import cn from 'classnames'

import './dropdown.scss'

function Dropdown (props) {
  const [open, toggleOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const refs = {
    wrapper: useRef(null),
    trigger: useRef(null),
    menu: useRef(null)
  }

  const handleOnClick = useCallback(() => {
    toggleOpen(!open)

    if (props.onClick) {
      props.onClick()
    }
  }, [props.onClick, toggleOpen, open])

  React.useEffect(() => {
    if (mounted && open) {
      const outerClick = e => {
        if (!refs.wrapper.current.contains(e.target)) {
          toggleOpen(false)
        }
      }

      let left = (refs.menu.current.offsetWidth / 2) - (refs.trigger.current.offsetWidth / 2)
      const menuBounding = refs.menu.current.getBoundingClientRect()
      const triggerBounding = refs.trigger.current.getBoundingClientRect()
      const width = Math.max(menuBounding.width, triggerBounding.width)
      const rightDiff = window.innerWidth - (triggerBounding.right + width / 2)
      const leftDiff = triggerBounding.left - menuBounding.width / 2

      if (rightDiff < 0) {
        left = left - rightDiff
      }

      if (leftDiff < 0) {
        left = left + leftDiff
      }

      refs.menu.current.style.left = `-${left}px`
      document.addEventListener('click', outerClick)
      return () => document.removeEventListener('click', outerClick)
    }
  }, [mounted, open, refs])

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div
      className={cn('dropdown', props.className)}
      ref={refs.wrapper}
      key={`dropdown-${props.className}`}
    >
      <div className='dropdown-trigger' onClick={handleOnClick} ref={refs.trigger}>
        {props.children[0]}
      </div>
      {
          open && (
            <div
              // initial='hidden'
              // exit='hidden'
              // animate='visible'
              // variants={variants}
              className='dropdown-menu'
              key={props.className}
              ref={refs.menu}
              style={props.width ? { width: props.width } : {}}
            >
              <ul>{props.children[1]}</ul>
            </div>
          )
      }
    </div>
  )
}

Dropdown.Trigger = ({ children }) => children
Dropdown.Menu = ({ children }) => children
Dropdown.Item = ({ children }) => <li>{children}</li>

export default Dropdown