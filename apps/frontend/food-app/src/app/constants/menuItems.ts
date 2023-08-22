import { routes } from '@food-app/frontend/utils';
import { NavigationMenuObjectsListRO } from '@food-app/frontend/ui';

export const NavigationMenuItems: NavigationMenuObjectsListRO = [
  {
    children: [],
    icon: null,
    route: routes.ingredients.list(),
    title: 'Ingredients',
    access: true,
  },
];
