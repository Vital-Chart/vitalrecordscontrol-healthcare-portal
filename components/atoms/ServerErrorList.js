import cx from 'classnames'
import { Box, Flex, Text } from '@/components/core'
import IconAlert from '@/icons/icon-alert.svg'

const errorMessages = {
    100000: '100000: General server error',
    100001: '100001: Invalid Tracking number provided',
    100002: '100002: A class of error reflecting a data validation failure.  For example, a combo box value was not found in spec',
    100003: '100003: Problem encountered downloading one of more the supplied files',
    100004: '100004: Invalid signature',
    100005: '100005: Invalid file name given',
    100006: '100006: No Tracking Number Information and No Facility Information supplied',
    100007: '100007: Invalid file name given',
    100007: '100008: Tracking Number ID not found',
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
