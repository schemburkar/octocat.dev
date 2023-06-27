import search from "./SearchFunction";
import { SearchListItem } from "./SearchListItem";

const SearchList = async ({ q }: { q: string }) => {
    const items = await search(q);
    return <>{items.map((a, i) => <div key={i}><SearchListItem key={i} type={a.type} date={a.date} excerpt={a.excerpt} slug={a.slug} title={a.title} /></div>)}
    </>
}

export default SearchList;