import cx from 'classnames'
import { Box } from '@/components/core'

export const FormSection = ({ className, children }) => (
    <Box as="section" className={cx('pt-8', className)}>
        {children}
    </Box>
)

export default FormSection
