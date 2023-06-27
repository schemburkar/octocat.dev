import { Suspense } from "react";
import { getSearchItems } from "../getSearchItems";
import Client from "./Client";

export default async function Test() {

  const items = await getSearchItems();
  return <>
    <Suspense fallback={'searching'}>
      <Client items={items} />
    </Suspense>
  </>
}

