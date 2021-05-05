import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useIdle } from 'react-use'
import useNavigation from '@/lib/useNavigation'
import { useStore } from '@/lib/store'
import { getBrowser } from '@/lib/helpers'
import hospitals from '@/lib/hospitals'
import { Flex } from '@/components/core'
import { Footer, Header, ScreenReader } from '@/components/general'
import { BrowserAlert } from '@/components/atoms'

export const Layout = ({ children }) => {
    const store = useStore()
    const { getLandingPage, isStepPage, hospital } = useNavigation()
    const isIdle = useIdle(120e4) // 20 minutes
    const browser = getBrowser()
    const [unsupportedBrowser, setUnsupportedBrowser] = useState(false)

    // Clear data and redirect if user is idle too long
    useEffect(() => {
        if (isIdle && isStepPage) {
            store.dispatch({
                type: 'RESET_REQUEST',
                redirect: getLandingPage(),
            })
        }
    }, [isIdle])

    useEffect(() => {
        if (browser.browser === 'Explorer' && browser.version < 11) {
            setUnsupportedBrowser(true)
        }
    }, [])

    return (
        <>
            <Head>
                <title>
                    VitalChart® Virtual ROI Portal
                    {hospital && ` | ${hospitals[hospital].name}`}
                </title>
            </Head>

            <ScreenReader as="a" href="#content">
                Skip to content
            </ScreenReader>

            {unsupportedBrowser && <BrowserAlert />}

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
