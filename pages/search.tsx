import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getDataAPIByType } from '../lib/data-api'
import Head from 'next/head'
import { CMS_NAME, Description, Title } from '../lib/constants'
import { IItemDataForSearch } from '../lib/FileFormat'
import React,{ useEffect, useState, startTransition } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { formatDistance, format } from 'date-fns'

declare module 'react' {
  function startTransition(callback: () => (void)): void;
}


type Items = { items: IItemDataForSearch[] }
const Index = ({ items }: Items) => {
  const [search, setSearch] = useState('')
  const [searching, setSearching] = useState(false)
  const [searchItems, setSearchItems] = useState<IItemDataForSearch[]>([])
  useEffect(() => {
    document.getElementById('search-input')?.focus();
  }, []);

  const searchForItems = async (text: string) => {

    setSearch(text);
    if (text.length <= 2) {

      setSearchItems([]);
      return;
    }
    setSearching(true);

    React.startTransition(() => {
      const filterItems = items.filter(item => (item?.title?.toLowerCase()?.indexOf(text) || -1) >= 0 || (item?.slug?.toLowerCase()?.indexOf(text) || -1) >= 0)
      setSearchItems(filterItems);
      setTimeout(() => {
        setSearching(false);
      }, 200);

    })

  }
  return (
    <>
      <Layout>
        <Head>
          <title>{Title} - {Description}</title>
        </Head>
        <Container>
          <Intro pages={[]} />
          <article className="mb-32">
            <input onKeyUp={e => e.key === 'Escape' && Router.push(Router.asPath, Router.asPath)} id="search-input" tabIndex={0} className={'text-center w-full mt-10 text-4xl leading-normal p-3 dark:bg-black border-gray-300 border rounded'} type={'text'} autoComplete={'search'} placeholder='Search Posts and Pages' onChange={(e) => searchForItems(e.target.value)} />
            {search && searching && <div className={' w-full mt-10 text-4xl leading-normal py-3 '}>Searching...</div>}
            {search && searchItems.length > 0 && !searching && (<div className={' w-full mt-10 text-4xl leading-normal py-3 '}>{`Found ${searchItems.length} results`}</div>)}
            {search && searchItems.map((item, i) =>
              <div key={`${i}${item.slug}`}><SearchItem item={item} /></div>)}
            {search && search.length > 2 && !searching && searchItems.length === 0 && <div className={' w-full mt-10 text-4xl leading-normal py-3 '}>No results found</div>}
          </article>
        </Container>
      </Layout>
    </>
  )
}


const SearchItem = ({ item }: { item: IItemDataForSearch }) => {
  return (
    <div className=" my-6 py-6  ">
      <div className="mb-2 text-2xl">
        <Link as={`/${item.type}/${item.slug}`} href={`[type]/[slug]`}>
          <a className="hover:underline "> {item.title}</a>
        </Link>
      </div>
      <div className='text-gray-400'>
        {item.excerpt}
      </div>
      <div className='text-gray-400' title={item.date && format(new Date(item.date), 'dd-MMM-yyyy')}>
        {item.date && formatDistance(new Date(item.date), new Date(), { addSuffix: true })}
      </div>
    </div>);
}
export default Index;
export async function getStaticProps() {

  const a = getDataAPIByType("posts").getAllItems([
    'title',
    'date',
    'slug',
    'excerpt'
  ]);
  const b = getDataAPIByType('pages').getAllItems(['title', 'date', 'slug', 'excerpt']);

  const [allPosts, pages] = await Promise.all([a, b]);

  const items = allPosts.concat(pages);

  return {
    props: { items },
  }
}
