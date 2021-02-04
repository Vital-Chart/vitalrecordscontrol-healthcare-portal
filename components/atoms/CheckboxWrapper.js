import cx from 'classnames'
import { Box } from '@/components/core'

export const CheckboxWrapper = ({ children, className }) => (
    <Box className={cx('pl-4 space-y-2', className)}>{children}</Box>
)

export default CheckboxWrapper
