import { Heading, Box } from '@/components/core'

export const FormWrapper = ({ children, ...props }) => (
    <Box
        as="form"
        className="pb-8 space-y-8 divide-y divide-gray-light"
        {...props}
    >
        {children}
    </Box>
)

export const FormSection = ({ children }) => (
    <Box className="pt-8">{children}</Box>
)

export const SectionHeading = ({ children }) => (
    <Heading variant="h3" className="font-normal mb-4">
        {children}
    </Heading>
)

export const CheckboxWrapper = ({ children }) => (
    <Box className="pl-4 space-y-2">{children}</Box>
)
