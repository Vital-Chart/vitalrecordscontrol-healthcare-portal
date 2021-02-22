import { withStore } from '@/lib/store'
import { useRoute } from '@/lib/route'
import { Box, Link, Text, Button } from '@/components/core'
import { PageHeading, ButtonWrapper } from '@/components/atoms'
import { Layout, Container } from '@/components/general'

const PIHPatient = ({ store }) => {
    const { hospital, option } = useRoute()
    return (
        <Layout>
            <Container>
                <Box className="max-w-screen-md space-y-8">
                    <PageHeading>
                        Information for Submitting Requests
                    </PageHeading>
                    <Box>
                        <Text className="pb-4 leading-relaxed">
                            This website allows you to request copies of your
                            medical record and to retrieve it electronically.
                            Please read the important notes below before
                            continuing to use this system:
                        </Text>
                        <Box as="ol" className="pl-8 pb-2 list-decimal">
                            <Box as="li" className="pb-2">
                                <Text as="span" className="font-bold">
                                    This option is for patients or parties with
                                    the power to make decisions on behalf of a
                                    patient
                                </Text>{' '}
                                (e.g., parents, guardians, personal
                                representatives) to request records to be
                                electronically delivered to{' '}
                                <Text as="span" className="font-bold">
                                    YOU
                                </Text>
                                . Some materials, such as Radiology Imaging CDs
                                or Pathology Slides, require being sent via the
                                U.S. Postal service or require pick-up. **Note:
                                If you are a patient requesting records to be
                                delivered to a{' '}
                                <Text as="span" className="font-bold">
                                    THIRD-PARTY
                                </Text>{' '}
                                (e.g., healthcare provider, attorney, an
                                insurance company, or other),{' '}
                                {/* TODO: Update this link to use router */}
                                <Link
                                    href="/pih/sendto/"
                                    className="underline font-bold text-blue hover:text-black transition-colors"
                                >
                                    click here
                                </Link>{' '}
                                to fill out the correct form to submit your
                                request.**
                            </Box>
                            <Box as="li" className="pb-2">
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
                            <Box as="ul" className="pl-8 pb-2 list-disc">
                                <Box as="li" className="pb-2">
                                    If you are on a mobile device (e.g.
                                    smartphone/tablet), you will need to
                                    electronically sign an authorization form
                                    and submit a picture of yourself holding
                                    your government-issued ID.
                                </Box>
                                <Box as="li" className="pb-2">
                                    If you are on a non-mobile device (e.g.
                                    desktop/laptop computer) you will need to
                                    print, manually sign, and upload a scanned
                                    copy of an authorization form as well as
                                    your government-issued ID.
                                </Box>
                            </Box>
                            <Box as="li" className="pb-2">
                                Information requested through this system must
                                exactly match hospital records. Typographic
                                errors, such as patient name misspelling or
                                incorrect dates of service, may result in your
                                request being canceled or delayed.
                            </Box>
                            <Box as="li" className="pb-2 font-bold">
                                There may be a clerical/reproduction processing
                                fee charged. Items not able to be delivered
                                electronically (e.g. Radiology Imaging CDs or
                                Pathology Slides) may incur additional charges,
                                which will be displayed if selected.
                            </Box>
                            <Box as="li" className="pb-2">
                                If you request records from multiple facilities,
                                you will get ONE tracking number for each
                                facility, as each facility processes records
                                separately.{' '}
                            </Box>
                        </Box>
                    </Box>
                    <ButtonWrapper>
                        <Button
                            as={Link}
                            href={`/${hospital}`}
                            variant="outline"
                            className="flex-grow text-center"
                        >
                            Back
                        </Button>
                        <Button
                            as={Link}
                            href={`/${hospital}/${option}/form`}
                            variant="filled"
                            className="flex-grow text-center"
                        >
                            Continue
                        </Button>
                    </ButtonWrapper>
                </Box>
            </Container>
        </Layout>
    )
}

export default withStore(PIHPatient)
