import React from 'react'

export type TDropdown<P> = React.FC<P> & {
  Trigger: React.FC,
  Menu: any,
  // Item: React.FC
}