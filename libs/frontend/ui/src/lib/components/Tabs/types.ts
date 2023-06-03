export interface TabsContainerProps {
  title: string;
  tabKey?: string;
  className?: string;
  titleBlock?: React.ReactNode;
  sideBarBlock?: React.ReactNode;
  xsSideBar?: number;
  smSideBar?: number;
  mdSideBar?: number;
  spacingGrid?: number;
  children:
    | React.ReactElement<TabItemProps>[]
    | React.ReactElement<TabItemProps>;
}

export interface TabItemProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}
