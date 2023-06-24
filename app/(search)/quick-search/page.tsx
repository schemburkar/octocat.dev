import { redirect } from "next/navigation";

const SearchPageWrapper = ({ searchParams }: SearchPageProps) => {
    redirect(`/search?q=${searchParams?.q || ''}`)
}

export default SearchPageWrapper;

type SearchPageProps = {
    searchParams?: { [key: string]: string }
}