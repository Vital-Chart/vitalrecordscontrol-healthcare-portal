import { ButtonWrapper, PageHeading } from '@/components/atoms'
import { Box, Button, Heading, Link, Text } from '@/components/core'
import { Container, Layout } from '@/components/general'
import { withStore } from '@/lib/store'

const PIHSendTo = ({ store }) => (
    <Layout>
        <Container>
            <Box className="max-w-screen-md space-y-8">
                <PageHeading>Information for Submitting Requests</PageHeading>
                <Box>
                    <Text className="pb-4 leading-relaxed">
                        This website allows you to submit requests for copies of
                        a patient's medical records to be sent to yourself or to
                        someone else. Please read the important notes below
                        before continuing to use this system:
                    </Text>
                    <Box as="ol" className="pl-8 pb-2 list-decimal">
                        <Box as="li" className="pb-2">
                            This website is designed for{' '}
                            <Text as="span" className="font-bold">
                                patients
                            </Text>{' '}
                            or{' '}
                            <Text as="span" className="font-bold">
                                parties with the power to make decisions on
                                behalf of a patient (e.g. parents, guardians,
                                personal representatives)
                            </Text>{' '}
                            to request records. Third parties should{' '}
                            <Link href="/pih" className="text-blue underline">
                                click here
                            </Link>{' '}
                            to view other options for requesting medical
                            records.
                        </Box>
                        <Box as="li" className="pb-2">
                            In order to protect the patient's privacy and comply
                            with federal and state regulations, we need a copy
                            of your driver's license or other government-issued
                            ID as well as proof you are authorized to make
                            medical decisions for the patient (if you are not
                            the patient) before we can release records.{' '}
                            <Text as="span" className="font-bold">
                                Failure to upload all required documents through
                                this system within 72 hours after beginning the
                                process will result in your request being
                                canceled.
                            </Text>
                        </Box>
                        <Box as="ul" className="pl-8 pb-2 list-disc">
                            <Box as="li" className="pb-2">
                                If you are on a mobile device (e.g.
                                smartphone/tablet), you will need to
                                electronically sign an authorization form and
                                submit a picture of yourself holding your
                                government-issued ID.
                            </Box>
                            <Box as="li" className="pb-2">
                                If you are on a non-mobile device (e.g.
                                desktop/laptop computer) you will need to print,
                                manually sign, and upload a scanned copy of an
                                authorization form as well as your
                                government-issued ID.
                            </Box>
                        </Box>
                        <Box as="li" className="pb-2">
                            If you are not the patient, you will also need to
                            submit a legible image (picture or scanned) of proof
                            you are authorized to make medical decisions for the
                            patient. Click here for examples.
                        </Box>

                        <Box as="li" className="pb-2">
                            Information requested through this system must
                            exactly match hospital records. Typographic errors,
                            such as patient name misspelling or incorrect dates
                            of service, may result in your request being
                            canceled or delayed.
                        </Box>
                        <Box as="li" className="pb-2 font-bold">
                            There may be a clerical/reproduction processing fee
                            charged. Items not able to be delivered
                            electronically (e.g. Radiology Imaging CDs or
                            Pathology Slides) may incur additional charges,
                            which will be displayed if selected.
                        </Box>
                        <Box as="li" className="pb-2">
                            If you request records from multiple facilities, you
                            will get ONE tracking number for each facility, as
                            each facility processes records separately.{' '}
                            <Text as="span" className="font-bold">
                                You will receive separate notifications and
                                records from each facility.
                            </Text>
                        </Box>
                    </Box>
                    <Text>
                        If you are unable to complete the above, please refer to{' '}
                        <Link href="/pih" className="text-blue underline">
                            this page
                        </Link>{' '}
                        to review other options for submitting your request.
                    </Text>
                </Box>
                <ButtonWrapper>
                    <Button
                        as={Link}
                        href="/pih/"
                        variant="outline"
                        className="flex-grow text-center"
                    >
                        Back
                    </Button>
                    <Button
                        as={Link}
                        href="/pih/sendto/form"
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

export default withStore(PIHSendTo)
