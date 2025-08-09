import React from 'react'
import Navbar from './__components/navbar'
import { SellerProvider } from './_context/sellerContext'

const layout = ({ children }) => {
  return (
    <div>
      <SellerProvider>
        <Navbar />
        <div className='mt-4'>
          {children}
        </div>
      </SellerProvider>
    </div>
  )
}

export default layout
