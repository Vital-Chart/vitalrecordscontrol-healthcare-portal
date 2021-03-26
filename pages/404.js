import useNavigation from '@/lib/useNavigation'
import { Layout, Container } from '@/components/general'
import { Box, Text, Button } from '@/components/core'
import { PageHeading } from '@/components/atoms'

const Custom404 = () => {
    const { goBack } = useNavigation()

    return (
        <Layout>
            <Container>
                <Box className="w-full max-w-screen-md mx-auto pt-16 space-y-8 text-center">
                    <PageHeading className="pt-4">Page Not Found</PageHeading>

                    <Text className="pb-4 leading-relaxed">
                        The page you requested was not found. Please return the
                        landing page to make another selection.
                    </Text>

                    <Button
                        onClick={goBack}
                        variant="filled"
                        className="inline-block"
                    >
                        Go Back
                    </Button>
                </Box>
            </Container>
        </Layout>
    )
}

export default Custom404
