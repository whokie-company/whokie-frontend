import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import CookieRecordPage from '@/pages/CookieRecordPage'
import CreateGroupPage from '@/pages/CreateGroupPage'
import ErrorPage from '@/pages/ErrorPage'
import GroupMembersPage from '@/pages/GroupMembersPage'
import GroupPage from '@/pages/GroupPage'
import QuestionManagement from '@/pages/GroupPage/Management/Questions'
import GroupQuestionPage from '@/pages/GroupQuestionPage'
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
import ProfileQuestionPage from '@/pages/ProfileQuestionPage'

import { ProtectedRoute } from './ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            element: <MainPage />,
          },
          {
            path: '/:groupId',
            element: <GroupQuestionPage />,
          },
          {
            path: '/mypage/:userId',
            element: <MyPage />,
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
            path: '/group/:groupId/QM',
            element: <QuestionManagement />,
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
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/login/redirect',
        element: <LoginRedirectPage />,
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
    element: <GroupMemberLayout />,
    children: [
      { path: '/group/:groupId/members', element: <GroupMembersPage /> },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

export const Routes = () => {
  return <RouterProvider router={router} />
}
