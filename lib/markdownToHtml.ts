import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'

const markdownToHtml = async (markdown: string) => {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(markdown)
  return result.toString()
}

export default markdownToHtml;