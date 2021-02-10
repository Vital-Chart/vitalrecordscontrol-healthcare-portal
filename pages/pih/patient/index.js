import { withStore } from '@/lib/store'
import { Box, Link, Text, Button } from '@/components/core'
import { PageHeading, ButtonWrapper } from '@/components/atoms'
import { Layout, Container } from '@/components/general'

const PIHPatient = ({ store }) => (
    <Layout>
        <Container>
            <PageHeading>Information for Submitting Requests</PageHeading>
            <Box className="pt-8">
                <Text as="p" className="pb-4">
                    This website allows you to request copies of your medical
                    record and to retrieve it electronically. Please read the
                    important notes below before continuing to use this system:
                </Text>
                <Box as="ol" className="pl-8 pb-4 list-decimal">
                    <Box as="li">
                        This option is designed for patients only to request
                        records to be delivered electronically through the web.
                        Anyone else, including parents/guardians or other third
                        parties, should click here to view other options for
                        submitting requests. Some materials, such as Radiology
                        Imaging CDs or Pathology Slides, will be sent via the
                        U.S. Postal service or will require pick-up.
                    </Box>
                    <Box as="li">
                        In order to protect your privacy and comply with federal
                        and state regulations, we need a copy of your driver's
                        license or other government-issued ID before we can
                        release your records. Failure to upload all required
                        documents through this system within 72 hours after
                        beginning the process will result in your request being
                        canceled.
                    </Box>
                    <Box as="ul" className="pl-8 pb-4 list-disc">
                        <Box as="li">
                            If you are on a mobile device (e.g.
                            smartphone/tablet), you will need to electronically
                            sign an authorization form and submit a picture of
                            yourself holding your government-issued ID.
                        </Box>
                        <Box as="li">
                            If you are on a non-mobile device (e.g.
                            desktop/laptop computer) you will need to print,
                            manually sign, and upload a scanned copy of an
                            authorization form as well as your government-issued
                            ID.
                        </Box>
                    </Box>
                    <Box as="li">
                        Information requested through this system must exactly
                        match hospital records. Typographic errors, such as
                        patient name misspelling or incorrect dates of service,
                        may result in your request being canceled or delayed.
                    </Box>
                    <Box as="li">
                        There may be a clerical/reproduction processing fee
                        charged. Items not able to be delivered electronically
                        (e.g. Radiology Imaging CDs or Pathology Slides) may
                        incur additional charges, which will be displayed if
                        selected.
                    </Box>
                    <Box as="li">
                        If you request records from multiple facilities, you
                        will get ONE tracking number for each facility, as each
                        facility processes records separately. You will receive
                        separate notifications and records from each facility.
                    </Box>
                </Box>
                <Text as="p" className="pb-4">
                    If you are unable to complete the above, please refer to
                    this page to review other options for submitting your
                    request.
                </Text>
            </Box>
            <ButtonWrapper>
                <Button variant="outline" className="flex-grow mx-4">
                    Back
                </Button>
                <Button
                    href="/pih/patient/request"
                    variant="filled"
                    className="flex-grow mx-4"
                >
                    Continue
                </Button>
            </ButtonWrapper>
        </Container>
    </Layout>
)

export default withStore(PIHPatient)
