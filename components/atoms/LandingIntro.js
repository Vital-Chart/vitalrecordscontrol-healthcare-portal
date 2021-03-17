import cx from 'classnames'
import useNavigation from '@/lib/useNavigation'
import hospitals from '@/lib/hospitals'
import { Box, Link, Button, Flex } from '@/components/core'
import { Container } from '@/components/general'

export const LandingIntro = ({ children }) => {
    const { hospital } = useNavigation()

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
                <Box className="max-w-xl text-center sm:text-left">
                    {children}
                    <Box className="mt-6 -ml-2">
                        <Button
                            as={Link}
                            href={`${hospital}/#newRequest`}
                            variant="filledSecondary"
                            className="flex-grow m-2 text-center"
                        >
                            Start New Request
                        </Button>

                        <Button
                            as={Link}
                            href="https://www.myroiplus.com"
                            variant="filledSecondary"
                            className="flex-grow m-2 text-center"
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
