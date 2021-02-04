import { withStore } from '@/lib/store'
import { Layout, Container } from '@/components/general'
import {
    FormWrapper,
    FormSection,
    SectionHeading,
    PageHeading,
} from '@/components/atoms'
import {
    PatientInformation,
    FacilitySelector,
    RecordsSelector,
    RequestPurpose,
    ContactInformation,
    DeliveryInformation,
} from '@/components/sections'
import { Flex, Button } from '@/components/core'

const PIHThirdPartyRequest = ({ store }) => {
    const thirdParty = true
    return (
        <Layout>
            <Container>
                <PageHeading>New Medical Records Request</PageHeading>

                <FormWrapper
                    acceptCharset="UTF-8"
                    encType="multipart/form-data"
                >
                    <FormSection>
                        <SectionHeading>Facility / Facilities</SectionHeading>
                        <FacilitySelector />
                    </FormSection>

                    <FormSection>
                        <SectionHeading>Patient Information</SectionHeading>
                        <PatientInformation />
                    </FormSection>

                    <FormSection>
                        <RecordsSelector />
                    </FormSection>

                    <FormSection>
                        <SectionHeading>Purpose of Request</SectionHeading>
                        <RequestPurpose thirdParty={thirdParty} />
                    </FormSection>

                    <FormSection>
                        <SectionHeading>Your Information</SectionHeading>
                        <ContactInformation thirdParty={thirdParty} />
                    </FormSection>

                    <FormSection>
                        <SectionHeading>Delivery Information</SectionHeading>
                        <DeliveryInformation />
                    </FormSection>

                    <FormSection>
                        <Flex>
                            <Button
                                variant="outline"
                                className="flex-grow mx-4"
                            >
                                Cancel
                            </Button>
                            <Button variant="filled" className="flex-grow mx-4">
                                Continue
                            </Button>
                        </Flex>
                    </FormSection>
                </FormWrapper>
            </Container>
        </Layout>
    )
}

export default withStore(PIHThirdPartyRequest)
