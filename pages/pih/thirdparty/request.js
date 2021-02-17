import { withStore } from '@/lib/store'
import { Layout, Container } from '@/components/general'
import { PageHeading } from '@/components/atoms'

const PIHThirdPartyRequest = ({ store }) => {
    return (
        <Layout>
            <Container>
                <PageHeading>New Medical Records Request</PageHeading>
            </Container>
        </Layout>
    )
}

export default withStore(PIHThirdPartyRequest)
