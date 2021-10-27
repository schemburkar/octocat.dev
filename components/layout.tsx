import React, { FC } from 'react'
import Alert from './alert'
import Footer from './footer'
import Meta from './meta'



type LayoutProps = {
  preview?: boolean
}

const Layout: FC<LayoutProps> = ({ preview, children }) => {
  return (
    <>
      <Meta />
      <div className={`min-h-screen`}>
        <main>{children}</main>
      </div>
      <Footer />
      <Alert preview={preview} />
    </>
  )
}

export default Layout;