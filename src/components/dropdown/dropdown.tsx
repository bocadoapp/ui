import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  cloneElement,
  Children,
  forwardRef,
  isValidElement,
  memo
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import cn from 'classnames'

import { TDropdown } from './dropdown.d'
import './dropdown.scss'

interface IChild {
  children?: React.ReactNode
}

const renderDropdownElements = (children: React.ReactNode, props: any, refs) => {  
  return Children.map(children, (child: React.ReactElement<IChild>) => {
    if (!isValidElement(child)) {
      return child
    }

    if (child.type === Dropdown.Trigger) {
      return cloneElement(child, {
        ...props,
        ...child.props,
        ref: refs.DropdownTrigger
      })
    }

    if (child.type === Dropdown.Menu) {      
      return cloneElement(child, {
        ...props,
        ...child.props,
        ref: refs.DropdownMenu
      })      
    }

    if (child.props.children) {
      child = cloneElement(child, { children: renderDropdownElements(child.props.children, props, refs) })
    }

    return child
 })
}

const Dropdown: TDropdown<any> = (props) => {
  const { children, width, className, onClick } = props
  const [open, toggleOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const refs = {
    wrapper: useRef(null),
    DropdownTrigger: useRef(null),
    DropdownMenu: useRef(null)
  }

  const handleOnClick = useCallback(() => {
    toggleOpen(!open)

    if (onClick) {
      onClick()
    }
  }, [open, toggleOpen, onClick])

  const outerClick = useCallback(
    e => (!refs.wrapper.current.contains(e.target) && toggleOpen(false)),
    [toggleOpen, refs.wrapper]
  )

  useEffect(() => {
    if (!mounted) {
      return setMounted(true)
    }

    if (open) {
      let left = (refs.DropdownMenu.current.offsetWidth / 2) - (refs.DropdownTrigger.current.offsetWidth / 2)
      const menuBounding = refs.DropdownMenu.current.getBoundingClientRect()
      const triggerBounding = refs.DropdownTrigger.current.getBoundingClientRect()
      const posWidth = Math.max(menuBounding.width, triggerBounding.width)
      const rightDiff = window.innerWidth - (triggerBounding.right + posWidth / 2)
      const leftDiff = triggerBounding.left - menuBounding.width / 2
  
      if (rightDiff < 0) {
        left = left - rightDiff
      }
  
      if (leftDiff < 0) {
        left = left + leftDiff
      }
  
      refs.DropdownMenu.current.style.left = `-${left}px`
    }

    document.addEventListener('click', outerClick)

    return () => document.removeEventListener('click', outerClick)
  }, [mounted, open])
  
  return (
    <div
      className={cn('dropdown', className)}
      ref={refs.wrapper}
      key={`dropdown-${className}`}
    >
      {renderDropdownElements(
        typeof children === 'function' ? children({ open, handleOnClick }) : children,
        { open, handleOnClick },
        refs
      )}
    </div>
  )
}

Dropdown.Trigger = memo(forwardRef((props: any, ref: any) => {  
  return (
    <div
      key='dropdown-trigger'
      className='dropdown-trigger'
      onClick={props.handleOnClick}
      ref={ref}
    >
      {props.children}
    </div>
  )
}))

Dropdown.Menu = memo(forwardRef((props: any, ref: any) => {
  const { exit, open, variants, initial, animate, className, children } = props

  if (animate && initial) {
    return (
      <AnimatePresence exitBeforeEnter>
        {open && (
          <motion.div
            className='dropdown-menu'
            key={className}
            ref={ref}
            variants={variants}
            animate={animate}
            initial={initial}
            exit={exit}
          >  
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
  
  return open && (
    <div
      className='dropdown-menu'
      key={className}
      ref={ref}
    >  
      {children}
    </div>
  )
}))

Dropdown.displayName = 'Dropdown'
Dropdown.Trigger.displayName = 'DropdownTrigger'
Dropdown.Menu.displayName = 'DropdownMenu'

export default Dropdown