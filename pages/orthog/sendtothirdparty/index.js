import useNavigation from '@/lib/useNavigation'
import { Box, Link, Text, Button, Heading } from '@/components/core'
import { PageHeading, ButtonWrapper, Info } from '@/components/atoms'
import { Layout, Container } from '@/components/general'

const Instructions = () => {
    const { getLandingPage, getStepPage } = useNavigation()

    return (
        <Layout>
            <Container>
                <Box className="w-full max-w-screen-md">
                    <PageHeading className="mt-4">
                        Instructions for Release to Third-Party
                    </PageHeading>

                    <Box className="mt-8">
                        <Text>
                            <Text as="span" className="font-bold">
                                ALERT:
                            </Text>{' '}
                            This system lets you as a patient request that
                            medical records be accessed online by a designated
                            Healthcare Provider.{' '}
                            <Text as="span" className="font-bold">
                                You will not be able to access these records
                                yourself. Only the Healthcare Provider will be
                                able to access them.
                            </Text>
                        </Text>

                        <Text className="mt-4">
                            <Text as="span" className="font-bold">
                                Please understand that we cannot control when or
                                if the designated Healthcare Provider will
                                access your records on our secure website.
                            </Text>{' '}
                            You may experience significant delays or other
                            issues if you depend on a Healthcare Provider to
                            access your records on your behalf. You are solely
                            responsible for verifying that the Healthcare
                            Provider will go online to access your records and
                            for making the Healthcare Provider aware that they
                            should watch for a faxed notification indicating
                            that your records are ready. You are also
                            responsible for any and all follow-up with the
                            Healthcare Provider.
                        </Text>

                        <Text className="mt-4">
                            We strongly recommend, if possible, that you{' '}
                            <Link
                                href={`${getLandingPage()}/patient`}
                                className="underline font-bold text-blue hover:text-black transition-colors"
                            >
                                click here
                            </Link>{' '}
                            <Text as="span" className="font-bold">
                                to use Option 1 instead (the 48-hour Quick
                                Release short form)
                            </Text>{' '}
                            to order and access the records for yourself. After
                            you save your records, you may arrange to share them
                            however and whenever you wish.
                        </Text>
                    </Box>

                    <Box className="mt-8">
                        <Heading as="h3" variant="h3" className="mb-2">
                            Who Can Order Patient Records?
                        </Heading>
                        <Box as="ul" className="pl-8 mb-6 space-y-2 list-disc">
                            <Box as="li">
                                Patients 18 years of age or older{' '}
                                <Text as="span" className="font-bold">
                                    (NOTE: A parent may not request records on
                                    behalf of an adult child, regardless of
                                    insurance coverage, residence, etc.).
                                </Text>
                            </Box>
                            <Box as="li">
                                Parents/guardians who have the legal authority
                                to access a minor child's records.
                            </Box>
                            <Box as="li">
                                A person who has the legal authority (healthcare
                                trustee/conservator, healthcare proxy,
                                medical/healthcare power of attorney) to make
                                healthcare decisions for a patient of any age.
                            </Box>
                            <Box as="li">
                                Only patients or those described above may place
                                an order here.{' '}
                                <Text as="span" className="font-bold">
                                    Third parties such as attorneys, insurance
                                    companies, record retrieval services, and
                                    Healthcare Providers may NOT use this
                                    ordering site. Such requests will hot be
                                    honored, and no refunds will be made.
                                </Text>
                            </Box>
                        </Box>
                    </Box>

                    <Box className="mt-8">
                        <Heading as="h3" variant="h3" className="mb-2">
                            What You Need to Get Started
                        </Heading>
                        <Box
                            as="ol"
                            className="pl-8 pb-2 space-y-2 list-decimal"
                        >
                            <Box as="li">
                                The name, address, and fax number of the
                                Healthcare Provider to whom you are directing
                                your records.
                            </Box>
                            <Box as="li">
                                The patient's valid driver's license or other
                                valid state-issued ID.
                            </Box>
                            <Box as="li">
                                If you have the legal authority to make{' '}
                                <Text as="span" className="font-bold">
                                    healthcare
                                </Text>{' '}
                                decisions for a patient as a healthcare
                                trustee/conservator, healthcare proxy, or
                                medical/healthcare power of attorney, you must
                                upload three items: (a){' '}
                                <Text as="span" className="font-bold">
                                    the patient's driver's license/ID,
                                </Text>{' '}
                                (b){' '}
                                <Text as="span" className="font-bold">
                                    YOUR OWN Driver's License/ID,
                                </Text>{' '}
                                AND (c){' '}
                                <Text as="span" className="font-bold">
                                    official documentation of your authority to
                                    make healthcare decisions for the patient.
                                </Text>{' '}
                                NOTE: A financial power of attorney is{' '}
                                <Text as="span" className="font-bold">
                                    not
                                </Text>{' '}
                                acceptable. If you cannot provide ALL required
                                items, the patient must place his or her own
                                request.
                            </Box>
                        </Box>
                        <Text className="italic">
                            Please have these items handy before you start!
                        </Text>
                    </Box>

                    <Box className="mt-8">
                        <Heading as="h3" variant="h3" className="mb-2">
                            Important - Please Read!
                        </Heading>

                        <Box as="ul" className="pl-8 mb-6 space-y-2 list-disc">
                            <Box as="li">
                                <Text as="span" className="font-bold">
                                    To ensure patient security, we do not fax or
                                    mail paper records.
                                </Text>{' '}
                                We use the Healthcare Provider's fax number only
                                to send a notification to the Healthcare
                                Provider to go online to access the requested
                                records securely.
                            </Box>
                            <Box as="li">
                                If you are requesting imaging (X-Rays, MRIs),
                                the images will be copied to a CD and mailed to
                                the Healthcare Provider at the address you have
                                provided.
                            </Box>
                            <Box as="li">
                                You will be required to pay{' '}
                                <Text as="span" className="font-bold">
                                    $25.00 for the processing of your request
                                    plus $8.00 for each CD copy of imaging
                                    (X-Ray, MRI) that is mailed to the
                                    Healthcare Provider.
                                </Text>
                            </Box>
                            <Box as="li" className="font-bold">
                                THERE ARE NO REFUNDS FOR ANY REASON WHATSOEVER.
                            </Box>
                        </Box>
                        <Info
                            secondaryText="NOTE: Only patients or those described above may place an order here. Third parties such as attorneys, insurance companies, record retrieval
services, and Healthcare Providers may NOT use this ordering site. Such requests will not be honored, and no refunds will be made."
                        />
                    </Box>

                    <ButtonWrapper className="mt-8 pb-8">
                        <Button
                            as={Link}
                            href={getLandingPage()}
                            variant="outline"
                            className="flex-1 m-2"
                        >
                            Back
                        </Button>

                        <Button
                            as={Link}
                            href={getStepPage('form')}
                            variant="filled"
                            className="flex-1 m-2"
                        >
                            Continue
                        </Button>
                    </ButtonWrapper>
                </Box>
            </Container>
        </Layout>
    )
}

export default Instructions
