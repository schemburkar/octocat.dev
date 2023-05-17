import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';


export const saveStyles = async (theme: string, prefix?: string) => {
    const target = `${process.cwd()}/styles`;
    const path1 = `${process.cwd()}/node_modules/${theme}`;
    const content = await readFile(path1);

    if (prefix) {
        await mkdir(path.dirname(`${target}/${theme}`), { recursive: true });
        await writeFile(`${target}/${theme}`, `.${prefix} {  ${content} }`, { encoding: 'utf-8', flag: 'w+' });
    }

    else {
        await mkdir(path.dirname(`${target}/${theme}`), { recursive: true });
        await writeFile(`${target}/${theme}`, content, { encoding: 'utf-8', flag: 'w+' });
    }
};
