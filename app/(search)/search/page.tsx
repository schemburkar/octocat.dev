import { Suspense } from "react";
import { SearchInput } from "../SearchInput";
import SearchList from "../SearchList";

const SearchPage = ({ searchParams }: SearchPageProps) => {
    return <>
        <h2 className="text-2xl">Search</h2>
        <article className="p-2">
            <SearchInput />
        </article>
        <Suspense fallback={"WAIT"}>
            {searchParams && searchParams.q ?
                // @ts-ignore Async COmponent
                <SearchList
                    q={searchParams.q} /> : null}
        </Suspense>
    </>
}

export default SearchPage;

type SearchPageProps = {
    searchParams?: { [key: string]: string }
}