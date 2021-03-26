import { useFormContext } from 'react-hook-form/dist/index.ie11'
import { Box, Label, Input } from '@/components/core'
import { ErrorMessage } from '@/components/atoms'
import { regexPatterns } from '@/lib/helpers'

export const PatientDOB = () => {
    const { register, errors, watch, handleChange } = useFormContext()

    return (
        <Box className="mb-4">
            <Label htmlFor="PI_DOB">Patient Date of Birth</Label>
            <Input
                type="text"
                name="PI_DOB"
                id="PI_DOB"
                className="w-full mt-1"
                placeholder="MM/DD/YYYY"
                onChange={handleChange}
                ref={register({
                    required: "Please enter the patient's date of birth.",
                    pattern: {
                        value: regexPatterns.date,
                        message: 'Please enter a valid date (MM/DD/YYYY).',
                    },
                })}
            />

            {errors.PI_DOB && (
                <ErrorMessage
                    className="mt-2"
                    message={errors.PI_DOB.message}
                />
            )}
        </Box>
    )
}

export default PatientDOB
