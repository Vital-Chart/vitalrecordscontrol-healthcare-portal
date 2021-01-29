import { withStore } from '@/lib/store'
import { Heading } from '@/components/core'
import { Layout } from '@/components/general'

const PIHThirdPartyRequest = ({ store }) => (
    <Layout>
        <Heading>PIH - Third Party - Request Form</Heading>
    </Layout>
)

export default withStore(PIHThirdPartyRequest)
