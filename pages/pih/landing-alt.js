import { withStore } from '@/lib/store'
import { Box, Link, Text, Button, Flex, Heading } from '@/components/core'
import { PageHeading, Info } from '@/components/atoms'
import { Layout, Container } from '@/components/general'

const PIH = ({ store }) => (
    <Layout>
        <Container>
            <Heading className="text-center mb-6">
                Order Your Medical Records Online
            </Heading>
            <Flex className="justify-center mb-6">
                <Info
                    secondaryText="NOTICE: This site is for Patient or Patient Directed Use
                    Only. Fees for processing medical records requests are non-refundable."
                />
            </Flex>
        </Container>
        <Box className="max-w-screen-md mx-auto pb-12">
            <Flex>
                <Flex className="w-full flex-col items-center justify-between p-6 md:px-24 bg-primary-dark">
                    <Box className="pb-4">
                        <Heading
                            as="h3"
                            variant="h4"
                            className="pb-2 text-center text-white"
                        >
                            <span className="block mb-4 text-sm uppercase">
                                Option 1
                            </span>
                            Quick Release to You
                        </Heading>
                        <Text
                            as="p"
                            className="text-sm md:text-base text-center text-white"
                        >
                            Records sent directly to you. Requests processed
                            within 48 hours*.
                        </Text>
                    </Box>

                    <Button
                        as={Link}
                        href="/pih/patient"
                        variant="filledReverse"
                        className="text-sm text-center"
                    >
                        Get Started
                    </Button>
                </Flex>

                <Flex className="w-full flex-col items-center justify-between p-6 md:px-24 bg-secondary-dark">
                    <Box className="pb-4">
                        <Heading
                            as="h3"
                            variant="h4"
                            className="pb-2 text-center text-white"
                        >
                            <span className="block mb-4 text-sm uppercase text-white opacity-60">
                                Option 2
                            </span>
                            Release to Healthcare Provider
                        </Heading>
                        <Text
                            as="p"
                            className="text-sm md:text-base text-center text-white"
                        >
                            Records sent directly to your healthcare provider.
                            Requests processed within 5-7 business days*.
                        </Text>
                    </Box>

                    <Button
                        as={Link}
                        href="/pih/patient"
                        variant="secondaryReverse"
                        className="text-sm text-center"
                    >
                        Get Started
                    </Button>
                </Flex>
            </Flex>

            <Box className="bg-black py-2">
                <Text
                    as="p"
                    className="text-center text-sm text-white font-bold"
                >
                    How long can it take to process my request?
                </Text>
            </Box>
            <Flex>
                <Flex className="w-full p-6 bg-tertiary-lightest">
                    <Box className="p-2">
                        <Text as="p" className="text-center text-sm">
                            Records sent directly to your healthcare provider.
                            Requests processed within 5-7 business days*.
                        </Text>
                    </Box>
                </Flex>

                <Flex className="w-full p-6 bg-secondary-lightest">
                    <Box className="p-2">
                        <Text as="p" className="text-center text-sm">
                            Records sent directly to your healthcare provider.
                            Requests processed within 5-7 business days*.
                        </Text>
                    </Box>
                </Flex>
            </Flex>
            <Box className="bg-black py-2">
                <Text
                    as="p"
                    className="text-center text-sm text-white font-bold"
                >
                    How long can it take to process my request?
                </Text>
            </Box>
            <Flex>
                <Flex className="w-full p-6 bg-tertiary-lightest">
                    <Box className="p-2">
                        <Text as="p" className="text-center text-sm">
                            Records sent directly to your healthcare provider.
                            Requests processed within 5-7 business days*.
                        </Text>
                    </Box>
                </Flex>

                <Flex className="w-full p-6 bg-secondary-lightest">
                    <Box className="p-2">
                        <Text as="p" className="text-center text-sm">
                            Records sent directly to your healthcare provider.
                            Requests processed within 5-7 business days*.
                        </Text>
                    </Box>
                </Flex>
            </Flex>
            <Box className="bg-black py-2">
                <Text
                    as="p"
                    className="text-center text-sm text-white font-bold"
                >
                    How long can it take to process my request?
                </Text>
            </Box>
            <Flex>
                <Flex className="w-full p-6 bg-tertiary-lightest">
                    <Box className="p-2">
                        <Text as="p" className="text-center text-sm">
                            Records sent directly to your healthcare provider.
                            Requests processed within 5-7 business days*.
                        </Text>
                    </Box>
                </Flex>

                <Flex className="w-full p-6 bg-secondary-lightest">
                    <Box className="p-2">
                        <Text as="p" className="text-center text-sm">
                            Records sent directly to your healthcare provider.
                            Requests processed within 5-7 business days*.
                        </Text>
                    </Box>
                </Flex>
            </Flex>
            <Box className="bg-black py-2">
                <Text
                    as="p"
                    className="text-center text-sm text-white font-bold"
                >
                    How long can it take to process my request?
                </Text>
            </Box>
            <Flex>
                <Flex className="w-full p-6 bg-tertiary-lightest">
                    <Box className="p-2">
                        <Text as="p" className="text-center text-sm">
                            Records sent directly to your healthcare provider.
                            Requests processed within 5-7 business days*.
                        </Text>
                    </Box>
                </Flex>

                <Flex className="w-full p-6 bg-secondary-lightest">
                    <Box className="p-2">
                        <Text as="p" className="text-center text-sm">
                            Records sent directly to your healthcare provider.
                            Requests processed within 5-7 business days*.
                        </Text>
                    </Box>
                </Flex>
            </Flex>
        </Box>

        <Box className="bg-gray-lightest py-12">
            <Flex as={Container} className="flex-col md:flex-row">
                <Box className="w-full md:w-2/3 pb-8 md:pr-12 md:pb-0 mb-12 md:mb-0 md:mr-12 border-b-2 md:border-r-2 md:border-b-0 border-gray-light leading-relaxed">
                    <Heading as="h3" variant="h4" className="pb-4">
                        Notes
                    </Heading>
                    <Text as="p" className="pb-4">
                        * For Option 2, the designated Healthcare Provider must
                        retrieve your written records online once your order is
                        complete. If you are uncertain that the Healthcare
                        Provider will do so, use Option 1 instead. We are not
                        responsible for the Healthcare Provider's willingness or
                        ability to access your records online.
                    </Text>
                    <Text as="p" className="pb-4">
                        ** The timeframe specified above for written records
                        excludes weekends and holidays. X-ray/MRI images take
                        longer to process than written records because they must
                        be prepared by clinic staff and copied to a CD. Once the
                        imaging CD is ready, please allow an additional average
                        of 14 business days for mail delivery time.
                    </Text>
                    <Text as="p" className="pb-4">
                        *** For Option 2, you are solely responsible for the
                        following: (a) providing us the correct contact
                        information for the designated Healthcare Provider; (b)
                        making the designated Healthcare Provider aware that a
                        notice will be faxed to them when the written records
                        are ready and that they must access those records
                        online; and (c) following up, if needed, with the
                        Healthcare Provider to determine if they have received a
                        faxed notice and/or have accessed your records.
                    </Text>
                </Box>
                <Box className="w-full md:w-1/3">
                    <Heading as="h3" variant="h4" className="pb-4">
                        Sample Texts
                    </Heading>
                    <Text as="p" className="pb-4">
                        You will receive text messages similar to these samples:
                    </Text>
                    <Text as="p" className="pb-4">
                        When your request is accepted:
                    </Text>
                    <Box className="rounded-8 bg-white py-6 px-8 mb-4">
                        <Text as="p" className="text-sm">
                            Your Medical Records request is in process. When
                            complete, you will get Acct # and PIN # for online
                            access.
                        </Text>
                        <Text as="p" className="text-sm">
                            (PIH Health Whittier Hospital)
                        </Text>
                    </Box>

                    <Text as="p" className="pb-4">
                        When your request is ready:
                    </Text>
                    <Box className="rounded-8 bg-white py-6 px-8 mb-4">
                        <Text as="p" className="text-sm">
                            Your Medical Records are ready!
                        </Text>
                        <Text as="p" className="text-sm">
                            Go to{' '}
                            <Link
                                href="https://abt.trimsnet.net/patient/landing/stros"
                                className="text-blue"
                            >
                                https://myroiplus.com
                            </Link>
                        </Text>
                        <Text className="text-sm">
                            Account #: xxxxxx PIN #: xxxx
                        </Text>
                        <Text className="text-sm">
                            (PIH Health Whittier Hospital)
                        </Text>
                    </Box>
                </Box>
            </Flex>
        </Box>
    </Layout>
)

export default withStore(PIH)
