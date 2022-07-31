import '../styles/index.css'
import 'highlight.js/styles/vs2015.css'
import { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App;