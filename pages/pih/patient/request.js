import { withStore } from '@/lib/store'
import { Heading } from '@/components/core'
import { Layout } from '@/components/general'

const PIHPatientRequest = ({ store }) => (
    <Layout>
        <Heading>PIH - Patient - Request Form</Heading>
    </Layout>
)

export default withStore(PIHPatientRequest)
