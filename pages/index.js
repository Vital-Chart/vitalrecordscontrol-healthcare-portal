import Head from 'next/head'
import cx from 'classnames'
import { Box, Link, Flex } from '@/components/core'
import { Container, Footer, ScreenReader } from '@/components/general'
import hospitals from '@/lib/hospitals'
import { clearFix } from 'polished'

const Home = () => (
    <>
        <Head>
            <title>VitalChart® Virtual ROI Portal</title>
        </Head>

        <ScreenReader as="a" href="#content">
            Skip to content
        </ScreenReader>

        <Flex className="flex-col min-h-screen">
            <Box as="header" className="bg-black">
                <Flex as={Container} className="relative">
                    <Box className="flex-col ml-auto py-4 text-xs text-white text-right">
                        <Link href="/">VitalChart® Virtual ROI Portal</Link>
                    </Box>
                </Flex>
            </Box>

            <Flex
                as="main"
                id="content"
                role="main"
                className="flex-1 flex-col my-8"
            >
                <Container>
                    <Flex className="flex-wrap mt-4">
                        {Object.keys(hospitals).map(hospital => (
                            <Link
                                className="flex-grow text-center m-1 p-4 rounded bg-gray-lightest hover:text-black hover:bg-gray-light transition-colors"
                                href={`/${hospital}`}
                                key={hospitals[hospital].name}
                            >
                                {hospitals[hospital].name}
                            </Link>
                        ))}
                    </Flex>
                </Container>
            </Flex>

            <Footer />
        </Flex>
    </>
)

export default Home
