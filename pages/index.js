import Head from 'next/head'
import { Box, Link, Flex } from '@/components/core'
import { Container, Footer, ScreenReader } from '@/components/general'

const Home = () => (
    <>
        <Head>
            <title>VitalChart® Virtual ROI Portal</title>
        </Head>

        <ScreenReader as="a" href="#content">
            Skip to content
        </ScreenReader>

        <Flex className="flex-col min-h-screen">
            <Box as="header" className="bg-black mb-20">
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
                className="flex-1 flex-col"
            >
                <Container>
                    <Flex className="flex-col space-y-2">
                        <Link href="/pih">PIH - Landing Page</Link>
                        <Link href="/ucsf">UCSF - Landing Page</Link>
                        <Link href="/benioff">Benioff - Landing Page</Link>
                        <Link href="/pal">Palomar - Landing Page</Link>
                    </Flex>
                </Container>
            </Flex>

            <Footer />
        </Flex>
    </>
)

export default Home
