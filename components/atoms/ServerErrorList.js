import cx from 'classnames'
import { Box, Flex, Text } from '@/components/core'
import IconAlert from '@/icons/icon-alert.svg'

export const ServerErrorList = ({ className, errors }) => (
    <Box
        className={cx('p-6 bg-red-light border-l-4 border-red-dark', className)}
    >
        <Flex>
            <Box className="flex-shrink-0">
                <IconAlert className="h-5 w-5 text-red-dark" />
            </Box>
            <Box className="ml-2">
                <Text className="font-bold text-sm text-red-dark">
                    There was a problem processing your request.
                </Text>
                {errors.map(error => (
                    <Text className="text-sm">There was an error: {error}</Text>
                ))}
            </Box>
        </Flex>
    </Box>
)

export default ServerErrorList
