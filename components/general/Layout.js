import Head from 'next/head'
import { Flex } from '@/components/core'
import { Footer, Header, ScreenReader } from '@/components/general'

export const Layout = ({ children }) => (
    <>
        <Head>
            <title>Healthcare Portal | Vital Records Control</title>
        </Head>

        <ScreenReader as="a" href="#content">
            Skip to content
        </ScreenReader>

        <Flex className="flex-col min-h-screen">
            <Header />

            <Flex
                as="main"
                id="content"
                role="main"
                className="flex-1 flex-col"
            >
                {children}
            </Flex>

            <Footer />
        </Flex>
    </>
)

Layout.defaultProps = {}

export default Layout
