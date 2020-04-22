import React from 'react'
// import { action } from '@storybook/addon-actions'
import Button from './button'

export default {
  title: 'Button',
  component: Button,
}

export const Default = () => <Button />
export const Small = () => <Button size='sm' />
export const Loading = () => <Button loading />
export const WithClassnameShadow = () => <Button className='shadow' />
export const Wrapper = () => (
  <div className='w-full max-w-xs'>
    <Button />
  </div>
)
