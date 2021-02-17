import { Box, Link, Text, Button } from '@/components/core'
import { PageHeading, ButtonWrapper } from '@/components/atoms'
import { Layout, Container } from '@/components/general'
import { PIH as hospital } from '@/lib/hospitals'

const Contact = () => (
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
            </Box>
        </Container>
    </Layout>
)

export default Contact
