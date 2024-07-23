// routes.ts
import { RouteObject } from 'react-router-dom';
import Layout from '@components/layout/layout';
import HomeScreen  from '@screens/home';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true, 
        element: <HomeScreen />,
      },
    
    ],
  },
];

export default   routes;