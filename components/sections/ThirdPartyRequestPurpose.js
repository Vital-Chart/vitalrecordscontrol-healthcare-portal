import { Box, Label } from '@/components/core'

export const ThirdPartyRequestPurpose = ({ className }) => {
    return (
        <Box className={className}>
            <p className="mb-2">
                Please enter your reason for requesting records.
            </p>
            <Label>Purpose:</Label>
            <Box
                as="textarea"
                name="PR_PUR"
                className="block w-full mt-1 mb-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="Examples: Patient Request, Continuity of Care, Billing/Payment, etc."
            />
            <Label>Limitations (Optional):</Label>
            <Box
                as="textarea"
                name="PR_LIM"
                className="block w-full mt-1 sm:text-sm border-gray-300 rounded-md"
            />
        </Box>
    )
}

export default ThirdPartyRequestPurpose
