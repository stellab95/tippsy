import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/homePage/HomePage';
import CreatePost from './components/CreatePost';
import CreatorProfilePage from './components/CreatorProfilePage/CreatorProfilePage';
import CreatePostPage from './components/createPostPage/CreatePostPage';
import PostEditPage from './components/postEditPage/PostEditPage';
import Login from './components/Login';
import Register from './components/Register';
import DeletePost from './components/deletePost';

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
