import cx from 'classnames'
import { Box, Flex, Text } from '@/components/core'
import IconAlert from '@/icons/icon-alert.svg'
import errorMessages from '@/lib/errorMessages'

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
