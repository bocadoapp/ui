import CSS from 'csstype'
import { MouseEvent } from 'react'

export interface IButton {
  children: any,
  loading: boolean,
  onClick: (e: MouseEvent<HTMLButtonElement>) => void,
  className: string,
  size: string,
  type: "button" | "submit" | "reset",
  styled: "default" | "gradient" | "success" | "error" | "dark",
  outline: boolean,
  disabled: boolean,
  style: CSS.Properties
}