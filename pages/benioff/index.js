import useNavigation from '@/lib/useNavigation'
import hospitals from '@/lib/hospitals'
import { Box, Link, Text, Button, Flex, Heading } from '@/components/core'
import { PageHeading, Info, LandingIntro } from '@/components/atoms'
import { Layout, Container } from '@/components/general'

const Hospital = () => {
    const { getLandingPage, hospital } = useNavigation()

    return (
        <Layout>

            
<Container id='recordChoice'>
                <Box className="w-full max-w-screen-md">
                    <Text className="text-2xl text-center font-bold">
                    <br />How to Obtain Medical Records and Test Results
                    </Text>

                    <Box className="mt-8">
                        <Text className="text-lg">
                        <p>At UCSF Health and our affiliated practices, we believe in information transparency.
                        We want you (and, when appropriate, your health care proxies) to see your health
                        information as soon as it’s available. We believe this improves communication and builds
                        better relationships.</p>
                        </Text>
                    </Box> 

                    <Box className="mt-8">
                        <Text className="text-xl font-bold">
                        <p>There are Two Ways to Obtain Your UCSF Medical Records:</p><br />
                        </Text>
                    
                        <Text>
                        <a class='text-blue text-xl underline' href='https://www.ucsfhealth.org/mychart'>MyChart: - https://www.ucsfhealth.org/mychart</a>
                        </Text>

                        <div className="text-xl my-2">
                        <span class='ml-48'>OR</span>
                        </div>

                        <Text>
                        <a class='text-blue text-xl underline' href='#landingIntro'>Health Information Management Services</a> (see link below)
                        </Text>
                    </Box>
                    
                    <Box className="mt-8">
                        <Text className="text-2xl  font-bold">
                        What is Available in MyChart<br />
                        </Text>
                        Most clinical notes, test results including laboratory, radiology, cardiology and
                         microbiology results are available and visible in MyChart without your making a
                         request. This allows you to prepare for your next health care visit by reviewing
                         your health care provider's recommendations and noting any questions you want to ask.
                        
                        <br /><br />To obtain your record via MyChart <a class='text-blue underline' href='https://www.ucsfhealth.org/mychart'>click here - https://www.ucsfhealth.org/mychart</a>
                    
                    </Box>

                    <Box className="mt-8">
                        <Text className="text-2xl font-bold">
                        What is Available from Health Information Management Services<br />
                        </Text>
                        Your complete medical record, test results or clinical notes that are <b><i>not</i></b> available in
                         MyChart, you can request from our Medical Records Department. Using this option will require 
                         completion of a Health Information Authorization Form.<br /><br />

                        There will be a $25 Processing fee for records transferred to a CD or our Patient Portal.<br /><br />

                        If your records are produced from your paper record there will be charge of 25 cents per page.<br /><br />

                        You may request your records online, via mail or fax.
                     <br /><br />For online request, to obtain your record from Health Information Management Services <a  class='text-blue underline underline' href='#landingIntro'>click here</a>
                    </Box>
 
                    <Box>
                    <Text className="text-xl font-bold">
                    <br /><br />To Mail or Fax your Written Requests:<br />
                    </Text>
                    Health Information Management Services<br />
                    Benioff Children's Hospital Oakland<br />
                    747 52nd Street<br />
                    Oakland, CA 94609<br />
                    Fax 510-658-1923<br /><br />
                    </Box>
                </Box>
            </Container>



            <div id='landingIntro'></div>

            <LandingIntro>
                <Heading
                    as="h1"
                    variant="h1"
                    className="pt-4 pb-6 mb-6 text-white border-b-2 border-white"
                >
                    Request Medical Records
                </Heading>
                <Text className="text-lg sm:text-xl text-white">
                    Through our online patient portal, you can request your
                    medical records, track a request, or download records.
                </Text>
            </LandingIntro>

            <Container id="newRequest" className="pt-12">
                <PageHeading className="text-center mb-6">
                    Order Your Medical Records Online
                </PageHeading>

                <Flex className="justify-center mb-6">
                    <Info secondaryText="NOTICE: This site is for Patient or Patient Directed Use Only. Fees for processing medical records requests are non-refundable." />
                </Flex>

                <Box className="w-full max-w-xl mx-auto mb-12 border-t-8 border-primary">
                    <Flex className="flex-col items-center w-full p-8 md:px-12 border-r border-b border-l border-gray-light">
                        <Box className="pb-8 w-full">
                            <Heading
                                as="h3"
                                variant="h4"
                                className="pb-2 text-center"
                            >
                                Request My Records
                            </Heading>

                            <Text className="text-center">
                                Your request is processed within{' '}
                                {hospitals[hospital].processingTime ||
                                    '5-7 business days'}
                                , and your records will be available for
                                download once complete.
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
                </Box>

                <Box>
                    <Heading as="h3" variant="h3" className="mb-4 text-center">
                        Frequently Asked Questions
                    </Heading>
                    <Box className="mx-auto mb-12 border border-gray-light">
                        <Flex className="w-full border-b border-gray-light">
                            <Flex className="w-1/2 items-center px-4 py-3 bg-gray-lightest">
                                <Text className="w-full font-bold text-sm text-center">
                                    How long can it take to process my request?
                                </Text>
                            </Flex>
                            <Flex className="w-1/2 items-center px-4 py-3">
                                <Text className="w-full text-sm text-center">
                                    {hospitals[hospital].processingTime ||
                                        '5-7 business days'}
                                </Text>
                            </Flex>
                        </Flex>

                        <Flex className="w-full border-b border-gray-light">
                            <Flex className="w-1/2 items-center px-4 py-3 bg-gray-lightest">
                                <Text className="w-full font-bold text-sm text-center">
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
                                <Text className="w-full font-bold text-sm text-center">
                                    Will I be told when my request is ready?
                                </Text>
                            </Flex>
                            <Flex className="w-1/2 items-center px-4 py-3">
                                <Text className="w-full text-sm text-center">
                                    Yes, by text message (see sample texts
                                    below) or email
                                </Text>
                            </Flex>
                        </Flex>

                        <Flex className="w-full border-b border-gray-light">
                            <Flex className="w-1/2 items-center px-4 py-3 bg-gray-lightest">
                                <Text className="w-full font-bold text-sm text-center">
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
                                <Text className="w-full font-bold text-sm text-center">
                                    Can I print, email, save, and/or fax my
                                    records?
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
                                <Text className="w-full font-bold text-sm text-center">
                                    How are my records made available?
                                </Text>
                            </Flex>
                            <Flex className="w-1/2 items-center px-4 py-3">
                                <Text className="w-full text-sm text-center">
                                    You will be asked for your desired method of
                                    delivery when completing the request form.
                                </Text>
                            </Flex>
                        </Flex>

                        <Flex className="w-full">
                            <Flex className="w-1/2 items-center px-4 py-3 bg-gray-lightest">
                                <Text className="w-full font-bold text-sm text-center">
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
                <Box className="w-full py-8 mb-12">
                    <Box className="mb-6 text-center">
                        <Heading as="h3" variant="h4" className="pb-2">
                            Sample Texts
                        </Heading>
                        <Text className="pb-4">
                            You will receive text messages similar to these
                            samples:
                        </Text>
                    </Box>

                    <Flex className="flex-col md:flex-row items-center">
                        <Flex className="md:w-1/2 flex-col justify-center p-8 md:mx-4 mb-8 md:mb-0 border border-gray-light">
                            <Text className="pb-4">
                                When your request is accepted:
                            </Text>
                            <Box className="w-full max-w-lg rounded-8 bg-gray-lightest py-6 px-8">
                                <Text className="w-full text-sm">
                                    Your Medical Records request is in process.
                                    When complete, you will get Acct # and PIN #
                                    for online access.
                                </Text>
                                <Text className="w-full text-sm">
                                    ({hospitals[hospital].name})
                                </Text>
                            </Box>
                        </Flex>

                        <Flex className="md:w-1/2 flex-col justify-center p-8 md:mx-4 border border-gray-light">
                            <Text className="pb-4">
                                When your request is ready:
                            </Text>
                            <Box className="w-full max-w-lg rounded-8 bg-gray-lightest py-6 px-8">
                                <Text className="w-full text-sm">
                                    Your Medical Records are ready! Go to
                                    https://myroiplus.com
                                </Text>
                                <Text className="text-sm">
                                    Account #: xxxxxx PIN #: xxxx
                                </Text>
                                <Text className="text-sm">
                                    ({hospitals[hospital].name})
                                </Text>
                            </Box>
                        </Flex>
                    </Flex>
                </Box>
            </Container>
        </Layout>
    )
}

export default Hospital
