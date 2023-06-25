import { existsSync } from "fs";
import path from "path";

export default function Test(){
    
    return <>
    <div>{process.cwd()}</div>
       <div>search.json : {existsSync('./search.json')?'Yes':'No'}</div>
         <div>/public/search.json : {existsSync('/public/search.json')?'Yes':'No'}</div>
         <div>path.join( process.cwd(),`/public/search.json`) : {existsSync(path.join( process.cwd(),`/public/search.json`))?'Yes':'No'}</div>
    </>
}

// { searchParams}:SearchPageProps
// type SearchPageProps = {
//     searchParams?: { [key: string]: string }
// }