import cx from 'classnames'
import { Box, Flex } from '@/components/core'
import IconInfo from '@/icons/icon-info.svg'

export const Info = ({ className, primaryText, secondaryText }) => (
    <Box className={cx('rounded-md py-4 px-6 bg-gray-lightest', className)}>
        <Flex>
            <Box className="flex-shrink-0">
                <IconInfo className="h-5 w-5 text-blue" />
            </Box>
            <Box className="ml-3">
                <p className="text-sm font-bold">{primaryText}</p>
                <p className="text-sm">{secondaryText}</p>
            </Box>
        </Flex>
    </Box>
)

export default Info
