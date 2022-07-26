import markdownStyles from './markdown-styles.module.css'

const PostBody = ({ content }: { content: string }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

export default PostBody;