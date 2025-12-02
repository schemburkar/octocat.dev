import { SearchListItem } from "./SearchListItem";
import { Suspense } from "react";
import { SearchResult } from "./SearchResult";

const SearchList = ({ query, results }: { query: string, results?: SearchResult[] }) => {
    if (!results) return null;
    if (!results.length)
        return <div className={'mt-3 text-3xl leading-normal p-2'}>No results found for <span className="italic font-light">{query}</span>. Please try another keyword.</div>;

    return <Suspense fallback={null}> <>
        <h4 className="mt-3 text-3xl leading-normal p-2">Found {results.length} results for {query}</h4>
        {results.map((a, i) => <SearchListItem key={i} type={a.type} date={a.date} excerpt={a.excerpt} slug={a.slug} title={a.title} />)}</>
    </Suspense>;
}

export default SearchList; 