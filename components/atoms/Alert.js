import cx from 'classnames'
import { Box, Flex, Text } from '@/components/core'
import IconAlert from '@/icons/icon-alert.svg'

export const Alert = ({ className, primaryAlertText, secondaryAlertText }) => (
    <Box
        className={cx(
            'rounded-md bg-secondary-lightest my-4 p-4 border-l-4 border-secondary',
            className
        )}
    >
        <Flex>
            <Box className="flex-shrink-0">
                <IconAlert className="h-5 w-5 text-secondary-dark" />
            </Box>
            <Box className="ml-3">
                <Text className="text-sm text-secondary-darkest font-bold">
                    {primaryAlertText}
                </Text>

                <Text className="text-sm text-secondary-darkest">
                    {secondaryAlertText}
                </Text>
            </Box>
        </Flex>
    </Box>
)

export default Alert
