import cx from 'classnames'
import { Box } from '@/components/core'

export const FormSection = ({ className, children }) => (
    <Box
        as="section"
        className={cx(
            'max-w-screen-md py-8 border-b border-gray-light',
            className
        )}
    >
        {children}
    </Box>
)

export default FormSection
