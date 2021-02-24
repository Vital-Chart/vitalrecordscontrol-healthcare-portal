import { useStore } from '@/lib/store'
import useNavigation from '@/lib/useNavigation'
import hospitals from '@/lib/hospitals'
import { Box, Flex, Link, Image } from '@/components/core'
import { Container } from '@/components/general'

export const Header = () => {
    const store = useStore()
    const {
        pathname,
        hospital,
        getLandingPage,
        getContactPage,
        isSuccessPage,
    } = useNavigation()

    const hospitalSlug =
        pathname === '/success' ? store?.state?.success?.hospital : hospital

    return (
        <Box as="header" className="bg-black mb-20">
            <Flex as={Container} className="relative">
                {hospitals[hospitalSlug] && (
                    <Link
                        href={getLandingPage()}
                        className="block absolute top-0 left-6 sm:left-8 w-28 p-6 bg-white shadow"
                    >
                        <Image src={hospitals[hospitalSlug].logo} />
                    </Link>
                )}

                <Flex className="flex-col ml-auto py-4 text-xs text-white text-right">
                    <Link href="/">VitalChart® Virtual ROI Portal</Link>
                    <Link href={getContactPage()} className="underline">
                        Contact Us
                    </Link>
                </Flex>
            </Flex>
        </Box>
    )
}

Header.defaultProps = {}

export default Header
