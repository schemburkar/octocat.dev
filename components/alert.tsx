import Container from './container'
import { GitHubRepo } from '../lib/constants'

export default function Alert() {
  return (
    <div
      className="border-b bg-gray-800 border-accent-2 text-white">
      <Container>
        <div className="py-2 text-center text-sm">

          <>
            The source code for this blog is{' '}
            <a
              href={`${GitHubRepo}`}
              className="underline hover:text-success duration-200 transition-colors"
            >
              available on GitHub
            </a>
            .
          </>

        </div>
      </Container>
    </div>
  )
}
