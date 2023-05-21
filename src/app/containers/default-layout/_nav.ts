import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Home',
    url: '/views/home',
    iconComponent: { name: 'cil-home' }
  },
  {
    title: true,
    name: 'MENU'
  },
  {
    name: 'Spendings',
    url: '/views/spendings',
    iconComponent: { name: 'cil-Dollar' }
  },
  {
    name: 'Revenues',
    url: '/views/revenues',
    iconComponent: { name: 'cil-Dollar' }
  },
  {
    name: 'Registrations',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Cards',
        url: '/views/cards',
        iconComponent: { name: 'cil-CreditCard' }
      },
      {
        name: 'Category',
        url: '/views/category',
        iconComponent: { name: 'cil-CreditCard' }
      },
    ]
  },
  {
    name: 'Setup',
    url: '/views/setup',
    linkProps: { fragment: 'someAnchor' },
    iconComponent: { name: 'cil-ApplicationsSettings' }
  },
];
