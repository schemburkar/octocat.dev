import { Metadata } from "next";
import { Suspense } from "react";
import { Description, Title } from "../../../../lib/constants";
import { getSearchItems } from "../getSearchItems";
import SearchClient from "../SearchClient";

const SearchPage = async () => {
    const items = await getSearchItems();
    return <Suspense fallback={ <div className={`text-gray-500 text-3xl mt-3`} >Please wait...</div>}>
        <SearchClient items={items} />
    </Suspense>
}

export const metadata: Metadata = {
    title: `Search | ${Title} - ${Description}`
}
export default SearchPage;
