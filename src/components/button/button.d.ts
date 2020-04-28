import CSS from 'csstype'

export interface IButton {
  children: any,
  loading: boolean,
  onClick(): undefined,
  className: string,
  size: string,
  type: "button" | "submit" | "reset",
  styled: "default" | "gradient" | "success" | "error" | "dark",
  outline: boolean,
  disabled: boolean,
  style: CSS.Properties
}