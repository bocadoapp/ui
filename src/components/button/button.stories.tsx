import React from 'react'
// import { action } from '@storybook/addon-actions'
import Button from './button'

export default {
  title: 'Button',
  component: Button,
}

export const Default = () => <Button />
export const Gradient = () => <Button styled='gradient' />
export const Success = () => <Button styled='success' />
export const FacebookLogin = () => <Button className='bg-blue-700 text-white hover:bg-blue-800' />
export const SuccessOutline = () => <Button styled='success' outline />
export const SuccessOutlineLoading = () => <Button styled='success' outline loading />
export const Disabled = () => <Button disabled />
export const Error = () => <Button styled='error' />
export const Dark = () => <Button styled='dark' />
export const DarkOutline = () => <Button styled='dark' outline />
export const Small = () => <Button size='sm' />
export const Loading = () => <Button loading />
export const WithClassnameShadow = () => <Button className='shadow-md' />
export const Wrapper = () => (
  <div className='w-full max-w-xs'>
    <Button />
  </div>
)
