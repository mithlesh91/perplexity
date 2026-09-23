import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useAuth } from '../Features/Auth/Hook/Auth.use.js'
import router from './Approuter.jsx'
const App = () => {
  const { handleGetUser } = useAuth()

  useEffect(() => {
    handleGetUser()
  }, [])

  return (
    <>
    
      <RouterProvider router={router} />
    </>

  )
}

export default App
