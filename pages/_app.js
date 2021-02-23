import { StoreProvider } from '@/lib/store'
import '@/styles/global.css'

const App = ({ Component, pageProps }) => {
    return (
        <StoreProvider>
            <Component {...pageProps} />
        </StoreProvider>
    )
}

export default App
