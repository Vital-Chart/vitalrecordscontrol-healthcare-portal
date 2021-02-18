import { withStore } from '@/lib/store'
import { Layout, Container } from '@/components/general'
import { Box, Text, Button } from '@/components/core'
import {
    SectionHeading,
    PageHeading,
    ButtonWrapper,
    UploadsList,
    Stepper,
} from '@/components/atoms'

const PIHSendToReview = ({ store }) => {
    console.table(store.state.form)
    return (
        <Layout>
            <Stepper />
            <Container>
                <Box className="max-w-screen-md space-y-8 pb-8">
                    <PageHeading>Review & Submit</PageHeading>
                    <Text className="leading-relaxed">
                        Please review your submission below for accuracy. If
                        there are any errors, please click here to correct them.
                        (/patient/editrequest) Errors such as patient name
                        misspelling, incorrect date of birth, or incorrect dates
                        of service may result in your request being canceled. If
                        there are no errors and you have uploaded all required
                        documentation, you must click "Submit Request for
                        Processing" below to complete submission of your
                        request. Normal processing time is 7-14 days after
                        submission.
                    </Text>

                    <Box className="space-y-4">
                        <SectionHeading className="uppercase">
                            Request(s) Summary
                        </SectionHeading>
                        {/* <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Tracking Number(s):
                            </Text>{' '}
                            67-192171, 68-150595, 69-156512
                        </Text> */}
                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Patient Name:
                            </Text>{' '}
                            {`${store.state.form.PI_PFN} ${store.state.form.PI_PLN} `}
                        </Text>
                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Patient DOB:
                            </Text>{' '}
                            3/3/1977
                        </Text>
                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Dates of Service:{' '}
                            </Text>
                            Most recent visit
                        </Text>
                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Requested Information:{' '}
                            </Text>
                            Medical Records: PERTINENT; Itemized Billing;
                            Radiology Images; Pathology Slides
                        </Text>
                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Purpose of Request:{' '}
                            </Text>
                            test
                        </Text>
                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Limitations:{' '}
                            </Text>
                            None
                        </Text>
                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Phone:{' '}
                            </Text>
                            (858) 254-8585
                        </Text>
                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Email:{' '}
                            </Text>
                            dwhite@abtvault.com
                        </Text>
                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Delivery Method for Records:{' '}
                            </Text>
                        </Text>
                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Delivery Method for CDs/Slides:{' '}
                            </Text>
                            TRIMSNet e-Request Website Pick up CDs and/or slides
                            at the facility.
                        </Text>
                        <Button variant="outline" className="flex-grow">
                            Edit Request Information
                        </Button>
                    </Box>
                    <Box className="space-y-4">
                        <SectionHeading className="uppercase">
                            Uploaded Files
                        </SectionHeading>
                        <UploadsList />
                        <Button variant="outline" className="flex-grow">
                            Upload Additional Documentation
                        </Button>
                    </Box>
                    <ButtonWrapper>
                        <Button variant="outline" className="flex-grow">
                            Cancel and Delete Request
                        </Button>
                        <Button variant="filled" className="flex-grow">
                            Submit Request for Processing
                        </Button>
                    </ButtonWrapper>
                </Box>
            </Container>
        </Layout>
    )
}

export default withStore(PIHSendToReview)
