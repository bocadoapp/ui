export type TDropdown<P> = React.FC<P> & {
  Trigger: React.FC,
  Menu: React.FC,
  Item: React.FC
}