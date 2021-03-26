import { useFormContext } from 'react-hook-form/dist/index.ie11'
import { Box, Label, Input } from '@/components/core'

export const PatientOtherNames = () => {
    const { register, handleChange } = useFormContext()

    return (
        <Box className="mb-4">
            <Label htmlFor="PI_PON" className="italic" className="italic">
                Other Patient Names (Optional)
            </Label>
            <Input
                type="text"
                name="PI_PON"
                id="PI_PON"
                className="w-full mt-1"
                onChange={handleChange}
                ref={register}
            />
        </Box>
    )
}

export default PatientOtherNames
