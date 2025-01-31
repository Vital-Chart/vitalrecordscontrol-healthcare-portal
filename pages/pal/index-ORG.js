import useNavigation from '@/lib/useNavigation'
import hospitals from '@/lib/hospitals'
import { Box, Link, Text, Button, Flex, Heading } from '@/components/core'
import { PageHeading, Info, LandingIntro } from '@/components/atoms'
import { Layout, Container } from '@/components/general'

const Hospital = () => {
    const { getLandingPage, hospital } = useNavigation()

    return (
        <Layout>
            <LandingIntro>
                <Heading
                    as="h1"
                    variant="h1"
                    className="pt-4 pb-6 mb-6 text-white border-b-2 border-white"
                >
                    Request Medical Records
                </Heading>
                <Text className="text-lg sm:text-xl text-white">
                    Through our online patient portal, VitalChart Virtual ROI,
                    patients can request medical records for themselves or send
                    them to a third-party.
                </Text>
            </LandingIntro>

            <Container id="newRequest" className="pt-12">
                <PageHeading className="text-center mb-6">
                    Order Your Medical Records Online
                </PageHeading>

                <Flex className="justify-center mb-6">
                    <Info secondaryText="NOTICE: This site is for Patient or Patient Directed Use Only. Fees for processing medical records requests are non-refundable." />
                </Flex>

                <Flex className="w-full max-w-5xl flex-col md:flex-row flex-wrap mx-auto mb-12">
                    <Flex className="flex-1 border-t-8 border-primary my-8 md:my-0 md:mx-8">
                        <Flex className="flex-col items-center md:justify-between w-full p-8 md:px-12 border border-gray-light">
                            <Box className="pb-8 w-full">
                                <Heading
                                    as="h3"
                                    variant="h4"
                                    className="pb-2 text-center"
                                >
                                    <Text
                                        as="span"
                                        className="block mb-4 text-sm uppercase"
                                    >
                                        Option 1
                                    </Text>
                                    Quick Release to You
                                </Heading>

                                <Text className="text-center">
                                    Your request is processed within 48 hours*,
                                    and your records will be available for
                                    download.
                                </Text>
                            </Box>

                            <Button
                                as={Link}
                                href={`${getLandingPage()}/patient`}
                                variant="filled"
                                className="text-sm text-center"
                            >
                                Begin
                            </Button>
                        </Flex>
                    </Flex>

                    <Flex className="flex-1 border-t-8 border-secondary">
                        <Flex className="flex-col items-center md:justify-between w-full p-8 md:px-12 border border-gray-light">
                            <Box className="pb-8 w-full">
                                <Heading
                                    as="h3"
                                    variant="h4"
                                    className="pb-2 text-center"
                                >
                                    <Text
                                        as="span"
                                        className="block mb-4 text-sm uppercase"
                                    >
                                        Option 2
                                    </Text>
                                    Release to Third-Party
                                </Heading>

                                <Text className="text-center">
                                    Your request is processed within{' '}
                                    {hospitals[hospital].processingTime ||
                                        '5-7 business days'}
                                    *, and your records are delivered to a
                                    third-party.
                                </Text>
                            </Box>

                            <Button
                                as={Link}
                                href={`${getLandingPage()}/sendtothirdparty`}
                                variant="filledSecondary"
                                className="text-sm text-center"
                            >
                                Begin
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Container>

            <Heading as="h3" variant="h5" className="mb-4 text-center">
                Need help choosing an option?
            </Heading>
            <Box className="w-full max-w-5xl mx-auto mb-12 border border-gray-light">
                <Flex className="w-full">
                    <Flex className="w-1/3 md:w-1/4 items-center px-4 py-3 border-b-8 border-primary">
                        <Text className="w-full text-xs uppercase font-bold text-center">
                            Option 1
                        </Text>
                    </Flex>
                    <Flex className="w-1/3 md:w-1/2 items-center px-4 py-3 border-b-8 border-gray-light bg-gray-lightest">
                        <Text className="w-full text-xs uppercase font-bold text-center">
                            Frequently Asked Questions
                        </Text>
                    </Flex>
                    <Flex className="w-1/3 md:w-1/4 items-center px-4 py-3 border-b-8 border-secondary">
                        <Text className="w-full text-xs uppercase font-bold text-center">
                            Option 2
                        </Text>
                    </Flex>
                </Flex>

                <Flex className="w-full border-b border-gray-light">
                    <Flex className="w-1/3 md:w-1/2 items-center px-4 py-3 order-2 bg-gray-lightest">
                        <Text className="w-full text-sm text-center">
                            How long can it take to process the request?
                        </Text>
                    </Flex>
                    <Flex className="w-1/3 md:w-1/4 items-center px-4 py-3 order-1">
                        <Text className="w-full text-sm text-center">
                            48 hours**
                        </Text>
                    </Flex>

                    <Flex className="w-1/3 md:w-1/4 items-center px-4 py-3 order-3">
                        <Text className="w-full text-sm text-center">
                            {hospitals[hospital].processingTime ||
                                '5-7 business days'}
                            **
                        </Text>
                    </Flex>
                </Flex>

                <Flex className="w-full border-b border-gray-light">
                    <Flex className="w-1/3 md:w-1/2 items-center px-4 py-3 order-2 bg-gray-lightest">
                        <Text className="w-full text-sm text-center">
                            Can I order records with the phone/tablet?
                        </Text>
                    </Flex>
                    <Flex className="w-1/3 md:w-1/4 items-center px-4 py-3  order-1">
                        <Text className="w-full text-sm text-center">Yes</Text>
                    </Flex>
                    <Flex className="w-1/3 md:w-1/4 items-center px-4 py-3 order-3">
                        <Text className="w-full text-sm text-center">Yes</Text>
                    </Flex>
                </Flex>

                <Flex className="w-full border-b border-gray-light">
                    <Flex className="w-1/3 md:w-1/2 items-center px-4 py-3 order-2 bg-gray-lightest">
                        <Text className="w-full text-sm text-center">
                            Will I be told when the request is ready?
                        </Text>
                    </Flex>
                    <Flex className="w-1/3 md:w-1/4 items-center px-4 py-3 order-1">
                        <Text className="w-full text-sm text-center">
                            Yes, immediately, by text message (see sample texts
                            below) or email
                        </Text>
                    </Flex>
                    <Flex className="w-1/3 md:w-1/4 items-center px-4 py-3 order-3">
                        <Text className="w-full text-sm text-center">
                            No, only the third-party is notified.
                        </Text>
                    </Flex>
                </Flex>

                <Flex className="w-full border-b border-gray-light">
                    <Flex className="w-1/3 md:w-1/2 items-center px-4 py-3 order-2 bg-gray-lightest">
                        <Text className="w-full text-sm text-center">
                            Can I print, email, save, and/or fax the records?
                        </Text>
                    </Flex>
                    <Flex className="w-1/3 md:w-1/4 items-center px-4 py-3 order-1">
                        <Text className="w-full text-sm text-center">
                            Yes. The most expedient method is electronic
                            delivery.
                        </Text>
                    </Flex>
                    <Flex className="w-1/3 md:w-1/4 items-center px-4 py-3 order-3">
                        <Text className="w-full text-sm text-center">
                            Yes. The most expedient method is electronic
                            delivery.
                        </Text>
                    </Flex>
                </Flex>

                <Flex className="w-full border-b border-gray-light">
                    <Flex className="w-1/3 md:w-1/2 items-center px-4 py-3 order-2 bg-gray-lightest">
                        <Text className="w-full text-sm text-center">
                            How can I access the imaging study?
                        </Text>
                    </Flex>
                    <Flex className="w-1/3 md:w-1/4 items-center px-4 py-3 order-1">
                        <Text className="w-full text-sm text-center">
                            Palomar Health can provide imaging study
                            electronically through 3rd party application. Please
                            inquire.
                        </Text>
                    </Flex>
                    <Flex className="w-1/3 md:w-1/4 items-center px-4 py-3 order-3">
                        <Text className="w-full text-sm text-center">
                            Palomar Health can provide imaging study via CD/DVD
                            for a flat rate fee. Please inquire.
                        </Text>
                    </Flex>
                </Flex>

                <Flex className="w-full">
                    <Flex className="w-1/3 md:w-1/2 items-center px-4 py-3 order-2 bg-gray-lightest">
                        <Text className="w-full text-sm text-center">
                            Can I view the records on a phone/tablet?
                        </Text>
                    </Flex>
                    <Flex className="w-1/3 md:w-1/4 items-center px-4 py-3 order-1">
                        <Text className="w-full text-sm text-center">Yes</Text>
                    </Flex>
                    <Flex className="w-1/3 md:w-1/4 items-center px-4 py-3 order-3">
                        <Text className="w-full text-sm text-center">Yes</Text>
                    </Flex>
                </Flex>
            </Box>

            <Flex
                as={Container}
                className="w-full max-w-5xl mx-auto flex-wrap items-start pb-16"
            >
                <Box className="w-full max-w-2xl py-8 md:pr-12 md:pb-0 leading-relaxed">
                    <Heading as="h3" variant="h4" className="pb-4">
                        Important - Please Read!
                    </Heading>
                    <Text className="pb-4">
                        * For Option 2, the designated third-party must retrieve
                        your written records online once your order is complete.
                        If you are uncertain that the third-party will do so,
                        use Option 1 instead. We are not responsible for the
                        third-party's willingness or ability to access your
                        records online.
                    </Text>
                    <Text className="pb-4">
                        ** The timeframe specified above for written records
                        excludes weekends and holidays.
                    </Text>
                    <Text className="pb-4">
                        *** For Option 2, you are solely responsible for the
                        following: (a) providing us the correct contact
                        information for the designated third-party; (b) making
                        the designated third-party aware that a notice will be
                        faxed to them when the written records are ready; and
                        (c) following up, if needed, with the third-party to
                        determine if they have received a faxed notice and/or
                        have accessed your records.
                    </Text>
                </Box>
                <Box className="w-full max-w-md py-8 px-12 bg-gray-lightest ">
                    <Heading as="h3" variant="h4" className="pb-4">
                        Sample Texts
                    </Heading>
                    <Text className="pb-4">
                        You will receive text messages similar to these samples:
                    </Text>
                    <Text className="pb-4">When your request is accepted:</Text>
                    <Box className="rounded-8 bg-white py-6 px-8 mb-4">
                        <Text className="w-full text-sm">
                            Your Medical Records request is in process. When
                            complete, you will get Acct # and PIN # for online
                            access.
                        </Text>
                        <Text className="w-full text-sm">
                            ({hospitals[hospital].name})
                        </Text>
                    </Box>

                    <Text className="pb-4">When your request is ready:</Text>
                    <Box className="rounded-8 bg-white py-6 px-8 mb-4">
                        <Text className="w-full text-sm">
                            Your Medical Records are ready!
                        </Text>
                        <Text className="w-full text-sm">
                            Go to https://roigateway.vrcroiplus.com/pal
                        </Text>
                        <Text className="text-sm">
                            Account #: xxxxxx PIN #: xxxx
                        </Text>
                        <Text className="text-sm">
                            ({hospitals[hospital].name})
                        </Text>
                    </Box>
                </Box>
            </Flex>
        </Layout>
    )
}

export default Hospital
