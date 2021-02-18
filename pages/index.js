import { withStore } from '@/lib/store'
import { Link, Flex } from '@/components/core'
import { Layout, Container } from '@/components/general'

const Home = ({ store }) => (
    <Layout>
        <Flex as={Container} className="flex-col">
            <Link href="/pih">PIH - Landing Page</Link>
            <Link href="/pih/patient">PIH - Patient - Instructions</Link>
            <Link href="/pih/patient/request">
                PIH - Patient - Request Form
            </Link>
            <Link href="/pih/sendto">PIH - Third Party - Instructions</Link>
            <Link href="/pih/sendto/form">
                PIH - Third Party - Request Form
            </Link>
        </Flex>
    </Layout>
)

export default withStore(Home)
