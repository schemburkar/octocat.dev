'use client'
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useRef, useCallback } from 'react';

export const SearchInput = ({ query, setQuery }: { query: string, setQuery: (q: string) => void }) => {

    const invoke = useBufferedAPI(350);
    const router = useRouter()
    useEffect(() => {
        document?.getElementById('search-input')?.focus();
    }, []);

    const search = (q: string) => {
        invoke(() => {
            setQuery(q);
        })
    }

    const onKeyUp = (key: string) => {
        if (key === "Escape") router.back();
    }

    return <>
        <input defaultValue={query} onKeyUp={e => onKeyUp(e.key)} onChange={(e) => search(e.target.value)} autoComplete='off' id="search-input" tabIndex={0} className={'text-center w-full mt-5 text-4xl leading-normal p-3 dark:bg-black border-gray-300 border rounded'} type={'text'} placeholder='Search Posts and Pages' />
    </>
};


export const useBufferedAPI = (timeout: number = 250) => {
    const handle = useRef<NodeJS.Timeout>(null);
    const controller = useRef<AbortController>(null);

    const invoke = useCallback((dataSource: (signal?: AbortSignal) => void) => {
        if (handle.current)
            clearTimeout(handle.current);
        if (controller.current)
            controller.current.abort();
        handle.current = setTimeout(() => {
            controller.current = new AbortController();
            dataSource(controller.current.signal);
        }, timeout);
    }, [timeout]);

    return invoke;
};


export const CloseSearch = ({ children }: CloseSearchProps) => {
    const router = useRouter()

    const onClose = () => router.back();

    return <div className="contents" onClick={onClose}>{children}</div>
}
type CloseSearchProps = {
    children?: ReactNode
}