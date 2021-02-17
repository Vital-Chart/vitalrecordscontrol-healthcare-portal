import { Box, Flex, Link, Image } from '@/components/core'
import { Container } from '@/components/general'
import hospitals from '@/lib/hospitals'

export const Header = () => (
    <Box as="header" className="bg-black mb-20">
        <Flex as={Container} className="relative">
            <Box className="absolute top-0 left-6 sm:left-8 w-28 p-6 bg-white shadow">
                <Image src={hospitals.pih.logo} />
            </Box>
            <Flex className="flex-col ml-auto py-4 text-xs text-white text-right">
                <Link href="/">VitalChart® Virtual ROI Portal</Link>
                <Link href="/pih/contact" className="ml-4 underline">
                    Contact Us
                </Link>
            </Flex>
        </Flex>
    </Box>
)

Header.defaultProps = {}

export default Header
