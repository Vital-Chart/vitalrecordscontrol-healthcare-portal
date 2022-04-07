import useNavigation from '@/lib/useNavigation'
import { Box, Link, Text, Button } from '@/components/core'
import { PageHeading, ButtonWrapper } from '@/components/atoms'
import { Layout, Container } from '@/components/general'

const Instructions = () => {
    const { getLandingPage, getStepPage } = useNavigation()

    return (
        <Layout>
            <Container>
                <Box className="w-full max-w-screen-md">
                    <PageHeading className="pt-4">
                        Instructions for Medical Records Request
                    </PageHeading>

                    <Box className="mt-8">
                        <Text className="pb-4">
                            This website allows you to request copies of your
                            medical record and to retrieve it electronically.
                            Please read the important notes below before
                            continuing to use this system:
                        </Text>

                        <Box
                            as="ol"
                            className="pl-8 pb-4 space-y-2 list-decimal"
                        >
                            <Box as="li">
                                <Text as="span" className="font-bold">
                                    This option is for patients or parties with
                                    the power to make decisions on behalf of a
                                    patient
                                </Text>{' '}
                                (e.g., parents, guardians) to request records to
                                be electronically delivered to{' '}
                                <Text as="span" className="font-bold">
                                    YOU
                                </Text>
                                .
                            </Box>
                            <Box as="li">
                                In order to protect your privacy and comply with
                                federal and state regulations, we need a copy of
                                your driver's license or other government-issued
                                ID before we can release your records.{' '}
                                <Text as="span" className="font-bold">
                                    Failure to upload all required documents
                                    through this system within 72 hours after
                                    beginning the process will result in your
                                    request being canceled.
                                </Text>
                            </Box>
                            <Box
                                as="ul"
                                className="pl-8 pb-2 space-y-2 list-disc"
                            >
                                <Box as="li">
                                    If you are on a mobile device (e.g.
                                    smartphone/tablet), you will need to
                                    electronically sign an authorization form
                                    and submit a picture of yourself holding
                                    your government-issued ID.
                                </Box>
                                <Box as="li">
                                    If you are on a non-mobile device (e.g.
                                    desktop/laptop computer) you will need to
                                    print, manually sign, and upload a scanned
                                    copy of an authorization form as well as
                                    your government-issued ID.
                                </Box>
                            </Box>
                            <Box as="li">
                                Information requested through this system must
                                exactly match hospital records. Typographic
                                errors, such as patient name misspelling or
                                incorrect dates of service, may result in your
                                request being canceled or delayed.
                            </Box>
                            <Box as="li" className="pb-2">
                                You may be charged a nominal fee for records transferred to a CD or our Patient Portal,
                                or if your record is produced from paper. These charges are due before
                                delivery of your records.{' '}
                                <Text as="span" className="font-bold">
                                    By submitting your request through this
                                    system, you agree to pay any processing
                                    fees.
                                </Text>
                            </Box>
                            <Box as="li">
                                Copies of diagnostic imaging cannot be requested
                                through this system. If you require copies of
                                diagnostic imaging, contact the radiology
                                department at{' '}
                                <Link href="tel:5104283410">510-428-3410</Link>.
                            </Box>
                        </Box>
                        <Text>
                            If you are unable to complete the above, please
                            refer to{' '}
                            <Link
                                href={getLandingPage()}
                                className="underline font-bold text-blue hover:text-black transition-colors"
                            >
                                this page
                            </Link>{' '}
                            to review other options for submitting your request.{' '}
                        </Text>
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
