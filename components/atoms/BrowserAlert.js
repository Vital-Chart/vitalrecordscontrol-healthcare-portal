import { Box, Flex, Text } from '@/components/core'
import IconAlert from '@/icons/icon-alert.svg'

export const BrowserAlert = () => (
    <Flex className="py-8 justify-center text-white bg-red-dark">
        <Box className="flex-shrink-0">
            <IconAlert className="h-5 w-5" />
        </Box>
        <Box className="ml-3">
            <Text>
                Your browser is outdated.{' '}
                <a className="underline" href="http://browsehappy.com/">
                    Upgrade to a different browser
                </a>{' '}
                to use this site.
            </Text>
        </Box>
    </Flex>
)

export default BrowserAlert
