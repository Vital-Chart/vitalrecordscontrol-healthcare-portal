import cx from 'classnames'
import useNavigation from '@/lib/useNavigation'
import hospitals from '@/lib/hospitals'
import { Box, Flex, Text, Link, Image } from '@/components/core'
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
                    <Text className="inline-block text-gray">
                        VitalChart® Virtual ROI Portal
                    </Text>
                </Container>
            </Box>
            {hospitals[hospital] && (
                <Container>
                    <Box
                        className={cx(
                            'py-6',
                            !!(isLandingPage || isSuccessPage) &&
                                'flex justify-center'
                        )}
                    >
                        <Link
                            className="block h-20"
                            href={getLandingPage()}
                            aria-label={`VitalChart® Virtual ROI Portal - ${hospitals[hospital].name}`}
                        >
                            <Image
                                className="h-full object-contain"
                                src={hospitals[hospital].logo}
                            />
                        </Link>
                    </Box>
                </Container>
            )}
        </Box>
    )
}

Header.defaultProps = {}

export default Header
