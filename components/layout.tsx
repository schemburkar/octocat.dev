import React, { FC } from 'react'
import Alert from './alert'
import Footer from './footer'
import Meta from './meta'

const Layout: FC = ({ children }) => {
  return (
    <>
      <Meta />
      <div className={`min-h-screen`}>
        <main>{children}</main>
      </div>
      <Footer />
      <Alert />
    </>
  )
}

export default Layout;