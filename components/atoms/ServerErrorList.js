import cx from 'classnames'
import { Box, Flex, Text } from '@/components/core'
import IconAlert from '@/icons/icon-alert.svg'

const errorMessages = {
    100000: '100000: Something went wrong',
    100001: '100001: Invalid Tracking number provided',
    // 100002: '100002: A class of error reflecting a data validation failure. For example, a combo box value was not found in spec',
    100002: '100002: Information provided is invalid',
    100003: '100003: Problem encountered downloading one of more the supplied files',
    100004: '100004: Invalid signature',
    100005: '100005: Invalid file name given',
    100006: '100006: No tracking number information and no facility information supplied',
    100007: '100007: Invalid file name given',
    100008: '100008: Tracking number ID not found',
    100009: '100009: Not enough information provided for processing to continue.  Neither tracking number or facility information provided.',
    100010: '100010: This request requires uploading authorization documents. Please re-read the instructions above, and try again once you have uploaded documents.',
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
                <Flex className="flex-col gap-2 ml-2">
                    <Text className="font-bold text-sm text-red-dark">
                        There was a problem processing your request.
                    </Text>

                    {errors.map(error => {
                        const errorMessage =
                            typeof error === 'string'
                                ? error
                                : errorMessages[error]

                        return (
                            <Text key={error} className="text-sm">
                                {errorMessage}
                            </Text>
                        )
                    })}
                </Flex>
            </Flex>
        </Box>
    )
}

ServerErrorList.defaultProps = {
    errors: [],
}

export default ServerErrorList
