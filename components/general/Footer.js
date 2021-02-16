import { Box, Flex, Text, Link, Image } from '@/components/core'
import { Container } from '@/components/general'

export const Footer = () => (
    <Box as="footer" className="py-8 bg-black">
        <Container>
            <Box className="w-40 mx-auto sm:mx-0 mb-6">
                <Link href="https://vitalrecordscontrol.com/">
                    <Image src="/images/vrc-logo.png" />
                </Link>
            </Box>
            <Text className="text-sm text-center sm:text-left text-white">
                &copy;{new Date().getFullYear()} Vital Records Control. All
                Rights Reserved. .
            </Text>
            <Link
                href="https://vitalrecordscontrol.com/privacy-policy/"
                className="block py-2 underline text-sm text-center sm:text-left text-white"
            >
                Website Privacy Policy
            </Link>
        </Container>
    </Box>
)

Footer.defaultProps = {}

export default Footer
