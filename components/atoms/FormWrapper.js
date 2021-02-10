import { Box } from '@/components/core'

export const FormWrapper = ({ className, children, ...props }) => (
    <Box as="form" className={className} {...props}>
        {children}
    </Box>
)

export default FormWrapper
