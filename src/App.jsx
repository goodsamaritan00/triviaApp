import { useState } from 'react'

// router
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

// layout
import { Root } from './layouts/Root'

// pages
import { Main } from './pages/Main'
import { Quiz } from './pages/Quiz'
import { End } from './pages/End'
import { HighScores } from './pages/HighScores'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route index element={<Main />} />
      <Route path='quiz' element={<Quiz />} />
      <Route path='end' element={<End />} />
      <Route path='highscores' element={<HighScores />} />
    </Route>
  )
)

function App() {
  const [count, setCount] = useState(0)

  return (
    <RouterProvider router={router} />
  )
}

export default App
