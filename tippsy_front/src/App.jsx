import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/homePage/HomePage';
import CreatorProfilePage from './components/CreatorProfilePage/CreatorProfilePage';
import CreatePostPage from './components/createPostPage/CreatePostPage';
import PostEditPage from './components/postEditPage/PostEditPage';
import Login from './components/Login';
import Register from './components/Register';
import DeletePost from './components/deletePost';
import ProfileEdit from './components/ProfileEdit';
import CreatorProfile from './components/CreatorProfile';
import MemberProfile from './components/MemberProfile';

const router = createBrowserRouter([
  {
    path: '/',
    element: < HomePage />
  },
  {
    path: '/posts/:id/edit',
    element: <PostEditPage />
  },
  {
    path: '/createpost',
    element: <CreatePostPage />
  },
  {
  path: '/register',
  element: <Register />
  },
  {
  path: '/login',
  element: <Login />
  },
  {
  path: '/creatorprofile',
  element: <CreatorProfilePage />
  },
  {
    path: '/posts/:id/delete',
    element: <DeletePost />
  },
  {
    path: '/profileedit/:id',
    element: <ProfileEdit />
  },
  {path: '/memberprofile',
  element: <MemberProfile />
  }


])

function App() {
  return <RouterProvider router={router} />
}

export default App





// function App() {
//   return (
//     <>
//       < PostCard />
//       < TestCardList />
//     </>
//   )
// }

// export default App
