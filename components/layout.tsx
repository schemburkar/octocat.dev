import React, { FC } from 'react'
import Alert from './alert'
import Footer from './footer'
import Meta from './meta'
import { BuyMeCoffee } from './BuyMeCoffee'

const Layout: FC = ({ children }) => {
  return (
    <>
      <Meta />
      <div className={`min-h-screen`}>
        <main>{children}</main>
      </div>
      <Footer />
      <BuyMeCoffee />
      <Alert />
    </>
  )
}

export default Layout;