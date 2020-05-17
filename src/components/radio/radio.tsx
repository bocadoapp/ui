import React, { forwardRef } from "react"

import './radio.scss'

const Radio = forwardRef((props: any, ref: any) => {  
  return (
    <input
      ref={ref}
      type="radio"
      {...props}
    />
  )
})

Radio.defaultProps = {
  onChange: () => {},
  name: 'radio',
  checked: false
}

export default Radio