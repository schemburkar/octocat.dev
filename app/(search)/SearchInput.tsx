'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useTransition } from "react";
import { useRef, useCallback } from 'react';

export const SearchInput = ({ page }: { page?: string }) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [pending, start] = useTransition()
    useEffect(() => {
        document?.getElementById('search-input')?.focus();
    }, []);

    const invoke = useBufferedAPI(350);
    
    try {
     

        const search = (q: string) => {
            invoke(() => {
                start(() => {
                    router.replace(`/${page || 'search'}?q=${q}`);
                })
            })
        }

        const onKeyUp = (key: string) => {
            if (key === "Escape") router.back();
        }

        return <>
            <input defaultValue={searchParams?.get('q') || ''} onKeyUp={e => onKeyUp(e.key)} onChange={(e) => search(e.target.value)} autoComplete='off' id="search-input" tabIndex={0} className={'text-center w-full mt-5 text-4xl leading-normal p-3 dark:bg-black border-gray-300 border rounded'} type={'text'} placeholder='Search Posts and Pages' />
            <div className={`text-gray-500 text-3xl ${pending ? 'visible' : 'invisible'}`} >Searching...</div>
        </>
    }
    catch {
        console.log('error in SearchInput')
        return null;
    }
};


export const useBufferedAPI = (timeout: number = 250) => {
    const handle = useRef<NodeJS.Timeout>();
    const controller = useRef<AbortController>();

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