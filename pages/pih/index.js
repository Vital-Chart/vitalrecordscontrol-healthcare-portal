import { withStore } from '@/lib/store'
import { Box, Link, Text, Button, Flex } from '@/components/core'
import { PageHeading, ButtonWrapper } from '@/components/atoms'
import { Layout, Container } from '@/components/general'

const PIH = ({ store }) => (
    <Layout>
        <Container>
            <PageHeading>Order Your Medical Records Online</PageHeading>
            <Flex className="flex-col">
                <Link href="/pih/patient">PIH - Patient - Instructions</Link>
                <Link href="/pih/patient/request">
                    PIH - Patient - Request Form
                </Link>
                <Link href="/pih/thirdparty">
                    PIH - Third Party - Instructions
                </Link>
                <Link href="/pih/thirdparty/request">
                    PIH - Third Party - Request Form
                </Link>
            </Flex>
        </Container>
    </Layout>
)

export default withStore(PIH)
