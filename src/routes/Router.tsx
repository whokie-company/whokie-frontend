import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { useMediaQuery } from '@chakra-ui/react'

import {
  CardLayout,
  GroupMemberLayout,
  MainLayout,
  ProfileQuestionLayout,
} from '@/components'
import {
  CommingSoonPage,
  CookieRecordPage,
  CreateGroupPage,
  ErrorPage,
  GroupPage,
  InvitePage,
  LoginPage,
  LoginRedirectPage,
  MainPage,
  MemberManagementPage,
  PointCancelModal,
  PointFailureModal,
  PointPage,
  PointPurchasePage,
  PointRedirectPage,
  ProfilePage,
  ProfileQuestionPage,
  QuestionManagementPage,
  RegisterPage,
} from '@/pages'

import { ProtectedRoute } from './protected-route'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/',
            element: <MainPage />,
          },
          {
            path: '/cookie-record',
            element: <CookieRecordPage />,
          },
          {
            path: '/group/:groupId',
            element: <GroupPage />,
          },
          {
            path: '/group/:groupId/management',
            element: <QuestionManagementPage />,
          },
          {
            path: '/group/create',
            element: <CreateGroupPage />,
          },
          {
            path: '/point/purchase',
            element: <PointPurchasePage />,
          },
          {
            path: '/point',
            element: <PointPage />,
            children: [
              {
                path: '/point/redirect',
                element: <PointRedirectPage />,
              },
              {
                path: '/point/failure',
                element: <PointFailureModal />,
              },
              {
                path: '/point/cancel',
                element: <PointCancelModal />,
              },
            ],
          },
        ],
      },
      {
        element: <GroupMemberLayout />,
        children: [
          {
            path: '/group/:groupId/members',
            element: <MemberManagementPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <ProfileQuestionLayout />,
    children: [{ path: '/profile-question', element: <ProfileQuestionPage /> }],
  },
  {
    path: '/',
    element: <CardLayout />,
    children: [
      {
        path: '/invite/:groupId',
        element: <InvitePage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/login/redirect',
        element: <LoginRedirectPage />,
      },
      {
        path: '/mypage/:userId',
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '/',
    element: <ProfileQuestionLayout />,
    children: [{ path: '/profile-question', element: <ProfileQuestionPage /> }],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

export const Routes = () => {
  const [isMobile] = useMediaQuery('(max-width: 1024px)')

  if (isMobile) {
    return <CommingSoonPage />
  }

  return <RouterProvider router={router} />
}
