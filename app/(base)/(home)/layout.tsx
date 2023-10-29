
const HomeLayout = ({ children, ...props }: LayoutProps) => {
    return (<>
            {children}
    </>
    );
}

type LayoutProps = {
    children: React.ReactNode,
} & { [key: string]: React.ReactNode }

export default HomeLayout;