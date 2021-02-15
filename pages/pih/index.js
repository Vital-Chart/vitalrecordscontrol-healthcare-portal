import { withStore } from '@/lib/store'
import { Box, Link, Text, Button, Flex, Heading } from '@/components/core'
import { PageHeading, Info } from '@/components/atoms'
import { Layout, Container } from '@/components/general'
import IconCheck from '@/icons/icon-check.svg'

const PIH = ({ store }) => (
    <Layout>
        <Container>
            <PageHeading className="text-center mb-6">
                Order Your Medical Records Online
            </PageHeading>
            <Flex className=" mb-6">
                <Info
                    secondaryText="NOTICE: This site is for Patient or Patient Directed Use
                    Only. Fees for processing medical records requests are non-refundable."
                />
            </Flex>

            <Flex className="max-w-4xl flex-col md:flex-row flex-wrap md: mx-auto mb-12">
                <Flex className="flex-1 mx-4 border-t-8 border-primary">
                    <Flex className="flex-col items-center md:justify-between w-full p-8 md:px-12 border border-gray-light">
                        <Box className="pb-8">
                            <Heading
                                as="h3"
                                variant="h4"
                                className="pb-2 text-center"
                            >
                                <span className="block mb-4 text-sm uppercase">
                                    Option 1
                                </span>
                                Quick Release to You
                            </Heading>
                            <Text as="p" className="text-center">
                                Your request is processed within 48 hours*, and
                                your records are sent directly to you.
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
                </Flex>
                <Flex className="flex-1 mx-4 border-t-8 border-secondary">
                    <Flex className="flex-col items-center md:justify-between w-full p-8 md:px-12 border border-gray-light">
                        <Box className="pb-8">
                            <Heading
                                as="h3"
                                variant="h4"
                                className="pb-2 text-center"
                            >
                                <span className="block mb-4 text-sm uppercase">
                                    Option 2
                                </span>
                                Release to Healthcare Provider
                            </Heading>
                            <Text as="p" className="text-center">
                                Your request is processed within 5-7 days*, and
                                your records are sent directly to your
                                healthcare provider.
                            </Text>
                        </Box>

                        <Button
                            as={Link}
                            href="/pih/patient"
                            variant="filledSecondary"
                            className="text-sm text-center"
                        >
                            Get Started
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Container>

        <Box className="max-w-4xl mx-auto mb-12 border border-gray-light">
            {/* <Heading as="h3" variant="h4" className="mb-6 text-center">
                Need help choosing an option?
            </Heading> */}
            <Flex className="w-full">
                <Flex className="w-1/4 items-center px-4 py-3 border-b-8 border-primary">
                    <Text
                        as="p"
                        className="w-full text-xs uppercase font-bold text-center"
                    >
                        Option 1
                    </Text>
                </Flex>
                <Flex className="w-1/2 items-center px-4 py-3 border-b-8 border-gray-light bg-gray-lightest">
                    <Text
                        as="p"
                        className="w-full text-xs uppercase font-bold text-center"
                    >
                        Frequently Asked Questions
                    </Text>
                </Flex>
                <Flex className="w-1/4 items-center px-4 py-3 border-b-8 border-secondary">
                    <Text
                        as="p"
                        className="w-full text-xs uppercase font-bold text-center"
                    >
                        Option 2
                    </Text>
                </Flex>
            </Flex>

            <Flex className="w-full border-b border-gray-light">
                <Flex className="w-1/2 items-center px-4 py-3 order-2 bg-gray-lightest">
                    <Text as="p" className="w-full text-sm text-center">
                        How long can it take to process my request?
                    </Text>
                </Flex>
                <Flex className="w-1/4 items-center px-4 py-3 order-1">
                    <Text as="p" className="w-full text-sm text-center">
                        48 hours*
                    </Text>
                </Flex>

                <Flex className="w-1/4 items-center px-4 py-3 order-3">
                    <Text as="p" className="w-full text-sm text-center">
                        5-7 business days*
                    </Text>
                </Flex>
            </Flex>

            <Flex className="w-full border-b border-gray-light">
                <Flex className="w-1/2 items-center px-4 py-3 order-2 bg-gray-lightest">
                    <Text as="p" className="w-full text-sm text-center">
                        Can I order my records with my phone/tablet?
                    </Text>
                </Flex>
                <Flex className="w-1/4 items-center px-4 py-3  order-1">
                    <Text as="p" className="w-full text-sm text-center">
                        Yes
                    </Text>
                </Flex>
                <Flex className="w-1/4 items-center px-4 py-3 order-3">
                    <Text as="p" className="w-full text-sm text-center">
                        Yes
                    </Text>
                </Flex>
            </Flex>

            <Flex className="w-full border-b border-gray-light">
                <Flex className="w-1/2 items-center px-4 py-3 order-2 bg-gray-lightest">
                    <Text as="p" className="w-full text-sm text-center">
                        Will I be told when my request is ready?
                    </Text>
                </Flex>
                <Flex className="w-1/4 items-center px-4 py-3 order-1">
                    <Text as="p" className="w-full text-sm text-center">
                        Yes, immediately, by text message (see sample texts
                        below) or email
                    </Text>
                </Flex>
                <Flex className="w-1/4 items-center px-4 py-3 order-3">
                    <Text as="p" className="w-full text-sm text-center">
                        No, only the Healthcare Provider is notified (by fax)***
                    </Text>
                </Flex>
            </Flex>

            <Flex className="w-full border-b border-gray-light">
                <Flex className="w-1/2 items-center px-4 py-3 order-2 bg-gray-lightest">
                    <Text as="p" className="w-full text-sm text-center">
                        Can I access my own records?
                    </Text>
                </Flex>
                <Flex className="w-1/4 items-center px-4 py-3 order-1">
                    <Text as="p" className="w-full text-sm text-center">
                        Yes
                    </Text>
                </Flex>
                <Flex className="w-1/4 items-center px-4 py-3 order-3">
                    <Text as="p" className="w-full text-sm text-center">
                        No
                    </Text>
                </Flex>
            </Flex>

            <Flex className="w-full border-b border-gray-light">
                <Flex className="w-1/2 items-center px-4 py-3 order-2 bg-gray-lightest">
                    <Text as="p" className="w-full text-sm text-center">
                        Can I print/email/save/fax my records?
                    </Text>
                </Flex>
                <Flex className="w-1/4 items-center px-4 py-3 order-1">
                    <Text as="p" className="w-full text-sm text-center">
                        Yes, and you can share them with any 3rd party when and
                        how you want
                    </Text>
                </Flex>
                <Flex className="w-1/4 items-center px-4 py-3 order-3">
                    <Text as="p" className="w-full text-sm text-center">
                        No
                    </Text>
                </Flex>
            </Flex>

            <Flex className="w-full border-b border-gray-light">
                <Flex className="w-1/2 items-center px-4 py-3 order-2 bg-gray-lightest">
                    <Text as="p" className="w-full text-sm text-center">
                        How are my records made available?
                    </Text>
                </Flex>
                <Flex className="w-1/4 items-center px-4 py-3 order-1">
                    <Text as="p" className="w-full text-sm text-center">
                        Online only. ***. The only item you may pick up or have
                        mailed to you is an X-Ray/MRI CD.
                    </Text>
                </Flex>
                <Flex className="w-1/4 items-center px-4 py-3 order-3">
                    <Text as="p" className="w-full text-sm text-center">
                        Online only. *** The only item mailed to the Healthcare
                        Provider is an X-Ray/MRI CD.
                    </Text>
                </Flex>
            </Flex>

            <Flex className="w-full border-b border-gray-light">
                <Flex className="w-1/2 items-center px-4 py-3 order-2 bg-gray-lightest">
                    <Text as="p" className="w-full text-sm text-center">
                        Can I view my records on my phone/tablet?
                    </Text>
                </Flex>
                <Box className="w-1/4 px-4 py-3 order-1">
                    <Text as="p" className="w-full text-sm text-center">
                        Yes
                    </Text>
                </Box>
                <Box className="w-1/4 px-4 py-3 order-3">
                    <Text as="p" className="w-full text-sm text-center">
                        No
                    </Text>
                </Box>
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
                        <Text as="p" className="w-full text-sm text-center">
                            Your Medical Records request is in process. When
                            complete, you will get Acct # and PIN # for online
                            access.
                        </Text>
                        <Text as="p" className="w-full text-sm text-center">
                            (PIH Health Whittier Hospital)
                        </Text>
                    </Box>

                    <Text as="p" className="pb-4">
                        When your request is ready:
                    </Text>
                    <Box className="rounded-8 bg-white py-6 px-8 mb-4">
                        <Text as="p" className="w-full text-sm text-center">
                            Your Medical Records are ready!
                        </Text>
                        <Text as="p" className="w-full text-sm text-center">
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
