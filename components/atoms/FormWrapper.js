import cx from 'classnames'
import { Box } from '@/components/core'

export const FormWrapper = ({ className, children, ...props }) => (
    <Box
        as="form"
        className={cx('pb-8 space-y-8 divide-y divide-gray-light', className)}
        {...props}
    >
        {children}
    </Box>
)

export default FormWrapper
