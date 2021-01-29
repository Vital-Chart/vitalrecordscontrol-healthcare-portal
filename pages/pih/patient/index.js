import { withStore } from '@/lib/store'
import { Heading, Link } from '@/components/core'
import { Layout } from '@/components/general'

const PIHPatient = ({ store }) => (
    <Layout>
        <Heading>PIH - Patient - Instructions</Heading>
        <Link href="/pih/patient/request">PIH - Patient - Request Form</Link>
    </Layout>
)

export default withStore(PIHPatient)
