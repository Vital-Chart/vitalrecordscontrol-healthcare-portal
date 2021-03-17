import useNavigation from '@/lib/useNavigation'
import { Box, Link, Text, Button } from '@/components/core'
import { PageHeading, ButtonWrapper } from '@/components/atoms'
import { Layout, Container } from '@/components/general'

const Instructions = () => {
    const { getLandingPage, getStepPage } = useNavigation()

    return (
        <Layout>
            <Container>
                <Box className="max-w-screen-md space-y-8">
                    <PageHeading className="pt-4">
                        Instructions for Medical Records Request
                    </PageHeading>

                    <Box>
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
                                . Some materials, such as Radiology Imaging CDs
                                or Pathology Slides, require being sent via the
                                U.S. Postal service or require pick-up.
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
                                You may be charged a processing fee of 25 cents
                                per page (if copied from paper records) or $25
                                (if created from electronic records) before
                                delivery of your records.{' '}
                                <Text as="span" className="font-bold">
                                    By submitting your request through this
                                    system, you agree to pay any processing fees
                                    up to and including $50 without prior
                                    notification.
                                </Text>{' '}
                                If your request will incur fees in excess of
                                $50, you will be notified in advance and have
                                the option to cancel your request.{' '}
                                <Text as="span" className="font-bold">
                                    You must pay this fee by credit card in
                                    order to use this system.
                                </Text>
                            </Box>
                            <Box as="li">
                                Copies of diagnostic imaging cannot be requested
                                through this system. If you require copies of
                                diagnostic imaging, contact the radiology
                                department at{' '}
                                <Link href="tel:4153531640">415-353-1640</Link>.
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

                    <ButtonWrapper className="pb-8">
                        <Button
                            as={Link}
                            href={getLandingPage()}
                            variant="outline"
                            className="flex-grow m-2 text-center"
                        >
                            Back
                        </Button>

                        <Button
                            as={Link}
                            href={getStepPage('form')}
                            variant="filled"
                            className="flex-grow m-2 text-center"
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
