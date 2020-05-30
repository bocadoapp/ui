import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dropdown } from '../../'

const variants = {
  hidden: {
    opacity: 0,
    y: -10
  },
  visible: {
    display: 'flex',
    opacity: 1,
    y: 0
  }
}

export const Default = () => (
  <Dropdown>
    {({ getTriggerProps, getMenuProps, isOpen, toggleOpen }) => (
        <>
          <div {...getTriggerProps()}>
            trigger
          </div>
          {isOpen && (
            <div {...getMenuProps()}>
              content y tal
            </div>
          )}
        </>
    )}
  </Dropdown>
)

export const OnClickDisappear = () => (
  <Dropdown>
    {({ getTriggerProps, getMenuProps, isOpen, toggleOpen }) => (
      <>
        <div {...getTriggerProps()}>
          trigger
        </div>
        {isOpen && (
          <div {...getMenuProps()} onClick={() => toggleOpen(!isOpen)}>
            content y tal
          </div>
        )}
      </>
    )}
  </Dropdown>
)

export const Animated = () => (
  <Dropdown>
    {({ getTriggerProps, getMenuProps, isOpen, toggleOpen }) => (
      <>
        <div {...getTriggerProps()}>
          trigger
        </div>
        <AnimatePresence exitBeforeEnter>
          {isOpen && (
            <motion.div
              {...getMenuProps()}
              variants={variants}
              animate='visible'
              initial='hidden'
              exit='hidden'
            >
              content y tal
            </motion.div>
          )}            
        </AnimatePresence>
      </>
    )}
  </Dropdown>
)

export const AnimateOnClickDisappear = () => (
  <Dropdown>
    {({ getTriggerProps, getMenuProps, isOpen, toggleOpen }) => (
      <>
        <div {...getTriggerProps()}>
          trigger
        </div>
        <AnimatePresence exitBeforeEnter>
          {isOpen && (
            <motion.div
              {...getMenuProps()}
              variants={variants}
              animate='visible'
              initial='hidden'
              exit='hidden'
              onClick={() => toggleOpen(!isOpen)}
            >
              content y tal
            </motion.div>
          )}            
        </AnimatePresence>
      </>
    )}
  </Dropdown>
)

export default { title: 'Dropdown', component: Dropdown }
