import { ESizes } from '../types'

export interface INotification {
  children: any,
  disappear: boolean,
  delay: number,
  type: 'default' | 'success' | 'error', 
  size: ESizes,
  className: string,
  onDisappear(): void
}
