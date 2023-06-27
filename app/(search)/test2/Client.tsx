'use client';
import { useSearchParams } from "next/navigation";
import { IItemDataForSearch } from "../../../lib/FileFormat";
import { SearchListItem } from "../SearchListItem";
import { searchFn } from "./searchFn";


const Client = async ({ items }: { items: IItemDataForSearch[] }) => {
    const searchparams = useSearchParams();

    const q = searchparams?.get('q');
    if (q) {
        const result = await searchFn(items, q);
        return <>{result.map((a, i) => <div key={i}><SearchListItem key={i} type={a.type} date={a.date} excerpt={a.excerpt} slug={a.slug} title={a.title} /></div>)}</>;
    }
    return null;
}



export default Client; 