import { Box } from '@/components/core'

export const FormWrapper = ({ children, ...props }) => (
    <Box
        as="form"
        className="pb-8 space-y-8 divide-y divide-gray-light"
        {...props}
    >
        {children}
    </Box>
)

export default FormWrapper
