'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useTransition } from "react";
import { IItemDataForSearch } from "../../../lib/FileFormat";
import { searchFn } from "./SearchFunction";
import { SearchInput } from "./SearchInput";
import SearchList from "./SearchList";
import { SearchResult } from "./SearchResult";

const SearchClient = ({ items }: { items: IItemDataForSearch[] }) => {
    const router = useRouter();
    const query = useSearchParams()?.get('q') || '';
    const [results, setResults] = useState<SearchResult[]>();
    const [pending, start] = useTransition();
    //const [isSearching, setIsSearching] = useState<boolean>(false);

    const setSearch = (q: string) => {
        start(() => {
            router.replace(`/search?q=${encodeURIComponent(q)}`);
        })
    }

    useEffect(() => {
        //setIsSearching(true);
        start(() => {
            const results = searchFn(items, query);
            setResults(results);
            //setTimeout(() => setIsSearching(false), 200);
        })
    }, [items, query])

    return <>
        <section className="p-2">
            <SearchInput query={query} setQuery={setSearch} />
            <div className={`text-gray-500 text-3xl  mt-3 ${pending  ? 'visible' : 'invisible'}`} >Searching...</div>
        </section>

        {query && (query.length <= 2 ? <div className={'mt-3 text-3xl leading-normal p-2'}>Enter three or more characters to search.</div> : <SearchList query={query} results={results} />)}
    </>
}

export default SearchClient;

