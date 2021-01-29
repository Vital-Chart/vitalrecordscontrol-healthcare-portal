import { withStore } from '@/lib/store'
import { Heading, Link } from '@/components/core'
import { Layout } from '@/components/general'

const PIHThirdParty = ({ store }) => (
    <Layout>
        <Heading>PIH - Third Party - Instructions</Heading>
        <Link href="/pih/thirdparty/request">
            PIH - Third Party - Request Form
        </Link>
    </Layout>
)

export default withStore(PIHThirdParty)
