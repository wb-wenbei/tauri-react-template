import { useRoutes } from 'react-router'
import type { RouteObject } from 'react-router'
import Layout from '@/layout'
import RequireAuth from './requireAuth'
import { lazy } from 'react'

const Login = lazy(() => import('@/pages/login'))
const Home = lazy(() => import('@/pages/home'))

const routes: RouteObject[] = [
  {
    path: 'login',
    element: <Login />,
  },
  {
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]

export default function Routes() {
  return useRoutes(routes)
}
