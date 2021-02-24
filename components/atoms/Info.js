import cx from 'classnames'
import { Box, Flex, Text } from '@/components/core'
import IconInfo from '@/icons/icon-info.svg'

export const Info = ({ className, primaryText, secondaryText }) => (
    <Box className={cx('rounded-md py-4 px-6 bg-gray-lightest', className)}>
        <Flex>
            <Box className="flex-shrink-0">
                <IconInfo className="h-5 w-5 text-blue" />
            </Box>
            <Box className="ml-3">
                <Text className="text-sm font-bold">{primaryText}</Text>
                <Text className="text-sm">{secondaryText}</Text>
            </Box>
        </Flex>
    </Box>
)

export default Info
