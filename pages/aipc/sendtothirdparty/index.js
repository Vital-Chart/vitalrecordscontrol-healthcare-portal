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
                        Instructions for Quick Release to You
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
                                yourself. Only the third party will be able to
                                access them through a secure website. If you
                                prefer to access the records yourself and then
                                direct them to a third party in whatever way you
                                wish, please{' '}
                                <Link
                                    href={`${getLandingPage()}/patient`}
                                    className="underline font-bold text-blue hover:text-black transition-colors"
                                >
                                    click here
                                </Link>{' '}
                                to use the 48-hour Quick Release short form for
                                Associates in Psychiatry and Counseling.
                            </Text>
                        </Text>
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
                                The name, address, and fax number of the third
                                party to whom you are directing your records.
                            </Box>
                            <Box as="li">
                                The patient's valid driver's license or other
                                valid state-issued ID.
                            </Box>
                            <Box as="li">
                                If you have the legal authority to make{''}
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
                                </Text>
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

                        <Box as="ul" className="pl-8 space-y-2 list-disc">
                            <Box as="li">
                                <Text as="span" className="font-bold">
                                    To ensure patient security, we do not fax or
                                    mail paper records.
                                </Text>{' '}
                                We use the third party's fax number only to send
                                a{' '}
                                <Text as="span" className="italic">
                                    notification
                                </Text>{' '}
                                to the Healthcare Provider to go online to
                                access the requested records securely.
                            </Box>
                            <Box as="li">
                                <Text as="span" className="font-bold">
                                    We cannot control when or if the third party
                                    listed on your request will access your
                                    records on our secure website.
                                </Text>{' '}
                                You are solely responsible for any and all
                                follow-up with the third party.{' '}
                                <Text as="span" className="font-bold">
                                    If you would rather access your records
                                    yourself and direct them to a third party in
                                    whatever way you wish, please{' '}
                                    <Link
                                        href={`${getLandingPage()}/patient`}
                                        className="underline font-bold text-blue hover:text-black transition-colors"
                                    >
                                        click here
                                    </Link>{' '}
                                    to use the 48-hour Quick Release short form
                                    for Associates in Psychiatry and Counseling
                                    to have your records released directly to
                                    you.
                                </Text>
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
                                    $25.00 for the processing of your request.
                                </Text>
                            </Box>
                            <Box as="li" className="font-bold">
                                THERE ARE NO REFUNDS FOR ANY REASON WHATSOEVER.
                            </Box>
                        </Box>
                        <Info
                            className="mt-6"
                            secondaryText="Third parties are not eligible to use this form to request records from Associates in Psychiatry and Counseling. Only patients or parents/guardians
                            of patients are eligible to request records using this form."
                        />
                    </Box>

                    <ButtonWrapper className="my-8">
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
