import cx from 'classnames'
import { Box, Flex, Heading, Image } from '@/components/core'
import hospitals from '@/lib/hospitals'

export const PageHeading = ({ className, children }) => (
    <Box className={cx('py-4 border-b-2 border-gray-light', className)}>
        <Heading>{children}</Heading>
    </Box>
)

export default PageHeading
