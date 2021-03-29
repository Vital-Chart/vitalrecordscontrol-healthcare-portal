import { useEffect } from 'react'
import Head from 'next/head'
import { useIdle } from 'react-use'
import useNavigation from '@/lib/useNavigation'
import { useStore } from '@/lib/store'
import { Flex } from '@/components/core'
import { Footer, Header, ScreenReader } from '@/components/general'
import { BrowserAlert } from '@/components/atoms'

import { getBrowser } from '@/lib/helpers'

export const Layout = ({ children }) => {
    const store = useStore()
    const { getLandingPage, isStepPage } = useNavigation()
    const isIdle = useIdle(60e4) // 10 minutes
    const browser = getBrowser()

    // Clear data and redirect if user is idle too long
    useEffect(() => {
        if (isIdle && isStepPage) {
            store.dispatch({
                type: 'RESET_REQUEST',
                redirect: getLandingPage(),
            })
        }
    }, [isIdle])

    return (
        <>
            <Head>
                <title>VitalChart® Virtual ROI Portal</title>
            </Head>

            <ScreenReader as="a" href="#content">
                Skip to content
            </ScreenReader>

            {browser.browser === 'Explorer' && browser.version < 11 && (
                <BrowserAlert />
            )}

            <Flex className="flex-col min-h-screen">
                <Header />

                <Flex
                    as="main"
                    id="content"
                    role="main"
                    className="flex-1 flex-col"
                    style={{ flex: (1, 1, 'auto') }}
                >
                    {children}
                </Flex>

                <Footer />
            </Flex>
        </>
    )
}

Layout.defaultProps = {}

export default Layout
