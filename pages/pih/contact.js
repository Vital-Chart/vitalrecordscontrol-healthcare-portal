import { useRouter } from 'next/router'
import { Box, Text, Button } from '@/components/core'
import { PageHeading } from '@/components/atoms'
import { Layout, Container } from '@/components/general'
import { PIH as hospital } from '@/lib/hospitals'

const Contact = () => {
    const router = useRouter()
    return (
        <Layout>
            <Container>
                <Box className="max-w-screen-md space-y-8 pb-12">
                    <PageHeading>
                        Contact Information for {hospital.name}
                    </PageHeading>

                    {hospital.contact.map(facility => (
                        <Box>
                            <Text className="font-bold">
                                {facility.facilityName}
                            </Text>
                            <Text>{facility.address1}</Text>
                            <Text>{facility.address2}</Text>
                            <Text>{facility.phone}</Text>
                        </Box>
                    ))}
                    <Button
                        onClick={() => router.back()}
                        href="/pih/patient/form"
                        variant="filled"
                    >
                        Go Back
                    </Button>
                </Box>
            </Container>
        </Layout>
    )
}
export default Contact
