import { Box, Flex } from '@/components/core'
import IconAlert from '@/icons/icon-alert.svg'

export const ErrorMessage = ({ className, message }) => (
    <Box className={className}>
        <Flex>
            <Box className="flex-shrink-0">
                <IconAlert className="h-5 w-5 text-red-dark" />
            </Box>
            <Box className="ml-2">
                <p className="text-sm text-red-dark">{message}</p>
            </Box>
        </Flex>
    </Box>
)

export default ErrorMessage
