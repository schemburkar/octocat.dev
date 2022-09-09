import { visit } from 'unist-util-visit'

type Options = {
    className?: string
    linkText?: string
}
const remarkHeaderAnchorLinks = ({ className = 'link-anchor', linkText = '🔗' }: Options) => {
    return (tree: node) => {
        visit(tree, 'heading', (header: heading) => {
            visit(header, 'link', (linkNode: link) => {
                if (!linkNode.url?.startsWith('#')) {
                    return;
                }
                visit(linkNode, 'text', (textNode: text) => {
                    const bookmarktext: text = { type: 'text', value: linkText };
                    const bookmark: link = { type: 'link', url: linkNode.url, title: linkText, children: [bookmarktext], data: { hProperties: { id: linkNode.url.slice(1), className: className } } };
                    header.children.push(bookmark);
                    header.children.push(textNode);
                })
                linkNode.data = { remove: true };
                header.children = header.children.filter(a => a.data?.remove !== true);
            })
        });
    }
}


export default remarkHeaderAnchorLinks;

type node = {
    type: string
    data?: { [key: string]: any }
}
type link = node & {
    type: 'link' | 'mLink'
    title: string
    url: string
    children: node[]
}

type heading = node & {
    type: 'heading'
    title: string
    children: node[]
}


type text = node & {
    type: 'text'
    value: string
}