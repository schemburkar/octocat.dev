import { existsSync } from "fs";
import path from "path";

export default function Test({ searchParams }: SearchPageProps) {

  return <>
    <div>{process.cwd()}</div>
    <div>search.json : {existsSync('./search.json') ? 'Yes' : 'No'}</div>
    <div>/public/search.json : {existsSync('/public/search.json') ? 'Yes' : 'No'}</div>
    <div>path.join( process.cwd(),`/public/search.json`) : {existsSync(path.join(process.cwd(), `/public/search.json`)) ? 'Yes' : 'No'}</div>
    {searchParams?.q && <div>param : {existsSync(searchParams?.q) ? 'Yes' : 'No'}</div>}
    <div>resolve {path.resolve('./public', 'search.json')}</div>
    <div>resolve public {searchParams?.q && <div>param : {existsSync(path.resolve('./public', searchParams?.q)) ? 'Yes' : 'No'}</div>}</div>
    <div>resolve q  {searchParams?.q && <div>param : {existsSync(path.resolve(searchParams?.q)) ? 'Yes' : 'No'}</div>}</div>

  </>
}


type SearchPageProps = {
  searchParams?: { [key: string]: string }
}