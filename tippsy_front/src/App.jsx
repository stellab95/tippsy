import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CardList from './components/CardList'
import HomePage from './components/homePage/HomePage';
import CreatePost from './components/CreatePost';
import PostEdit from './components/PostEdit';
import CreatePostPage from './components/createPostePage/CreatePostPage';
import PostEditPage from './components/postEditPage/PostEditPage';
import Login from './components/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: < HomePage />
  },
  {
    path: '/createpost',
    element: <CreatePost />
  },
  {
    path: '/posts/:id/edit',
    element: <PostEditPage />
  },
  {
    path: '/createpostpage',
    element: <CreatePostPage />
  },
  {
  path: '/login',
  element: <Login />
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
