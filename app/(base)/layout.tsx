
import Container from '../../components/container';
import Header from '../../components/header';
import Layout from '../../components/layout';
import SearchButton from '../../components/SearchButton';



const HomeLayout = ({ children }: LayoutProps) => {
    return (<>
        <Layout>
            <Container compact>
                <Header>
                    <SearchButton className={'hidden md:block'} />
                </Header>
                {children}
            </Container>
        </Layout>
    </>
    );
}

type LayoutProps = {
    children: React.ReactNode,
} & { [key: string]: React.ReactNode }

export default HomeLayout;