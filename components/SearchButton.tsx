'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';

const search = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
</svg>
type SearchButtonProps = { className?: string }

const SearchButton = ({ className }: SearchButtonProps) => {
    const pathname = usePathname();

    if (pathname === '/search')
        return <ClearSearch>
            <button className={`mr-2 border-gray-500 border px-2 py-0.5 rounded-md cursor-text w-full md:w-60`}
            >{search}{'Search'}</button>
        </ClearSearch>;

    return <Link href={'/search'}><button className={`mr-2 border-gray-500 border px-2 py-0.5 rounded-md cursor-text w-full md:w-60`}
    >{search}{'Search'}</button></Link>;

};

const ClearSearch = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
    const onclick = () => {
        router.replace(`/search`);
        {/* @ts-ignore Raw JS */ }
        document.getElementById('search-input').value = ''
        document?.getElementById('search-input')?.focus();

    }
    return <div onClick={onclick} className="contents">
        {children}
    </div>
}
export default SearchButton;