import { withStore } from '@/lib/store'
import { Box, Link, Text, Button, Flex, Heading } from '@/components/core'
import { PageHeading, ButtonWrapper } from '@/components/atoms'
import { Layout, Container } from '@/components/general'

const PIH = ({ store }) => (
    <Layout>
        <Container>
            <PageHeading className="text-center">
                Order Your Medical Records Online
            </PageHeading>
            <Flex className="flex-col md:flex-row flex-wrap items-center md:justify-center md:items-stretch mx-auto pt-6">
                <Flex className="order-1 flex-col items-center w-full md:w-1/2 max-w-lg md:justify-between p-8 md:px-16 my-2 md:mx-2 bg-gray-lightest">
                    <Box className="pb-8">
                        <Heading
                            as="h3"
                            variant="h4"
                            className="pb-2 text-center"
                        >
                            <span className="block mb-8 pb-2 text-sm uppercase border-b border-gray-light">
                                Option 1
                            </span>
                            Quick Release to You
                        </Heading>
                        <Text as="p" className="text-center">
                            Records sent directly to you. Requests processed
                            within 48 hours*.
                        </Text>
                    </Box>

                    <Button
                        as={Link}
                        href="/pih/patient"
                        variant="filled"
                        className="text-sm text-center"
                    >
                        Get Started
                    </Button>
                </Flex>
                <Box className="order-2 md:order-3 w-full md:w-1/2 px-8 md:px-16">
                    <Box className="py-2 border-b border-gray-light">
                        <Text
                            as="p"
                            className="text-sm text-center font-bold pb-2"
                        >
                            How long can it take to process my request?
                        </Text>
                        <Text as="p" className="text-sm text-center pb-2">
                            48 hours*
                        </Text>
                    </Box>
                    <Box className="py-2 border-b border-gray-light">
                        <Text
                            as="p"
                            className="text-sm text-center font-bold pb-2"
                        >
                            Can I order my records with my phone/tablet?
                        </Text>
                        <Text as="p" className="text-sm text-center pb-2">
                            Yes
                        </Text>
                    </Box>

                    <Box className="py-2 border-b border-gray-light">
                        <Text
                            as="p"
                            className="text-sm text-center font-bold pb-2"
                        >
                            Will I be told when my request is ready?
                        </Text>
                        <Text as="p" className="text-sm text-center pb-2">
                            Yes, immediately, by text message (see sample texts
                            below) or email
                        </Text>
                    </Box>
                    <Box className="py-2 border-b border-gray-light">
                        <Text
                            as="p"
                            className="text-sm text-center font-bold pb-2"
                        >
                            Can I access my own records?
                        </Text>
                        <Text as="p" className="text-sm text-center pb-2">
                            Yes
                        </Text>
                    </Box>
                    <Box className="py-2 border-b border-gray-light">
                        <Text
                            as="p"
                            className="text-sm text-center font-bold pb-2"
                        >
                            Can I print/email/save/fax my records?
                        </Text>
                        <Text as="p" className="text-sm text-center pb-2">
                            Yes, and you can share them with any 3rd party when
                            and how you want
                        </Text>
                    </Box>
                    <Box className="py-2 border-b border-gray-light">
                        <Text
                            as="p"
                            className="text-sm text-center font-bold pb-2"
                        >
                            How are my records made available?
                        </Text>
                        <Text as="p" className="text-sm text-center pb-2">
                            Online only. ***. The only item you may pick up or
                            have mailed to you is an X-Ray/MRI CD.
                        </Text>
                    </Box>
                    <Box className="pt-2 py-6">
                        <Text
                            as="p"
                            className="text-sm text-center font-bold pb-2"
                        >
                            Can I view my records on my phone/tablet?
                        </Text>
                        <Text as="p" className="text-sm text-center pb-2">
                            Yes
                        </Text>
                    </Box>
                </Box>
                <Flex className="order-3 md:order-2 flex-col items-center w-full md:w-1/2 max-w-lg md:justify-between p-8 md:px-16 my-2 md:mx-2 bg-gray-lightest">
                    <Box className="pb-8">
                        <Heading
                            as="h3"
                            variant="h4"
                            className="pb-2 text-center"
                        >
                            <span className="block mb-8 pb-2 text-sm uppercase border-b border-gray-light">
                                Option 2
                            </span>
                            Release to Healthcare Provider
                        </Heading>
                        <Text as="p" className="text-center">
                            Records sent directly to your healthcare provider.
                            Requests processed within 5-7 business days*.
                        </Text>
                    </Box>

                    <Button
                        as={Link}
                        href="/pih/thirdparty"
                        variant="filled"
                        className="text-sm text-center"
                    >
                        Get Started
                    </Button>
                </Flex>
                <Box className="order-4 w-full md:w-1/2 px-8 md:px-16">
                    <Box className="py-2 border-b border-gray-light">
                        <Text
                            as="p"
                            className="text-sm text-center font-bold pb-2"
                        >
                            How long can it take to process my request?
                        </Text>
                        <Text as="p" className="text-sm text-center pb-2">
                            48 hours*
                        </Text>
                    </Box>
                    <Box className="py-2 border-b border-gray-light">
                        <Text
                            as="p"
                            className="text-sm text-center font-bold pb-2"
                        >
                            Can I order my records with my phone/tablet?
                        </Text>
                        <Text as="p" className="text-sm text-center pb-2">
                            Yes
                        </Text>
                    </Box>

                    <Box className="py-2 border-b border-gray-light">
                        <Text
                            as="p"
                            className="text-sm text-center font-bold pb-2"
                        >
                            Will I be told when my request is ready?
                        </Text>
                        <Text as="p" className="text-sm text-center pb-2">
                            Yes, immediately, by text message (see sample texts
                            below) or email
                        </Text>
                    </Box>
                    <Box className="py-2 border-b border-gray-light">
                        <Text
                            as="p"
                            className="text-sm text-center font-bold pb-2"
                        >
                            Can I access my own records?
                        </Text>
                        <Text as="p" className="text-sm text-center pb-2">
                            Yes
                        </Text>
                    </Box>
                    <Box className="py-2 border-b border-gray-light">
                        <Text
                            as="p"
                            className="text-sm text-center font-bold pb-2"
                        >
                            Can I print/email/save/fax my records?
                        </Text>
                        <Text as="p" className="text-sm text-center pb-2">
                            Yes, and you can share them with any 3rd party when
                            and how you want
                        </Text>
                    </Box>
                    <Box className="py-2 border-b border-gray-light">
                        <Text
                            as="p"
                            className="text-sm text-center font-bold pb-2"
                        >
                            How are my records made available?
                        </Text>
                        <Text as="p" className="text-sm text-center pb-2">
                            Online only. ***. The only item you may pick up or
                            have mailed to you is an X-Ray/MRI CD.
                        </Text>
                    </Box>
                    <Box className="pt-2 py-6">
                        <Text
                            as="p"
                            className="text-sm text-center font-bold pb-2"
                        >
                            Can I view my records on my phone/tablet?
                        </Text>
                        <Text as="p" className="text-sm text-center pb-2">
                            Yes
                        </Text>
                    </Box>
                </Box>
            </Flex>
            <Flex className="flex-col">
                <Link href="/pih/patient">PIH - Patient - Instructions</Link>

                <Link href="/pih/thirdparty">
                    PIH - Third Party - Instructions
                </Link>
            </Flex>
        </Container>
    </Layout>
)

export default withStore(PIH)
