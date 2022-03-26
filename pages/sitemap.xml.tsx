import { readdir } from 'fs/promises'


import { GetServerSideProps } from "next";
import path from 'path'
import getConfig from 'next/config'


const Sitemap = () => { };


const read = async (path: string, res: any) => {
    try {

        res.write(`<path>${path}</path>`)
        const files = await readdir(path);

        if (files) {
            res.write((files).map(file => `<files>${file}</files>`).join(''))
        }
    }
    catch (e) {
        res.write(`<error>${e}</error>`);

    }

}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const resp = ''
    res.setHeader("Content-Type", "text/xml");
    res.write(`<?xml version="1.0" encoding="UTF-8"?>`)
    res.write(`<paths>`)

    try {


        const p = new URL(req.url||'', `http://${req.headers.host}`).searchParams.get("path");
       
        if (p) await read(p, res);





    }
    catch (e) {
        res.write(`<error>${e}</error>`);
    }
    res.write(`</paths>`)
    res.end();
    return {
        props: {},
    };
};

export default Sitemap;