import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
const AdminAuth = ({children,adminOnly = false}) => {
  const user = useSelector((store) => store.user)
  if(!user){
    <Navigate to={"/"} />
  }
  if(adminOnly && user.role !=="admin"){
    return <Navigate to={"/"} />
  }
  return children
}

export default AdminAuth