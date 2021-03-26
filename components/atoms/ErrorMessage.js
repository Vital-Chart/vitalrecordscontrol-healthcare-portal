import { Box, Flex, Text } from '@/components/core'
import IconAlert from '@/icons/icon-alert.svg'

export const ErrorMessage = ({ className, message }) => (
    <Box className={className}>
        <Flex>
            <Box className="flex-shrink-0">
                <IconAlert className="h-5 w-5 text-red-dark" />
            </Box>

            <Box className="ml-1">
                <Text className="text-sm text-red-dark">{message}</Text>
            </Box>
        </Flex>
    </Box>
)

export default ErrorMessage
