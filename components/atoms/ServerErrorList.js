import cx from 'classnames'
import { Box, Flex, Text } from '@/components/core'
import IconAlert from '@/icons/icon-alert.svg'

const errorMessages = {
    100000: '100000: Please try again.',
    100001: '100001: Please try again.',
    100002: '100002: Please try again.',
    100003: '100003: Please try again.',
    100004: '100004: Please try again.',
    100005: '100005: Please try again.',
    100006: '100006: Please try again.',
    100007: '100007: Please try again.',
}

export const ServerErrorList = ({ className, errors }) => {
    if (!errors.length) return null

    return (
        <Box
            className={cx(
                'p-6 bg-red-light border-l-4 border-red-dark',
                className
            )}
        >
            <Flex>
                <Box className="flex-shrink-0">
                    <IconAlert className="h-5 w-5 text-red-dark" />
                </Box>
                <Box className="ml-2">
                    <Text className="font-bold text-sm text-red-dark">
                        There was a problem processing your request.
                    </Text>

                    {errors.map(errorCode => (
                        <Text className="text-sm mb-4">
                            {errorMessages[errorCode]}
                        </Text>
                    ))}
                </Box>
            </Flex>
        </Box>
    )
}

ServerErrorList.defaultProps = {
    errors: [],
}

export default ServerErrorList
