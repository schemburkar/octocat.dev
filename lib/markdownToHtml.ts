import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'
import remarkHeaderAnchorLinks from './remark-header-anchor-links'
import { defaultSchema } from 'hast-util-sanitize'

const sanitizeAttributeOptions = { ...defaultSchema.attributes };
sanitizeAttributeOptions['*'].push('className');

const markdownToHtml = async (markdown: string, options: MarkDownOptions) => {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml,
      //@ts-ignore
      { sanitize: { clobberPrefix: options.clobberPrefix, attributes: sanitizeAttributeOptions } })
    .use(remarkHeaderAnchorLinks, { className: options.anchorLinkClassName })
    .process(markdown)
  return result.toString()
}

type MarkDownOptions = {
  anchorLinkClassName: string
  clobberPrefix: string

}
export default markdownToHtml;