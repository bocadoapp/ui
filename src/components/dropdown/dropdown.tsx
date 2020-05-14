import React, { useRef ,useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import cn from 'classnames'

import { TDropdown } from './dropdown.d'
import './dropdown.scss'

const variants = {
  hidden: {
    opacity: 0,
    y: -10
  },
  visible: {
    display: 'flex',
    opacity: 1,
    y: 10
  }
}

const Dropdown: TDropdown<any> = (props) => {
  const { width, children, className, onClick } = props
  const [open, toggleOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const refs = {
    wrapper: useRef(null),
    trigger: useRef(null),
    menu: useRef(null)
  }

  const onClickCb = useCallback(() => {
    toggleOpen(!open)

    if (onClick) {
      onClick()
    }
  }, [])

  useEffect(() => {
    if (!mounted) {
      setMounted(true)
    } else if (mounted && open) {
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

  if (!mounted) {
    return null
  }

  return (
    <div
      className={cn('dropdown', className)}
      ref={refs.wrapper}
      key={`dropdown-${className}`}
    >
      <div className='dropdown-trigger' onClick={onClickCb} ref={refs.trigger}>
        {children[0]}
      </div>
      {
        <AnimatePresence exitBeforeEnter>
          {open && (
            <motion.div
              initial='hidden'
              exit='hidden'
              animate='visible'
              variants={variants}
              className='dropdown-menu'
              key={className}
              ref={refs.menu}
              style={width ? { width: width } : {}}
            >
              <ul>{children[1]}</ul>
            </motion.div>
          )}
        </AnimatePresence>
      }
    </div>
  )
}

Dropdown.Trigger = ({ children }) => <>{children}</>
Dropdown.Menu = ({ children }) => <>{children}</>
Dropdown.Item = ({ children }) => <li>{children}</li>
Dropdown.Trigger.displayName = 'DropdownTrigger'
Dropdown.Menu.displayName = 'DropdownMenu'
Dropdown.Item.displayName = 'DropdownItem'

export default Dropdown