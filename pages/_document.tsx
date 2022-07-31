import Document, { Html, Head, Main, NextScript } from 'next/document'
import fs from 'fs'
import { join } from 'path'

class AppDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="dark:bg-trueDark dark:text-gray-200 duration-250 transition-colors">
          <script dangerouslySetInnerHTML={{ __html: fs.readFileSync(join(process.cwd(), "_scripts", "pagescript.js"), 'utf8') }}></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument;