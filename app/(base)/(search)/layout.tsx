
const HomeLayout = ({ children }: LayoutProps) => {
    return (<>
        <h2 className="text-3xl">Search</h2>
        {children}
    </>
    );
}

type LayoutProps = {
    children: React.ReactNode,
};

export default HomeLayout;