export interface IButton {
  children: any,
  loading: boolean,
  onClick(): undefined,
  className: string,
  size: string,
  type: "button" | "submit" | "reset",
  style: "default" | "success" | "error" | "dark",
  outline: boolean,
  disabled: boolean
}