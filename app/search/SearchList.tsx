import PostLink from "../../components/PostLink";
import { SearchResult } from "./SearchResult";
import { formatDistance, format } from 'date-fns'
import search from "./SearchFunction";

const SearchList = async ({ q }: { q: string }) => {
    const items = await search(q);
    return <>{items.map((a, i) => <div key={i}><SearchListItem key={i} type={a.type} date={a.date} excerpt={a.excerpt} slug={a.slug} title={a.title} /></div>)}
    </>
}

const SearchListItem = ({ title, excerpt, slug, date, type }: SearchResult) => {
    return (
        <div className=" my-6 py-6  ">
            <div className="mb-2 text-2xl">
                <PostLink type={type} slug={slug} className="hover:underline ">{title?.map((t, i) => t.marked ? <mark key={i}>{t.text}</mark> : <span key={i}>{t.text}</span>)}</PostLink>
            </div>
            <div className='text-gray-400'>
                {excerpt?.map((t, i) => t.marked ? <mark key={i}>{t.text}</mark> : <span key={i}>{t.text}</span>)}
            </div>
            <div className='text-gray-400' title={date && format(new Date(date), 'dd-MMM-yyyy')}>
                {date && formatDistance(new Date(date), new Date(), { addSuffix: true })}
            </div>
        </div>);
}

export default SearchList;