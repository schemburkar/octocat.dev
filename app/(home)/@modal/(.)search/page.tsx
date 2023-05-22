import { Suspense } from "react";
import Modal from "../../../../components/modal";
import { CloseSearch, SearchInput } from "../../../search/SearchInput";
import SearchList from "../../../search/SearchList";

const SearchModal = ({ searchParams }: SearchModalProps) => {
    return <>
        <Modal>
            <section className="p-8 bg-white dark:bg-black">

                <article className="p-2">
                    <CloseSearch>
                        <div className='text-right mt-2'><a href='#' className="underline hover:text-success duration-200 transition-colors">Close Search</a><span className='text-xs p-1 mx-1 border-gray-300 border rounded text-'>ESC</span></div>
                    </CloseSearch>
                    <SearchInput />
                </article>
                <Suspense fallback={"WAIT"}>
                    <section className="overflow-y-scroll max-h-[50vh] will-change-auto p-3">
                        {searchParams && searchParams.q ?
                            // @ts-ignore 
                            <SearchList
                                q={searchParams.q} /> : null}
                    </section>
                </Suspense>
            </section>
        </Modal>
    </>
}

export default SearchModal;

type SearchModalProps = {
    searchParams?: { [key: string]: string }
}