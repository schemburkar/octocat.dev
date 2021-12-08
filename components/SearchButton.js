import Router from 'next/router';

const search = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
</svg>

const SearchButton = ({ className }) => {
    console.log(Router)
    return <button className={`${className} mx-8 border-gray-500 border px-2 py-0.5 rounded-md cursor-text w-full md:w-60`}
        onClick={() => Router.push('/search', Router.asPath)}>{search}{'Search'}</button>;

};
export default SearchButton;