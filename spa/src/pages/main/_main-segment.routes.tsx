import { RouteObject } from 'react-router-dom';
import MainSegment from './_main.segment';
import { HomePage } from './Home/Home.page';
import { Account } from './Account/Account';

export default [
  {
    path: '/',
    element: <MainSegment />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/account',
        element: <Account />,
      },
    ],
  },
] as RouteObject[];
