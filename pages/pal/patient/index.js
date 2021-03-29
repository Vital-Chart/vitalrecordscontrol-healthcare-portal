import useNavigation from '@/lib/useNavigation'
import { Box, Link, Text, Button } from '@/components/core'
import { PageHeading, ButtonWrapper } from '@/components/atoms'
import { Layout, Container } from '@/components/general'

const Instructions = () => {
    const { getLandingPage, getStepPage } = useNavigation()

    return (
        <Layout>
            <Container>
                <Box className="w-full max-w-screen-md space-y-8">
                    <PageHeading className="pt-4">
                        Instructions for Quick Release to You
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
                                This option is designed for{' '}
                                <Text as="span" className="font-bold">
                                    patients only
                                </Text>{' '}
                                to request records to be delivered{' '}
                                <Text as="span" className="font-bold">
                                    electronically through the web
                                </Text>
                                . Anyone else, including parents/guardians or
                                other third parties, should{' '}
                                <Link
                                    href={getLandingPage()}
                                    className="underline font-bold text-blue hover:text-black transition-colors"
                                >
                                    click here
                                </Link>{' '}
                                to view other options for submitting requests.
                                Some materials may be sent via the U.S. Postal
                                service or will require pick-up.
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
                            <Box as="li" className="pb-2 font-bold">
                                There may be a clerical/reproduction processing
                                fee charged. Items not able to be delivered
                                electronically may incur additional charges,
                                which will be displayed if selected.
                            </Box>
                            <Box as="li">
                                If you request records from multiple facilities,
                                <Text as="span" className="font-bold">
                                    you will get ONE tracking number for each
                                    facility
                                </Text>
                                , as each facility processes records separately.{' '}
                                <Text as="span" className="font-bold">
                                    You will receive separate notifications and
                                    records from each facility.
                                </Text>
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
