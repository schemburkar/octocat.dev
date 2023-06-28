import React, { FC } from 'react'
import Alert from './alert'
import Footer from './footer'
import { BuyMeCoffee } from './BuyMeCoffee'

type LayoutProps = { children: React.ReactNode }
const Layout = ({ children }:LayoutProps) => {
  return (
    <>
      <main className={`min-h-screen`}>
        {children}
      </main>
      <Footer />
      <BuyMeCoffee />
      <Alert />
    </>
  )
}

export default Layout;