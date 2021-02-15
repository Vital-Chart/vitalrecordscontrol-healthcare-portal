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

        <Flex className="justify-center">
            <Box className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
                <Box className="p-6">
                    <Heading variant="h3">Quick release to you</Heading>
                    <Text as="p" className="mt-2 mb-8 text-sm text-gray-dark">
                        All the basics for starting a new business
                    </Text>
                    <Button
                        as={Link}
                        href="/pih/patient"
                        variant="filled"
                        className="text-sm text-center"
                    >
                        Get Started
                    </Button>
                </Box>
                <Box className="pt-6 pb-8 px-6">
                    <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">
                        What's included
                    </h3>
                    <ul className="mt-6 space-y-4">
                        <li className="flex space-x-3">
                            <svg
                                className="flex-shrink-0 h-5 w-5 text-green-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <span className="text-sm text-gray-500">
                                Potenti felis, in cras at at ligula nunc.
                            </span>
                        </li>

                        <li className="flex space-x-3">
                            <svg
                                className="flex-shrink-0 h-5 w-5 text-green-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <span className="text-sm text-gray-500">
                                Orci neque eget pellentesque.
                            </span>
                        </li>
                    </ul>
                </Box>
            </Box>

            <Box className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
                <Box className="p-6">
                    <Heading className="text-lg leading-6 font-medium text-gray-900">
                        Freelancer
                    </Heading>
                    <p className="mt-4 text-sm text-gray-500">
                        All the basics for starting a new business
                    </p>
                    <p className="mt-8">
                        <span className="text-4xl font-extrabold text-gray-900">
                            $24
                        </span>
                        <span className="text-base font-medium text-gray-500">
                            /mo
                        </span>
                    </p>
                    <a
                        href="#"
                        className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                    >
                        Buy Freelancer
                    </a>
                </Box>
                <Box className="pt-6 pb-8 px-6">
                    <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">
                        What's included
                    </h3>
                    <ul className="mt-6 space-y-4">
                        <li className="flex space-x-3">
                            <svg
                                className="flex-shrink-0 h-5 w-5 text-green-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <span className="text-sm text-gray-500">
                                Potenti felis, in cras at at ligula nunc.{' '}
                            </span>
                        </li>

                        <li className="flex space-x-3">
                            <svg
                                className="flex-shrink-0 h-5 w-5 text-green-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <span className="text-sm text-gray-500">
                                Orci neque eget pellentesque.
                            </span>
                        </li>

                        <li className="flex space-x-3">
                            <svg
                                className="flex-shrink-0 h-5 w-5 text-green-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <span className="text-sm text-gray-500">
                                Donec mauris sit in eu tincidunt etiam.
                            </span>
                        </li>
                    </ul>
                </Box>
            </Box>
        </Flex>

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
