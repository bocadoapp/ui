import React from 'react'
// import { action } from '@storybook/addon-actions'
import { Notification } from '../../'

export default {
  title: 'Notification',
  component: Notification,
}

export const Default = () => <Notification />
export const Success = () => <Notification type='success' />
export const Error = () => <Notification type='error' />
export const DoesntDisappear = () => <Notification disappear={false} />
