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
            <Flex className="justify-center mb-6">
                <Info
                    secondaryText="NOTICE: This site is for Patient or Patient Directed Use
                    Only. Fees for processing medical records requests are non-refundable."
                />
            </Flex>

            <Flex className="max-w-screen-lg flex-col md:flex-row flex-wrap md:justify-center mx-auto">
                <Flex className="order-1 w-full md:w-1/2 md:px-4">
                    <Flex className="flex-col items-center md:justify-between w-full p-8 md:px-12 lg:px-20 border-t-8 border-primary">
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
                <Flex className="order-2 md:order-3 flex-col items-center w-full md:w-1/2 md:justify-between py-2 md:px-16">
                    <Box as="ul" className="text-sm">
                        <Flex as="li" className="mb-4">
                            <IconCheck className="flex-shrink-0 h-5 w-5 mr-4 text-primary" />
                            <Text as="span">
                                Requests processed within 48 hours*.
                            </Text>
                        </Flex>
                        <Flex as="li" className="mb-4">
                            <IconCheck className="flex-shrink-0 h-5 w-5 mr-4 text-primary" />
                            <Text as="span">
                                Order and view records with your phone, tablet,
                                or computer.
                            </Text>
                        </Flex>
                        <Flex as="li" className="mb-4">
                            <IconCheck className="flex-shrink-0 h-5 w-5 mr-4 text-primary" />
                            <Text as="span">
                                Receive notification when your request is ready.
                            </Text>
                        </Flex>
                        <Flex as="li" className="mb-4">
                            <IconCheck className="flex-shrink-0 h-5 w-5 mr-4 text-primary" />
                            <Text as="span">Access your own records.</Text>
                        </Flex>
                        <Flex as="li" className="mb-4">
                            <IconCheck className="flex-shrink-0 h-5 w-5 mr-4 text-primary" />
                            <Text as="span">
                                Print, email, save, fax, and share your records
                                with any 3rd party when and how you want.
                            </Text>
                        </Flex>
                        <Flex as="li" className="mb-4">
                            <IconCheck className="flex-shrink-0 h-5 w-5 mr-4 text-primary" />
                            <Text as="span">
                                Records made available online only***. The only
                                item you may pick up or have mailed to you is an
                                X-Ray/MRI CD.
                            </Text>
                        </Flex>
                    </Box>
                </Flex>
                <Flex className="order-3 md:order-2 w-full md:w-1/2 md:px-4">
                    <Flex className="flex-col items-center md:justify-between w-full p-8 md:px-12 lg:px-20 border-t-8 border-secondary">
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
                <Flex className="order-4 md:order-3 flex-col items-center w-full md:w-1/2 md:justify-between py-2 md:px-16">
                    <Box as="ul" className="text-sm">
                        <Flex as="li" className="mb-4">
                            <IconCheck className="flex-shrink-0 h-5 w-5 mr-4 text-primary" />
                            <Text as="span">
                                Requests processed within 5-7 days*.
                            </Text>
                        </Flex>
                        <Flex as="li" className="mb-4">
                            <IconCheck className="flex-shrink-0 h-5 w-5 mr-4 text-primary" />
                            <Text as="span">
                                Order and view records with your phone, tablet,
                                or computer.
                            </Text>
                        </Flex>
                        <Flex as="li" className="mb-4">
                            <IconCheck className="flex-shrink-0 h-5 w-5 mr-4 text-primary" />
                            <Text as="span">
                                Receive notification when your request is ready.
                            </Text>
                        </Flex>
                        <Flex as="li" className="mb-4">
                            <IconCheck className="flex-shrink-0 h-5 w-5 mr-4 text-primary" />
                            <Text as="span">Access your own records.</Text>
                        </Flex>
                        <Flex as="li" className="mb-4">
                            <IconCheck className="flex-shrink-0 h-5 w-5 mr-4 text-primary" />
                            <Text as="span">
                                Print, email, save, fax, and share your records
                                with any 3rd party when and how you want.
                            </Text>
                        </Flex>
                        <Flex as="li" className="mb-4">
                            <IconCheck className="flex-shrink-0 h-5 w-5 mr-4 text-primary" />
                            <Text as="span">
                                Records made available online only***. The only
                                item you may pick up or have mailed to you is an
                                X-Ray/MRI CD.
                            </Text>
                        </Flex>
                    </Box>
                </Flex>
            </Flex>
        </Container>
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
