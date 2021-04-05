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
                    <Flex className="flex-wrap justify-center p-4 text-sm border border-gray-light">
                        <Box className="m-2 p-4 rounded text-primary-dark bg-tertiary-lightest">
                            Launched
                        </Box>
                        <Box className="m-2 p-4 rounded text-secondary-darkest bg-secondary-lightest">
                            Review
                        </Box>
                        <Box className="m-2 p-4 rounded text-red-dark bg-red-light">
                            In Progress
                        </Box>
                    </Flex>
                    <Flex className="flex-wrap mt-4">
                        {Object.keys(hospitals).map(hospital => (
                            <Link
                                className={cx(
                                    'flex-grow text-center m-1 p-4 rounded hover:text-black hover:bg-gray-light transition-colors',
                                    hospitals[hospital].status === 'review' &&
                                        'text-secondary-darkest bg-secondary-lightest',
                                    hospitals[hospital].status === 'launched' &&
                                        'text-primary-dark bg-tertiary-lightest',
                                    hospitals[hospital].status ===
                                        'in-progress' &&
                                        'text-red-dark bg-red-light'
                                )}
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
