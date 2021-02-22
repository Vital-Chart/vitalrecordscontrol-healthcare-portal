import { useRouter } from 'next/router'
import { Box, Text, Button } from '@/components/core'
import { PageHeading } from '@/components/atoms'
import { Layout, Container } from '@/components/general'
import hospital from '@/lib/hospitals'

const Contact = () => {
    const router = useRouter()

    return (
        <Layout>
            <Container>
                <Box className="max-w-screen-md space-y-8 pb-12">
                    <PageHeading>
                        Contact Information for {hospital.pih.name}
                    </PageHeading>

                    {hospital.pih.facilities.map(facility => (
                        <Box>
                            <Text className="font-bold">{facility.name}</Text>
                            <Text>{facility.address1}</Text>
                            <Text>{facility.address2}</Text>
                            {/* TODO: Make tel link */}
                            {/* Split by `x` */}
                            {/* `.replace(/\D/g, '')` the first item to get numbers only */}
                            {/* Use `,` to add extension */}
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
