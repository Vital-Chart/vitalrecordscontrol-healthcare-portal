import useNavigation from '@/lib/useNavigation'
import hospitals from '@/lib/hospitals'
import { Layout, Container } from '@/components/general'
import { Box, Button } from '@/components/core'
import { PageHeading, FacilityAddress } from '@/components/atoms'

export const LayoutContact = () => {
    const { hospital: hospitalSlug, goBack } = useNavigation()
    const hospital = hospitals[hospitalSlug]

    return (
        <Layout>
            <Container>
                <Box className="w-full max-w-screen-md pb-12">
                    <PageHeading className="pt-4">
                        Contact Information for {hospital.name}
                    </PageHeading>

                    {hospital.facilities.map(facility => (
                        <FacilityAddress facility={facility} className="mt-6" />
                    ))}

                    <Button
                        onClick={() => goBack()}
                        variant="filled"
                        className="mt-8"
                    >
                        Go Back
                    </Button>
                </Box>
            </Container>
        </Layout>
    )
}

export default LayoutContact
