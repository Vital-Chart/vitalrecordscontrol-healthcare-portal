import cx from 'classnames'
import { Box, Flex, Text } from '@/components/core'
import IconAlert from '@/icons/icon-alert.svg'

export const ErrorMessage = ({ className, message }) => (
    // TODO: We should avoid adding spacing around components,
    // because the spacing depends on the context they are used
    <Box className={cx('py-2', className)}>
        <Flex>
            <Box className="flex-shrink-0">
                <IconAlert className="h-5 w-5 text-red-dark" />
            </Box>

            <Box className="ml-2">
                <Text className="text-sm text-red-dark">{message}</Text>
            </Box>
        </Flex>
    </Box>
)

export default ErrorMessage
