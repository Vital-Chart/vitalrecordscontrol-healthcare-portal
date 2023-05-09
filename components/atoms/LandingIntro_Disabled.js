import cx from 'classnames'
import useNavigation from '@/lib/useNavigation'
import hospitals from '@/lib/hospitals'
import { Flex } from '@/components/core'
import { Container } from '@/components/general'
import { Box } from '@/components/core'


export const LandingIntroD = ({ children }) => {
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
                <Box className="w-full max-w-xl text-center sm:text-left">
                    {children}
                </Box>
            </Container>
        </Flex>
    )
}

export default LandingIntroD
