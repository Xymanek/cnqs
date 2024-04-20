import { RouteObject } from 'react-router-dom';
import MainSegment from '@/pages/main/_main.segment';
import { HomePage } from './Home/Home.page';

export default [
  {
    path: '/',
    element: <MainSegment />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
] as RouteObject[];
