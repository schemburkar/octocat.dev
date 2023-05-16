import React, { FC } from 'react'
import Alert from './alert'
import Footer from './footer'
import { BuyMeCoffee } from './BuyMeCoffee'

type LayoutProps = { children: React.ReactNode }
const Layout = ({ children }:LayoutProps) => {
  return (
    <>
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