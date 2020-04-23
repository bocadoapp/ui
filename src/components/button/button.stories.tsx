import React from 'react'
// import { action } from '@storybook/addon-actions'
import Button from './button'

export default {
  title: 'Button',
  component: Button,
}

export const Default = () => <Button />
export const Success = () => <Button style='success' />
export const SuccessOutline = () => <Button style='success' outline />
export const SuccessOutlineLoading = () => <Button style='success' outline loading />
export const Error = () => <Button style='error' />
export const Dark = () => <Button style='dark' />
export const DarkOutline = () => <Button style='dark' outline />
export const Small = () => <Button size='sm' />
export const Loading = () => <Button loading />
export const WithClassnameShadow = () => <Button className='shadow-md' />
export const Wrapper = () => (
  <div className='w-full max-w-xs'>
    <Button />
  </div>
)
