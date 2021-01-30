import { withStore } from '@/lib/store'
import { Link } from '@/components/core'
import { Layout } from '@/components/general'

const Home = ({ store }) => (
    <Layout>
        <Link href="/pih">PIH - Landing Page</Link>
        <Link href="/pih/patient">PIH - Patient - Instructions</Link>
        <Link href="/pih/patient/request">PIH - Patient - Request Form</Link>
        <Link href="/pih/thirdparty">PIH - Third Party - Instructions</Link>
        <Link href="/pih/thirdparty/request">
            PIH - Third Party - Request Form
        </Link>
    </Layout>
)

export default withStore(Home)
