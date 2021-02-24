import { Layout, Container } from '@/components/general'
import { Box, Text, Button, Link } from '@/components/core'
import { PageHeading } from '@/components/atoms'

const Custom404 = () => (
    <Layout>
        <Container>
            <Box className="max-w-screen-md mx-auto space-y-8 text-center">
                <PageHeading className="pt-4">Page Not Found</PageHeading>

                <Text className="pb-4 leading-relaxed">
                    The page you requested was not found. Please return the
                    landing page to make another selection.
                </Text>

                <Button
                    as={Link}
                    href="/pih"
                    variant="filled"
                    className="inline-block"
                >
                    Return to the Landing Page
                </Button>
            </Box>
        </Container>
    </Layout>
)

export default Custom404
