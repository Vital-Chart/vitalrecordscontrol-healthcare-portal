import cx from 'classnames'
import useNavigation from '@/lib/useNavigation'
import hospitals from '@/lib/hospitals'
import { Box, Link, Button, Flex } from '@/components/core'
import { Container } from '@/components/general'

export const LandingIntro = ({ children }) => {
    const { hospital } = useNavigation()
    const customButtonStyles = {
        backgroundColor: `${hospitals[hospital].buttonColor || '#D5B227'}`,
        color: `${hospitals[hospital].buttonTextColor || '#333333'}`,
    }

    return (
        <Flex
            className={cx(
                'py-32 items-center bg-center bg-cover',
                hospitals[hospital].isWhitelabel
                    ? 'bg-landing-bg-gray'
                    : 'bg-landing-bg'
            )}
        >
            <Container>
                <Box className="w-full max-w-xl text-center sm:text-left">
                    {children}
                    <Box className="mt-6 -ml-2">
                        <Button
                            as={Link}
                            href={`${hospital}/#newRequest`}
                            variant="filledSecondary"
                            className="flex-grow m-2 text-center"
                            style={customButtonStyles}
                        >
                            Start New Request
                        </Button>

                        <Button
                            as={Link}
                            href="https://www.myroiplus.com"
                            variant="filledSecondary"
                            className="flex-grow m-2 text-center"
                            style={customButtonStyles}
                        >
                            Track Request or Download Records
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Flex>
    )
}

export default LandingIntro
