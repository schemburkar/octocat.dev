
const HomeLayout = ({ children, ...props }: LayoutProps) => {
    return (<>
            {children}
    </>
    );
}

type LayoutProps = {
    children: React.ReactNode
} 
export default HomeLayout;