import { StoreProvider } from '@/lib/store'
import '@/styles/global.css'
import * as Sentry from '@sentry/node'
import { Integrations } from '@sentry/tracing'

Sentry.init({
    environment: process.env.CURRENT_ENV,
    dsn:
        'https://20443a0ea91e478781d05c04c4cb0f1a@o562663.ingest.sentry.io/5702889',
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.5,
})

const App = ({ Component, pageProps }) => (
    <StoreProvider>
        <Component {...pageProps} />
    </StoreProvider>
)

export default App
