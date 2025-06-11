import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/homePage/HomePage';
import CreatorProfilePage from './components/CreatorProfilePage/CreatorProfilePage';
import CreatePostPage from './components/createPostPage/CreatePostPage';
import PostEditPage from './components/postEditPage/PostEditPage';
import Login from './components/Login';
import Register from './components/Register';
import DeletePost from './components/deletePost';
import ProfileEdit from './components/ProfileEdit';
import MemberProfile from './components/MemberProfile';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import UserProfilePage from './components/userProfilePage/UserProfilePage';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/users/:id', element: <UserProfilePage /> },
  { path: '/unauthorized', element: <Unauthorized /> },

  {
    element: <RequireAuth allowedRoles={['createur']} />,
    children: [
      { path: '/creatorprofile', element: <CreatorProfilePage /> },
      { path: '/createpost', element: <CreatePostPage /> },
      { path: '/posts/:id/edit', element: <PostEditPage /> },
      { path: '/posts/:id/delete', element: <DeletePost /> },
      { path: '/profileedit/:id', element: <ProfileEdit /> },
    ]
  },

  {
    element: <RequireAuth allowedRoles={['fan']} />,
    children: [
      { path: '/memberprofile', element: <MemberProfile /> }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
