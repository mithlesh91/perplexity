import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({children}) => {
  const user = useSelector(state=>state.auth.user)
  const loading = useSelector(state=>state.auth.loading)

  if(loading){
	return <main>Loading....</main>
  }

if(!user){
	return <Navigate to="/login" replace />
}

  return children
}

export default ProtectedRoute
