import { useStore } from '@/lib/store'
import useNavigation from '@/lib/useNavigation'
import hospitals from '@/lib/hospitals'
import { Box, Flex, Link, Image } from '@/components/core'
import { Container } from '@/components/general'

export const Header = () => {
    const { hospital, getLandingPage, getContactPage } = useNavigation()

    return (
        <Box as="header" className="bg-black mb-20">
            <Flex as={Container} className="relative">
                {hospitals[hospital] && (
                    <Link
                        href={getLandingPage()}
                        className="block absolute top-0 left-6 sm:left-8 p-6 bg-white shadow"
                    >
                        <Image
                            className="h-16 w-auto"
                            src={hospitals[hospital].logo}
                        />
                    </Link>
                )}

                <Flex className="flex-col ml-auto py-4 text-xs text-white text-right">
                    <Link href="/">VitalChart® Virtual ROI Portal</Link>

                    {hospital && (
                        <Link href={getContactPage()} className="underline">
                            Contact Us
                        </Link>
                    )}
                </Flex>
            </Flex>
        </Box>
    )
}

Header.defaultProps = {}

export default Header
