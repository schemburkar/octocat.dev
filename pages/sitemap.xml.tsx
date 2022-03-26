import { readdir } from 'fs/promises'


import { GetServerSideProps } from "next";
import path from 'path'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

const PROJECT_ROOT = serverRuntimeConfig.PROJECT_ROOT;

const Sitemap = () => { };


const read = async (path: string, res: any) => {
    try {

        res.write(`<path>${path}<files>`)
        const files = readdir(path);

        if (files) {
            res.write(`<files>${(await files).map(file => file).join('')}<files>`)
        }
    }
    catch (e) {
        res.write(`<error>${e}</error>`);

    }

}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const resp = ''
    try {

        res.setHeader("Content-Type", "text/xml");
        read('./.next/server/pages', res);
        read('./', res);
        read(PROJECT_ROOT, res);
        read(path.join(PROJECT_ROOT,'./pages'), res);


        res.end();


    }
    catch (e) {
        res.setHeader("Content-Type", "text/xml");
        res.write(`<error>${e}</error>`);
        res.end();
    }
    return {
        props: {},
    };
};

export default Sitemap;