import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { useMediaQuery } from '@chakra-ui/react'

import {
  CreateGroupPage,
  GroupPage,
  MemberManagementPage,
  QuestionManagementPage,
} from '@/pages'
import ComingSoonPage from '@/pages/ComingSoonPage'
import CookieRecordPage from '@/pages/CookieRecordPage'
import ErrorPage from '@/pages/ErrorPage'
import InvitePage from '@/pages/InvitePage'
import { CardLayout } from '@/pages/Layout/CardLayout'
import { GroupMemberLayout } from '@/pages/Layout/GroupMemberLayout'
import { MainLayout } from '@/pages/Layout/MainLayout'
import { ProfileQuestionLayout } from '@/pages/Layout/ProfileQuestionLayout'
import LoginPage from '@/pages/LoginPage'
import LoginRedirectPage from '@/pages/LoginRedirectPage'
import MainPage from '@/pages/MainPage'
import MyPage from '@/pages/MyPage'
import PointPage from '@/pages/PointPage'
import PointCancelModal from '@/pages/PointPage/PointCancelModal'
import PointFailureModal from '@/pages/PointPage/PointFailureModal'
import PointRedirectPage from '@/pages/PointRedirectPage'
import ProfileQuestionPage from '@/pages/ProfileQuestionPage'
import RegisterPage from '@/pages/RegisterPage'

import { ProtectedRoute } from './ProtectedRoute'

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
        element: <MyPage />,
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
    return <ComingSoonPage />
  }

  return <RouterProvider router={router} />
}
