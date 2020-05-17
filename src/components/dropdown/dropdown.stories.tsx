import React from 'react'
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
    <Dropdown.Trigger>
      trigger
    </Dropdown.Trigger>
    <Dropdown.Menu>
      <div>
        content y tal
      </div>
    </Dropdown.Menu>
  </Dropdown>
)

export const Animated = () => (
  <Dropdown>
    <Dropdown.Trigger>
      trigger
    </Dropdown.Trigger>
    <Dropdown.Menu
      variants={variants} 
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      <div>
        content y tal
      </div>
    </Dropdown.Menu>
  </Dropdown>
)

export default { title: 'Dropdown', component: Dropdown }
