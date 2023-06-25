import { existsSync } from "fs";
import path from "path";

export default function Test(){
    
    return <>
       <div>search.json : {existsSync('./search.json')}</div>
         <div>/public/search.json : {existsSync('/public/search.json')}</div>
         <div>path.join( process.cwd(),`/public/search.json`) : {existsSync(path.join( process.cwd(),`/public/search.json`))}</div>
    </>
}

// { searchParams}:SearchPageProps
// type SearchPageProps = {
//     searchParams?: { [key: string]: string }
// }