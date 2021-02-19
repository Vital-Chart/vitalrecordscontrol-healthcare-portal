import { withStore } from '@/lib/store'
import { Link, Flex } from '@/components/core'
import { Layout, Container } from '@/components/general'

const Home = ({ store }) => (
    <Layout>
        <Flex as={Container} className="flex-col space-y-8">
            <Link href="/pih">PIH - Landing Page</Link>
            <Flex className="flex-col">
                <Link href="/pih/patient">PIH - Patient - Instructions</Link>
                <Link href="/pih/patient/form">
                    PIH - Patient - Request Form
                </Link>
                <Link href="/pih/patient/upload">
                    PIH - Patient - Upload Authorization
                </Link>
                <Link href="/pih/patient/review">
                    PIH - Patient - Review & Submit
                </Link>
            </Flex>
            <Flex className="flex-col">
                <Link href="/pih/sendto">PIH - Send To - Instructions</Link>
                <Link href="/pih/sendto/form">
                    PIH - Send To - Request Form
                </Link>
                <Link href="/pih/sendto/upload">
                    PIH - Patient - Upload Authorization
                </Link>
                <Link href="/pih/sendto/review">
                    PIH - Patient - Review & Submit
                </Link>
            </Flex>
        </Flex>
    </Layout>
)

export default withStore(Home)
