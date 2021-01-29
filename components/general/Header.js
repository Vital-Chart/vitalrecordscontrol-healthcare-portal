import { Box, Flex, Link } from '@/components/core'
import { Container } from '@/components/general'

export const Header = () => (
    <Box as="header" className="py-6 bg-black">
        <Flex as={Container}>
            <Box className="flex-grow">
                <Link href="/" className="text-white font-bold">
                    VRC Healthcare Portal
                </Link>
            </Box>
        </Flex>
    </Box>
)

Header.defaultProps = {}

export default Header
