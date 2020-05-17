import React, { useState } from 'react'
// import { action } from '@storybook/addon-actions'
import { Radio } from '../../'

export default {
  title: 'Radio',
  component: Radio,
}

export const Default = () => {
  const [checked, setChecked] = useState(1)
  return (
    <div className='flex flex-col'>
      <div className="flex">
        <Radio
          name='radio'
          checked={checked === 1}
          onChange={() => setChecked(1)}
        /> test1 
      </div>
      <div className="flex">
        <Radio
          name='radio'
          checked={checked === 2}
          onChange={() => setChecked(2)}        
        /> test 2
      </div>
    </div>
  )
}