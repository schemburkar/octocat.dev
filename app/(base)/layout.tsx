
import Header from '../../components/header';
import SearchButton from '../../components/SearchButton';
import Alert from '../../components/alert'
import Footer from '../../components/footer'
import { BuyMeCoffee } from '../../components/BuyMeCoffee'
const HomeLayout = ({ children }: LayoutProps) => {
    return (<>
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
    );
}

type LayoutProps = {
    children: React.ReactNode,
}

export default HomeLayout;