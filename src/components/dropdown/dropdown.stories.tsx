import React from 'react'

import Dropdown from './dropdown'

export const Default = () => (
  <Dropdown>
    <Dropdown.Trigger>
      trigger
    </Dropdown.Trigger>
    <Dropdown.Menu>
      menu
    </Dropdown.Menu>
  </Dropdown>
)

export default { title: 'Dropdown', component: Dropdown }
