import { routes } from '@food-app/frontend/utils';
import { NavigationMenuObjectsListRO } from '@food-app/frontend/ui';

export const NavigationMenuItems: NavigationMenuObjectsListRO = [
  {
    children: [],
    icon: null,
    route: routes.ingredients.index(),
    title: 'Ingredients',
    access: true,
  },
];
