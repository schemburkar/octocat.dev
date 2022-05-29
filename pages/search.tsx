import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getDataAPIByType } from '../lib/data-api'
import Head from 'next/head'
import { Description, Title } from '../lib/constants'
import { IItemData, IItemDataForSearch } from '../lib/FileFormat'
import React, { useEffect, useState, Suspense, startTransition, FC, useTransition, useDeferredValue, ReactNode, useLayoutEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { formatDistance, format } from 'date-fns'

type Items = { items: IItemDataForSearch[] }

type SearchResult = {
  title?: string | ReactNode;
  date?: Date;
  slug?: string;
  excerpt?: string | ReactNode;
  type: string;
}

const search = (searchText: string, allItems: IItemDataForSearch[]): SearchResult[] => {
  const escapeRegExp = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escapeRegExp})`, 'i')
  const filterItems = allItems.filter(item =>
    (item.search.title?.indexOf(searchText) || -1) >= 0 ||
    (item.search.slug?.indexOf(searchText) || -1) >= 0 ||
    (item.search.excerpt?.indexOf(searchText) || -1) >= 0 ||
    (item.search.content?.indexOf(searchText) || -1) >= 0
  ).map(item => {
    const title = item.title?.split(regex).filter(String).map((part: string, i: number) => regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>)
    const excerpt = item.excerpt?.split(regex).filter(String).map((part: string, i: number) => regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>)

    const { slug, date, type } = item
    return { title, excerpt, slug, date, type }
  })
  return filterItems;
}

const Index = ({ items }: Items) => {
  const [searchText, setSearchText] = useState('')
  const [actualSearchText, setActualSearchText] = useState('')
  useEffect(() => {
    document.getElementById('search-input')?.focus();
  }, []);

  const searchForItems = (text: string) => {
    setSearchText(text);
    setActualSearchText(text.toLowerCase().trim());
  }

  const searchInList = useDeferredValue(actualSearchText);

  return (
    <Suspense fallback={null}>
      <Layout>
        <Head>
          <title>{Title} - {Description}</title>
        </Head>
        <Container>
          <Intro pages={[]} />
          <article className="mb-32">
            <input autoComplete='off' onKeyUp={e => e.key === 'Escape' && Router.push(Router.asPath, Router.asPath)} id="search-input" tabIndex={0} className={'text-center w-full mt-10 text-4xl leading-normal p-3 dark:bg-black border-gray-300 border rounded'} type={'text'} placeholder='Search Posts and Pages' onChange={(e) => searchForItems(e.target.value)} />
            <div className='text-right mt-2'><a href='#' className="underline hover:text-success duration-200 transition-colors" onClick={() => Router.push(Router.asPath, Router.asPath)}>Close Search</a><span className='text-xs p-1 mx-1 border-gray-300 border rounded text-'>ESC</span></div>
            {searchInList ? <Suspense fallback={<Searching />}>
              <SearchItems searchText={searchInList} allItems={items} />
            </Suspense> : null}
          </article>
        </Container>
      </Layout>
    </Suspense>
  )
}

const Searching = () => <div className='text-gray-500 text-3xl' >Searching...</div>;

const SearchTitle = ({ length }: { length: number }) => {
  if (length === 0) return <div className='flex-grow'>No results found</div>;
  const text = length == 1 ? `${length} result` : `${length} results`;
  return <div className='flex-grow'>Found {text}</div>
}


const SearchItems = ({ searchText, allItems }: { searchText: string, allItems: IItemDataForSearch[] }) => {

  const [items, setItems] = useState<SearchResult[]>([]);
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (!searchText || searchText.length <= 2) return;

    startTransition(() => {
      const filterItems = search(searchText, allItems)
      setItems(filterItems);
    });
  }, [searchText, allItems])

  if (!searchText) return null;
  if (searchText.length <= 2) return <div className={' w-full mt-10 text-4xl leading-normal py-3 '}>Enter three or more characters to search...</div>;

  return <>
    <div className={'w-full mt-5 md:mt-10 text-4xl leading-normal py-3 flex items-baseline'}>  <SearchTitle length={items.length} />{isPending ? <Searching /> : null}</div>
    {items.map((a, i) => <div key={i}><SearchListItem key={i} type={a.type} date={a.date} excerpt={a.excerpt} slug={a.slug} title={a.title} /></div>)}
  </>;
}

const SearchListItem = ({ title, excerpt, slug, date, type }: SearchResult) => {
  return (
    <div className=" my-6 py-6  ">
      <div className="mb-2 text-2xl">
        <Link as={`/${type}/${slug}`} href={`[type]/[slug]`}>
          <a className="hover:underline ">{title}</a>
        </Link>
      </div>
      <div className='text-gray-400'>
        {excerpt}
      </div>
      <div className='text-gray-400' title={date && format(new Date(date), 'dd-MMM-yyyy')}>
        {date && formatDistance(new Date(date), new Date(), { addSuffix: true })}
      </div>
    </div>);
}

const mapItem = (item: IItemData): IItemDataForSearch => {
  const { title, excerpt, date, slug, type, content } = item;
  return ({
    title, excerpt, date, slug, type,
    search: {
      title: title?.toLowerCase(), slug: slug?.toLowerCase(), excerpt: excerpt?.toLowerCase(),
      content: content ? content.toLowerCase() : null,
    }
  });
}

export async function getStaticProps() {
  const a = getDataAPIByType("posts").getAllItems([
    'title',
    'date',
    'slug',
    'excerpt'
  ]);
  const b = getDataAPIByType('pages').getAllItems(['title', 'date', 'slug', 'excerpt']);

  const [allPosts, pages] = await Promise.all([a, b]);

  const items = allPosts.concat(pages).map(mapItem);

  return {
    props: { items },
  }
}

export default Index;