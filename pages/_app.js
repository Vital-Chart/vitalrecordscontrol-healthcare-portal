import { StoreProvider } from '@/lib/store'
import '@/styles/global.css'

const App = ({ Component, pageProps }) => (
    <StoreProvider>
        <Component {...pageProps} />
    </StoreProvider>
)

export default App
