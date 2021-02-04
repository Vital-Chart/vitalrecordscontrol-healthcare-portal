import { Box, Label, Select } from '@/components/core'

export const RequestPurpose = ({ className, thirdParty }) => {
    return (
        <Box className={className}>
            <p className="mb-2">
                Please enter your reason for requesting records.
            </p>
            {thirdParty ? (
                <>
                    <Label htmlFor="PR_PUR_DD">Purpose:</Label>
                    <Select
                        name="PR_PUR_DD"
                        id="PR_PUR_DD"
                        className="w-full mt-1"
                    >
                        <option defaultValue disabled></option>
                        <option value="EWK">Employer (Return to Work)</option>
                        <option value="INC">Insurance Claim</option>
                        <option value="LGL">Legal</option>
                        <option value="MEN">Military Enlistment</option>
                        <option value="OIN">
                            Obtain Insurance (Underwriting)
                        </option>
                        <option value="PER">Personal</option>
                        <option value="PEM">Pre-Employment Physical</option>
                        <option value="POA">
                            Proof of Admission/Discharge Dates
                        </option>
                        <option value="REL">Relocating/Moving</option>
                        <option value="SOP">Second Opinion</option>
                        <option value="OTH">Other</option>
                    </Select>
                </>
            ) : (
                <>
                    <Label htmlFor="PR_PUR">Purpose:</Label>
                    <Box
                        as="textarea"
                        name="PR_PUR"
                        id="PR_PUR"
                        className="block w-full mt-1 mb-2 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Examples: Patient Request, Continuity of Care, Billing/Payment, etc."
                    />
                    <Label htmlFor="PR_LIM">Limitations (Optional):</Label>
                    <Box
                        as="textarea"
                        name="PR_LIM"
                        id="PR_LIM"
                        className="block w-full mt-1 sm:text-sm border-gray-300 rounded-md"
                    />
                </>
            )}
        </Box>
    )
}

export default RequestPurpose
