import cx from 'classnames'
import { useStore } from '@/lib/store'
import hospitals from '@/lib/hospitals'
import { Layout, Container } from '@/components/general'
import { Box, Text, Flex, Button, Link } from '@/components/core'
import { PageHeading } from '@/components/atoms'

const FacilityList = () => {
    const store = useStore()

    return (
        <>
            {store?.state?.success?.facilities &&
                store.state.success.facilities.map(facilityId => {
                    return hospitals[
                        store.state.success.hospital
                    ].facilities.map(hospitalFacility => {
                        if (hospitalFacility.id === facilityId) {
                            return (
                                <Text key={facilityId} className="pb-4">
                                    <Text as="span" className="font-bold">
                                        {hospitalFacility.name}
                                    </Text>{' '}
                                    - {hospitalFacility.phone}
                                </Text>
                            )
                        }
                    })
                })}
        </>
    )
}

export const Success = () => {
    const store = useStore()

    if (typeof window === 'undefined' || !store?.state?.success) {
        return null
    }

    // Return 404 if no success data
    // if (!store?.state?.success) return <Error status="404" />

    return (
        <Layout>
            <Container>
                <Box className="max-w-screen-md space-y-8 pb-8">
                    <PageHeading>
                        Request for{' '}
                        {hospitals[store.state.success.hospital].name}
                    </PageHeading>

                    <Box className="pb-8 border-b border-gray-light">
                        <Text className="pb-4">
                            Thanks your. Youre request(s) for medical records
                            have been submitted and are being processed. Typical
                            processing time is 5 business days. Please wait at
                            least 48 hours before checking the status of your
                            request.
                        </Text>

                        <Text className="pb-4">
                            Reference Tracking number(s):{' '}
                            <Text as="span" className="font-bold">
                                {store.state.success.trackingNumbers.join(', ')}
                            </Text>
                        </Text>

                        <Text className="pb-4">
                            Please contact the following facility/facilities if
                            you have any questions:
                        </Text>

                        <FacilityList />
                    </Box>
                </Box>
            </Container>
        </Layout>
    )
}

export default Success
