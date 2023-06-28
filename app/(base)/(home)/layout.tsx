import Header from '../../../components/header';
import Container from '../../../components/container';
import SearchButton from '../../../components/SearchButton';

const HomeLayout = ({ children, ...props }: LayoutProps) => {
    return (<>
            {/* <Header >
                <SearchButton className={'hidden md:block'} />
            </Header> */}
            {children}
    </>
    );
}

type LayoutProps = {
    children: React.ReactNode,
} & { [key: string]: React.ReactNode }

export default HomeLayout;