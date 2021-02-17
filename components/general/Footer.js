import { Box, Flex, Text, Link, Image } from '@/components/core'
import { Container } from '@/components/general'

export const Footer = () => (
    <Box as="footer" className="py-6 bg-black">
        <Flex
            as={Container}
            className="flex-col md:flex-row md:justify-between items-center"
        >
            <Box className="w-40 mb-6 md:mb-0">
                <Link href="https://vitalrecordscontrol.com/">
                    <Image src="/images/vrc-logo.png" />
                </Link>
            </Box>
            <Box>
                <Text className="pb-2 text-sm text-center md:text-right text-white">
                    &copy;{new Date().getFullYear()} Vital Records Control. All
                    Rights Reserved.
                </Text>
                <Link
                    href="https://vitalrecordscontrol.com/privacy-policy/"
                    className="block underline text-sm text-center md:text-right text-white"
                >
                    Website Privacy Policy
                </Link>
            </Box>
        </Flex>
    </Box>
)

Footer.defaultProps = {}

export default Footer
