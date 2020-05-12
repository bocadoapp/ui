import React from 'react'

import Dropdown, { Trigger, Menu } from './dropdown'

export const Default = () => (
  <Dropdown>
    <Trigger>
      trigger
    </Trigger>
    <Menu>
      menu
    </Menu>
  </Dropdown>
)

export default { title: 'Dropdown', component: Dropdown }
