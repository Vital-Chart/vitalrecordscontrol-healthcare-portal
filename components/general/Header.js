import cx from 'classnames'
import useNavigation from '@/lib/useNavigation'
import hospitals from '@/lib/hospitals'
import { Box, Flex, Link, Image } from '@/components/core'
import { Container } from '@/components/general'

export const Header = () => {
    const {
        hospital,
        getLandingPage,
        getContactPage,
        isLandingPage,
        isSuccessPage,
    } = useNavigation()

    return (
        <Box as="header">
            <Box className="bg-black">
                <Container className="py-2 text-sm text-white hover:text-gray text-right transition-colors">
                    {hospital && (
                        <Link
                            href={getContactPage()}
                            className="underline mr-4"
                        >
                            Contact Us
                        </Link>
                    )}
                    <Link href="/" className="text-gray">
                        VitalChart® Virtual ROI Portal
                    </Link>
                </Container>
            </Box>
            {hospitals[hospital] && (
                <Container>
                    <Flex
                        className={cx(
                            'py-6',
                            !!(isLandingPage || isSuccessPage) &&
                                'justify-center'
                        )}
                    >
                        <Link href={getLandingPage()}>
                            <Image
                                className="w-auto h-20"
                                src={hospitals[hospital].logo}
                            />
                        </Link>
                    </Flex>
                </Container>
            )}
        </Box>
    )
}

Header.defaultProps = {}

export default Header
