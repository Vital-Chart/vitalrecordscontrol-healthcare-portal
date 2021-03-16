import useNavigation from '@/lib/useNavigation'
import { Box, Link, Text, Button, Flex, Heading } from '@/components/core'
import { PageHeading, Info } from '@/components/atoms'
import { Layout, Container } from '@/components/general'

const Hospital = () => {
    const { hospital, getLandingPage } = useNavigation()

    return (
        <Layout>
            <Flex className="py-32 items-center bg-landing-bg-gray bg-center bg-cover">
                <Container>
                    <Box className="max-w-xl text-center sm:text-left">
                        <Heading
                            as="h1"
                            variant="h1"
                            className="pt-4 pb-6 mb-6 text-white border-b-2 border-white"
                        >
                            Request Medical Records
                        </Heading>
                        <Text className="text-lg sm:text-xl text-white">
                            Through our online patient portal, VitalChart
                            Virtual ROI, patients can request medical records
                            for themselves or send them to a third-party.
                        </Text>
                        <Box className="mt-6 -ml-2">
                            <Button
                                as={Link}
                                href={`${hospital}/#newRequest`}
                                variant="filledSecondary"
                                className="flex-grow m-2 text-center"
                            >
                                Start New Request
                            </Button>

                            <Button
                                as={Link}
                                href={getLandingPage()}
                                variant="filledSecondary"
                                className="flex-grow m-2 text-center"
                            >
                                Track Request or Download Records
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Flex>
            <Container id="newRequest" className="pt-12">
                <PageHeading className="text-center mb-6">
                    Order Your Medical Records Online
                </PageHeading>

                <Flex className="justify-center mb-6">
                    <Info secondaryText="NOTICE: This site is for Patient or Patient Directed Use Only. Fees for processing medical records requests are non-refundable." />
                </Flex>

                <Flex className="max-w-5xl flex-col md:flex-row space-y-8 md:space-x-8 md:space-y-0 flex-wrap mx-auto mb-12">
                    <Flex className="flex-1 border-t-8 border-primary">
                        <Flex className="flex-col items-center md:justify-between w-full p-8 md:px-12 border border-gray-light">
                            <Box className="pb-8">
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
                                    Your request is processed within 5-7
                                    business days, and your records will be
                                    available for download.
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
                </Flex>
                <Box>
                    <Heading as="h3" variant="h3" className="mb-4 text-center">
                        Frequently Asked Questions
                    </Heading>
                    <Box className="mx-auto mb-12 border border-gray-light">
                        <Flex className="w-full border-b border-gray-light">
                            <Flex className="w-1/2 items-center px-4 py-3 bg-gray-lightest">
                                <Text className="w-full text-sm text-center">
                                    How long can it take to process my request?
                                </Text>
                            </Flex>
                            <Flex className="w-1/2 items-center px-4 py-3">
                                <Text className="w-full text-sm text-center">
                                    48 hours**
                                </Text>
                            </Flex>
                        </Flex>

                        <Flex className="w-full border-b border-gray-light">
                            <Flex className="w-1/2 items-center px-4 py-3 bg-gray-lightest">
                                <Text className="w-full text-sm text-center">
                                    Can I order my records with my phone/tablet?
                                </Text>
                            </Flex>
                            <Flex className="w-1/2 items-center px-4 py-3">
                                <Text className="w-full text-sm text-center">
                                    Yes
                                </Text>
                            </Flex>
                        </Flex>

                        <Flex className="w-full border-b border-gray-light">
                            <Flex className="w-1/2 items-center px-4 py-3  bg-gray-lightest">
                                <Text className="w-full text-sm text-center">
                                    Will I be told when my request is ready?
                                </Text>
                            </Flex>
                            <Flex className="w-1/2 items-center px-4 py-3">
                                <Text className="w-full text-sm text-center">
                                    Yes, immediately, by text message (see
                                    sample texts below) or email
                                </Text>
                            </Flex>
                        </Flex>

                        <Flex className="w-full border-b border-gray-light">
                            <Flex className="w-1/2 items-center px-4 py-3 bg-gray-lightest">
                                <Text className="w-full text-sm text-center">
                                    Can I access my own records?
                                </Text>
                            </Flex>
                            <Flex className="w-1/2 items-center px-4 py-3">
                                <Text className="w-full text-sm text-center">
                                    Yes
                                </Text>
                            </Flex>
                        </Flex>

                        <Flex className="w-full border-b border-gray-light">
                            <Flex className="w-1/2 items-center px-4 py-3 bg-gray-lightest">
                                <Text className="w-full text-sm text-center">
                                    Can I print, email, save, and/or fax my
                                    records?
                                </Text>
                            </Flex>
                            <Flex className="w-1/2 items-center px-4 py-3">
                                <Text className="w-full text-sm text-center">
                                    Yes, and you can share them with any 3rd
                                    party when and how you want
                                </Text>
                            </Flex>
                        </Flex>

                        <Flex className="w-full border-b border-gray-light">
                            <Flex className="w-1/2 items-center px-4 py-3 bg-gray-lightest">
                                <Text className="w-full text-sm text-center">
                                    How are my records made available?
                                </Text>
                            </Flex>
                            <Flex className="w-1/2 items-center px-4 py-3">
                                <Text className="w-full text-sm text-center">
                                    Online only.*** The only item you may pick
                                    up or have mailed to you is an X-Ray/MRI CD.
                                </Text>
                            </Flex>
                        </Flex>

                        <Flex className="w-full">
                            <Flex className="w-1/2 items-center px-4 py-3 bg-gray-lightest">
                                <Text className="w-full text-sm text-center">
                                    Can I view my records on my phone/tablet?
                                </Text>
                            </Flex>
                            <Flex className="w-1/2 items-center px-4 py-3">
                                <Text className="w-full text-sm text-center">
                                    Yes
                                </Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Box>
                <Box className="w-full py-8 px-12 mb-12 bg-gray-lightest">
                    <Heading as="h3" variant="h4" className="pb-4">
                        Sample Texts
                    </Heading>
                    <Text className="pb-4">
                        You will receive text messages similar to these samples:
                    </Text>

                    <Flex className="space-x-8">
                        <Box className="w-1/2">
                            <Text className="pb-4">
                                When your request is accepted:
                            </Text>
                            <Box className="rounded-8 bg-white py-6 px-8 mb-4">
                                <Text className="w-full text-sm">
                                    Your Medical Records request is in process.
                                    When complete, you will get Acct # and PIN #
                                    for online access.
                                </Text>
                                <Text className="w-full text-sm">
                                    (UCSF Hosptial)
                                </Text>
                            </Box>
                        </Box>

                        <Box className="w-1/2">
                            <Text className="pb-4">
                                When your request is ready:
                            </Text>
                            <Box className="rounded-8 bg-white py-6 px-8 mb-4">
                                <Text className="w-full text-sm">
                                    Your Medical Records are ready!
                                </Text>
                                <Text className="w-full text-sm">
                                    Go to https://myroiplus.com
                                </Text>
                                <Text className="text-sm">
                                    Account #: xxxxxx PIN #: xxxx
                                </Text>
                                <Text className="text-sm">(UCSF Hospital)</Text>
                            </Box>
                        </Box>
                    </Flex>
                </Box>
            </Container>
        </Layout>
    )
}

export default Hospital
