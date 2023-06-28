import React, { FC } from 'react'
import Alert from './alert'
import Footer from './footer'
import { BuyMeCoffee } from './BuyMeCoffee'
import Header from './header'
import SearchButton from './SearchButton'
import Container from './container'

type LayoutProps = { children: React.ReactNode }
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header>
        <SearchButton className={'hidden md:block'} />
      </Header>

      <main className={`min-h-screen container mx-auto px-2 lg:px-5`}>
        {children}
      </main>
      <Footer />
      <BuyMeCoffee />
      <Alert />
    </>
  )
}

export default Layout;