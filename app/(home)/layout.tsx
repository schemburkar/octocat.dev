

import Header from '../../components/header';
import Container from '../../components/container';
import Layout from '../../components/layout';
import SearchButton from '../../components/SearchButton';


const HomeLayout = ({ children, ...props }: LayoutProps) => {
    return (<>
        {props?.modal}
        <Layout>
            <Container compact><Header ><SearchButton className={'hidden md:block'} /></Header>
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