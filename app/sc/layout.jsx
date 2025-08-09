import React from 'react'
import NavBar from '../_components/navbar'
import { UserProvider } from '../_context/UserContext'

const layout = ({ children }) => {
  return (
    <div>
      <UserProvider>
        <NavBar />
        {children}
      </UserProvider>
    </div>
  )
}

export default layout
