import { Heading } from '@/components/core'

export const PageHeading = ({ children }) => (
    <Heading className="pt-8 pb-4 border-b-2 border-gray-light">
        {children}
    </Heading>
)
