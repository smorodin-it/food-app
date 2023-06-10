import { ReactElement } from 'react';

interface NavigationMenuObject {
  title: string;
  route: string;
  icon: ReactElement | null;
  children: ReadonlyArray<Omit<NavigationMenuObject, 'children'>>;
  access: boolean;
}
export type NavigationMenuObjectRO = Readonly<NavigationMenuObject>;
export type NavigationMenuObjectsListRO = ReadonlyArray<NavigationMenuObjectRO>;
