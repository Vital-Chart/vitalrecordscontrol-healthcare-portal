import cx from 'classnames'
import { Box, Heading } from '@/components/core'

export const PageHeading = ({ className, children }) => (
    <Box className={cx('py-4 border-b-2 border-gray-light', className)}>
        <Heading>{children}</Heading>
    </Box>
)

export default PageHeading
