import { useStore } from '@/lib/store'
import useNavigation from '@/lib/useNavigation'
import hospitals from '@/lib/hospitals'
import { Layout, Container } from '@/components/general'
import { Box, Text } from '@/components/core'
import { PageHeading } from '@/components/atoms'

const FacilityList = () => {
    const store = useStore()
    const { hospital } = useNavigation()

    const facilities =
        store?.state?.success?.facilities && store.state.success.facilities

    return (
        <>
            {facilities &&
                facilities.map(facilityId => {
                    const facility = hospitals[hospital].facilities.find(
                        x => x.id === facilityId
                    )
                    const trackingNumber = store.state.success.trackingNumbers.find(
                        number => number.FacilityID === facilityId
                    )

                    return (
                        <Text key={facilityId} className="pb-4">
                            <Text as="span" className="font-bold">
                                {trackingNumber.TrackingNumberID}:
                            </Text>{' '}
                            {facility.name} - {facility.phone}
                        </Text>
                    )
                })}
        </>
    )
}

export const Success = () => {
    const store = useStore()
    const { goTo } = useNavigation()

    if (typeof window === 'undefined') {
        return null
    }

    if (!store.state.success) {
        goTo('/')
        return null
    }

    return (
        <Layout>
            <Container>
                <Box className="max-w-screen-md space-y-8 pb-8 mx-auto">
                    <PageHeading className="pt-4 text-center">
                        Request for{' '}
                        {hospitals[store.state.success.hospital].name}
                    </PageHeading>

                    <Box className="pb-8 border-b border-gray-light">
                        <Text className="pb-4">
                            Thank you. Your request(s) for medical records has
                            been submitted and is being processed. Typical
                            processing time is 5 business days. Please wait at
                            least 48 hours before checking the status of your
                            request.
                        </Text>

                        <Text className="pb-4">
                            Reference Tracking number(s):{' '}
                            <Text as="span" className="font-bold">
                                {store.state.success.trackingNumbers
                                    .map(number => number.TrackingNumberID)
                                    .join(', ')}
                            </Text>
                        </Text>

                        <Text className="pb-4">
                            Please contact the following{' '}
                            {store.state.success.trackingNumbers.length === 1
                                ? 'facility'
                                : 'facilities'}{' '}
                            if you have any questions during this process:
                        </Text>

                        <FacilityList />
                    </Box>
                </Box>
            </Container>
        </Layout>
    )
}

export default Success
