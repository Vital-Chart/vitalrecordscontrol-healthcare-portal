import useNavigation from '@/lib/useNavigation'
import hospitals from '@/lib/hospitals'
import { Layout, Container } from '@/components/general'
import { Box, Text, Button, Link } from '@/components/core'
import { PageHeading } from '@/components/atoms'

export const LayoutContact = () => {
    const { hospital: hospitalSlug, goBack } = useNavigation()
    const hospital = hospitals[hospitalSlug]

    return (
        <Layout>
            <Container>
                <Box className="max-w-screen-md space-y-8 pb-12">
                    <PageHeading className="pt-4">
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
                            <Box key={facility.id}>
                                <Text className="font-bold">
                                    {facility.name}
                                </Text>
                                <Text>{facility.address1}</Text>
                                {facility.address2 && (
                                    <Text>{facility.address2}</Text>
                                )}
                                {facility.address3 && (
                                    <Text>{facility.address3}</Text>
                                )}
                                {facility.address4 && (
                                    <Text>{facility.address4}</Text>
                                )}
                                <Link href={phoneLink}>{facility.phone}</Link>
                            </Box>
                        )
                    })}

                    <Button onClick={() => goBack()} variant="filled">
                        Go Back
                    </Button>
                </Box>
            </Container>
        </Layout>
    )
}

export default LayoutContact
