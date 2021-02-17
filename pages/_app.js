import { StoreProvider } from '@/lib/store'
import '@/styles/global.css'
import 'react-datepicker/dist/react-datepicker.css'

const App = ({ Component, pageProps }) => {
    return (
        <StoreProvider>
            <Component {...pageProps} />
        </StoreProvider>
    )
}

export default App
