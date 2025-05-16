import { useRoutes } from 'react-router'
import type { RouteObject } from 'react-router'
import Layout from '@/layout'
import { lazy } from 'react'

const Home = lazy(() => import('@/pages/home'))

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '*',
    element: <Home />,
  },
]

export default function Routes() {
  return useRoutes(routes)
}
