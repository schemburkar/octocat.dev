import Header from '../../components/header';
import Container from '../../components/container';
import Layout from '../../components/layout';

const HomeLayout = ({ children }: LayoutProps) => {
    return (<>
        <Layout>
            <Container >
                <Header />
                {children}
            </Container>
        </Layout>
    </>
    );
}

type LayoutProps = {
    children: React.ReactNode,
};

export default HomeLayout;