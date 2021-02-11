import { ButtonWrapper, PageHeading } from '@/components/atoms'
import { Box, Button, Heading, Link, Text } from '@/components/core'
import { Container, Layout } from '@/components/general'
import { withStore } from '@/lib/store'

const PIHThirdParty = ({ store }) => (
    <Layout>
        <Container>
            <PageHeading>Information for Submitting Requests</PageHeading>
            <Box className="pt-8">
                <Text as="p" className="pb-4 max-w-screen-md leading-relaxed">
                    <span className="font-bold">ALERT:</span> This system lets
                    you as a patient request that medical records be accessed
                    online by a designated Healthcare Provider.{' '}
                    <span className="font-bold">
                        You will not be able to access these records yourself.
                        Only the Healthcare Provider will be able to access
                        them.
                    </span>
                </Text>
                <Text as="p" className="pb-4 max-w-screen-md leading-relaxed">
                    <span className="font-bold">
                        Please understand that we cannot control when or if the
                        designated Healthcare Provider will access your records
                        on our secure website.
                    </span>{' '}
                    You may experience significant delays or other issues if you
                    depend on a Healthcare Provider to access your records on
                    your behalf. You are solely responsible for verifying that
                    the Healthcare Provider will go online to access your
                    records and for making the Healthcare Provider aware that
                    they should watch for a faxed notification indicating that
                    your records are ready. You are also responsible for any and
                    all follow-up with the Healthcare Provider.
                </Text>
                <Text as="p" className="pb-4 max-w-screen-md leading-relaxed">
                    We strongly recommend, if possible, that you{' '}
                    <span className="font-bold">
                        <Link href="#" className="text-primary-dark">
                            click here
                        </Link>{' '}
                        to use Option 1 instead (the 48-hour Quick Release short
                        form)
                    </span>
                    to order and access the records for yourself. After you save
                    your records, you may arrange to share them however and
                    whenever you wish.
                </Text>

                <Heading as="h3" variant="h3" className="pb-4">
                    Who Can Order Patient Records?
                </Heading>
                <Box as="ul" className="pl-8 pb-2 list-disc max-w-screen-md">
                    <Box as="li" className="pb-2">
                        Patients 18 years of age or older{' '}
                        <span className="font-bold">
                            (NOTE: A parent may not request records on behalf of
                            an adult child, regardless of insurance coverage,
                            residence, etc.).
                        </span>
                    </Box>
                    <Box as="li" className="pb-2">
                        Parents/guardians who have the legal authority to access
                        a minor child’s records.{' '}
                    </Box>
                    <Box as="li" className="pb-2">
                        A person who has the legal authority (healthcare
                        trustee/conservator, healthcare proxy,
                        medical/healthcare power of attorney) to make healthcare
                        decisions for a patient of any age.{' '}
                    </Box>
                    <Box as="li" className="pb-2">
                        Only patients or those described above may place an
                        order here.
                        <span className="font-bold">
                            Third parties such as attorneys, insurance
                            companies, record retrieval services, and Healthcare
                            Providers may NOT use this ordering site. Such
                            requests will not be honored, and no refunds will be
                            made.
                        </span>
                    </Box>
                </Box>

                <Heading as="h3" variant="h3" className="pb-4">
                    What You Need to Get Started
                </Heading>
                <Box as="ol" className="pl-8 list-decimal max-w-screen-md">
                    <Box as="li" className="pb-2">
                        The name, address, and fax number of the Healthcare
                        Provider to whom you are directing your records.{' '}
                    </Box>
                    <Box as="li" className="pb-2">
                        A valid driver's license or other valid federal or state
                        ID.
                    </Box>
                    <Box as="li" className="pb-2">
                        A credit card to make payment.
                    </Box>
                    <Box as="li" className="pb-2">
                        If you have the legal authority to make{' '}
                        <span className="font-bold">healthcare</span> decisions
                        for a patient as a healthcare trustee/conservator,
                        healthcare proxy, or medical/healthcare power of
                        attorney, you must upload three items:{' '}
                        <span className="font-bold">
                            (a) the patient's driver's license/ID, (b) YOUR OWN
                            Driver's License/ID, AND (c) official documentation
                            of your authority to make healthcare decisions for
                            the patient.
                        </span>{' '}
                        NOTE: A financial power of attorney is{' '}
                        <span className="font-bold">not</span> acceptable. If
                        you cannot provide ALL required items, the patient must
                        place his or her own request.
                    </Box>
                </Box>
                <Text as="p" className="pb-4 max-w-screen-md leading-relaxed">
                    Please have these items handy before you start!
                </Text>

                <Heading as="h3" variant="h3" className="pb-4">
                    Important - Please Read!
                </Heading>
                <Box as="ul" className="pl-8 pb-2 list-disc max-w-screen-md">
                    <Box as="li" className="pb-2">
                        <span className="font-bold">
                            To ensure patient security, we do not fax or mail
                            paper records.
                        </span>{' '}
                        We use the Healthcare Provider's fax number only to send
                        a notification to the Healthcare Provider to go online
                        to access the requested records securely.
                    </Box>
                    <Box as="li" className="pb-2">
                        If you are requesting imaging (X-Rays, MRIs), the images
                        will be copied to a CD and mailed to the Healthcare
                        Provider at the address you have provided.
                    </Box>
                    <Box as="li" className="pb-2">
                        You will be required to pay{' '}
                        <span className="font-bold">
                            $25.00 for the processing of your request plus $8.00
                            for each CD copy of imaging (X-Ray, MRI) that is
                            mailed to the Healthcare Provider.
                        </span>
                    </Box>
                    <Box as="li" className="pb-2 font-bold">
                        THERE ARE NO REFUNDS FOR ANY REASON WHATSOEVER.
                    </Box>
                </Box>
                <Box className="py-8 px-12 bg-red-light">
                    <Text as="p" className="text-sm">
                        NOTE: Only patients or those described above may place
                        an order here. Third parties such as attorneys,
                        insurance companies, record retrieval services, and
                        Healthcare Providers may NOT use this ordering site.
                        Such requests will not be honored, and no refunds will
                        be made.
                    </Text>
                </Box>
            </Box>
            <ButtonWrapper>
                <Button
                    as={Link}
                    href="/pih/patient/request"
                    variant="filled"
                    className="flex-grow mx-4 text-center"
                >
                    Continue
                </Button>
            </ButtonWrapper>
        </Container>
    </Layout>
)

export default withStore(PIHThirdParty)
