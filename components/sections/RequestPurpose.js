import { useFormContext } from 'react-hook-form/dist/index.ie11'
import { Box, Label, Textarea } from '@/components/core'
import { ErrorMessage } from '@/components/atoms'

export const RequestPurpose = ({ includeLimitations }) => {
    const { register, errors, watch, handleChange } = useFormContext()

    return (
        <>
            <Box as="fieldset">
                <Box as="legend" className="mb-2">
                    Please enter your reason for requesting records.
                </Box>

                <Label htmlFor="PR_PUR">Purpose:</Label>
                <Textarea
                    name="PR_PUR"
                    id="PR_PUR"
                    className="block w-full mt-1 mb-2 sm:text-sm rounded"
                    placeholder="Examples: Patient Request, Continuity of Care, Billing/Payment, etc."
                    onChange={handleChange}
                    ref={register({
                        required: 'Please enter the purpose of this request.',
                    })}
                />
                {errors.PR_PUR && (
                    <ErrorMessage
                        className="mt-2"
                        message={errors.PR_PUR.message}
                    />
                )}

                {includeLimitations && (
                    <>
                        <Label htmlFor="PR_LIM" className="italic">
                            Limitations (Optional):
                        </Label>
                        <Textarea
                            name="PR_LIM"
                            id="PR_LIM"
                            className="block w-full mt-1 sm:text-sm rounded"
                            onChange={handleChange}
                            ref={register}
                        />
                    </>
                )}
            </Box>
        </>
    )
}

export default RequestPurpose
