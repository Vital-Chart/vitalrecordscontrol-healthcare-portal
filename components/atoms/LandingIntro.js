import cx from 'classnames'
import useNavigation from '@/lib/useNavigation'
import hospitals from '@/lib/hospitals'
import { Box, Flex, Link, Button } from '@/components/core'
import { Container } from '@/components/general'
import { ContinueRequest } from '@/components/sections'

export const LandingIntro = ({ children }) => {
    const { hospital } = useNavigation()
    const customButtonStyles = {
        backgroundColor: hospitals[hospital].buttonColor,
        color: hospitals[hospital].buttonTextColor,
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
                            href="http://www.myroiplus.com"
                            variant="filledSecondary"
                            className="flex-grow m-2 text-center"
                            style={customButtonStyles}
                        >
                            Track Request or Download Records
                        </Button>

                        <ContinueRequest />
                    </Box>
                </Box>
            </Container>
        </Flex>
    )
}

export default LandingIntro
