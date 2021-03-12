import useNavigation from '@/lib/useNavigation'
import { Box, Link, Text, Button, Flex, Heading } from '@/components/core'
import { Layout, Container } from '@/components/general'

const Hospital = () => {
    const { getLandingPage } = useNavigation()

    return (
        <Layout>
            <Flex className="py-32 sm:py-48 items-center bg-landing-bg bg-center bg-cover">
                <Container>
                    <Box className="max-w-xl text-center sm:text-left">
                        <Heading
                            as="h1"
                            variant="h1"
                            className="pt-4 pb-6 mb-6 text-white border-b-2 border-white"
                        >
                            Request Medical Records
                        </Heading>
                        <Text className="text-lg sm:text-xl text-white">
                            Through our online patient portal, VitalChart
                            Virtual ROI, patients can request medical records
                            for themselves or send them to a third-party.
                        </Text>
                        <Box className="mt-6 -ml-2">
                            <Button
                                as={Link}
                                href={getLandingPage()}
                                variant="filledSecondary"
                                className="flex-grow m-2 text-center"
                            >
                                Start New Request
                            </Button>

                            <Button
                                as={Link}
                                href={getLandingPage()}
                                variant="filledSecondary"
                                className="flex-grow m-2 text-center"
                            >
                                Track Request or Download Records
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Flex>
        </Layout>
    )
}

export default Hospital
