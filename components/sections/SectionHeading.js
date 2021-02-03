import { Heading } from '@/components/core'

export const SectionHeading = ({ children }) => (
    <Heading variant="h3" className="font-normal mb-4">
        {children}
    </Heading>
)

// SectionHeading.defaultProps = {}

export default SectionHeading
