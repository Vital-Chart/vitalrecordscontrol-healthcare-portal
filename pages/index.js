import Head from 'next/head'
import { Box, Link, Flex, Image } from '@/components/core'
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
                <Container className="flex-col space-y-6">
                    <Flex className="flex-col">
                        <Link href="/pih">PIH - Landing Page</Link>
                        <Link href="/pih/patient">
                            PIH - Patient - Instructions
                        </Link>
                        <Link href="/pih/patient/form">
                            PIH - Patient - Request Form
                        </Link>
                        <Link href="/pih/sendtothirdparty">
                            PIH - Send To - Instructions
                        </Link>
                        <Link href="/pih/sendtothirdparty/form">
                            PIH - Send To - Request Form
                        </Link>
                    </Flex>
                    <Flex className="flex-col">
                        <Link href="/ucsf">UCSF - Landing Page</Link>
                        <Link href="/ucsf/patient">
                            UCSF - Patient - Instructions
                        </Link>
                        <Link href="/ucsf/patient/form">
                            UCSF - Patient - Request Form
                        </Link>
                        <Link href="/ucsf/sendtothirdparty">
                            UCSF - Send To - Instructions
                        </Link>
                        <Link href="/ucsf/sendtothirdparty/form">
                            UCSF - Send To - Request Form
                        </Link>
                    </Flex>
                </Container>
            </Flex>

            <Footer />
        </Flex>
    </>
)

export default Home
