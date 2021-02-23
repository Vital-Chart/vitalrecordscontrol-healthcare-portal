import { useRouter } from 'next/router'
import { Layout, Container } from '@/components/general'
import { Box, Text, Button, Link } from '@/components/core'
import { PageHeading } from '@/components/atoms'

export const LayoutContact = ({ hospital }) => {
    const router = useRouter()

    return (
        <Layout>
            <Container>
                <Box className="max-w-screen-md space-y-8 pb-12">
                    <PageHeading>
                        Contact Information for {hospital.name}
                    </PageHeading>

                    {hospital.facilities.map(facility => {
                        const phoneNum = facility.phone
                            .split('x')[0]
                            .replace(/\D/g, '')
                        const phoneExt = facility.phone.split('x')[1]
                        let phoneLink = `tel:${phoneNum}`

                        if (phoneExt) {
                            phoneLink += `,${phoneExt}`
                        }

                        return (
                            <Box>
                                <Text className="font-bold">
                                    {facility.name}
                                </Text>
                                <Text>{facility.address1}</Text>
                                <Text>{facility.address2}</Text>
                                <Link href={phoneLink}>{facility.phone}</Link>
                            </Box>
                        )
                    })}

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

export default LayoutContact
