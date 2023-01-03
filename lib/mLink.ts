import { defaultHandlers, H, Handler, Handlers } from 'mdast-util-to-hast';

const mLink: Handler = (h: H, node: any) => {
  console.log('h.clobberPrefix', h.clobberPrefix);
  h.clobberPrefix = 'a';
  node.type = 'link';
  const x = defaultHandlers.link(h, node);
  console.log(x);
  return x;
};
const getHandlers: Handlers = ({
  mLink
});

// const link = (h, node) => {
//   /** @type {Properties} */
//   const props = { href: normalize(node.url) }

//   if (node.title !== null && node.title !== undefined) {
//     props.title = node.title
//   }

//   return h(node, 'a', props, all(h, node))
// }