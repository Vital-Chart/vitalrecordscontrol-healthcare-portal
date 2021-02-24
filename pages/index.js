import { withStore } from '@/lib/store'
import Head from 'next/head'
import { Box, Link, Flex, Image } from '@/components/core'
import { Container, Footer, ScreenReader } from '@/components/general'
import hospitals from '@/lib/hospitals'

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
                    <Link
                        href="/pih"
                        className="block absolute top-0 left-6 sm:left-8 w-28 p-6 bg-white shadow"
                    >
                        <Image src={hospitals['pih'].logo} />
                    </Link>

                    <Flex className="flex-col ml-auto py-4 text-xs text-white text-right">
                        <Link href="/">VitalChart® Virtual ROI Portal</Link>
                        <Link href="/pih/contact" className="underline">
                            Contact Us
                        </Link>
                    </Flex>
                </Flex>
            </Box>

            <Flex
                as="main"
                id="content"
                role="main"
                className="flex-1 flex-col"
            >
                <Flex as={Container} className="flex-col space-y-8">
                    <Link href="/pih">PIH - Landing Page</Link>
                    <Flex className="flex-col">
                        <Link href="/pih/patient">
                            PIH - Patient - Instructions
                        </Link>
                        <Link href="/pih/patient/form">
                            PIH - Patient - Request Form
                        </Link>
                        <Link href="/pih/patient/upload">
                            PIH - Patient - Upload Authorization
                        </Link>
                        <Link href="/pih/patient/review">
                            PIH - Patient - Review & Submit
                        </Link>
                    </Flex>
                    {/* <Flex className="flex-col">
                <Link href="/pih/sendto">PIH - Send To - Instructions</Link>
                <Link href="/pih/sendto/form">
                    PIH - Send To - Request Form
                </Link>
                <Link href="/pih/sendto/upload">
                    PIH - Send To - Upload Authorization
                </Link>
                <Link href="/pih/sendto/review">
                    PIH - Send To - Review & Submit
                </Link>
            </Flex> */}
                </Flex>
            </Flex>

            <Footer />
        </Flex>
    </>
)

export default withStore(Home)
