import { useFormContext } from 'react-hook-form/dist/index.ie11'
import { Box, Label, Input } from '@/components/core'

export const PhysicianClinic = () => {
    const { register, handleChange } = useFormContext()

    return (
        <Box className="mb-4">
            <Label htmlFor="PI_PHYCL" className="italic">
                Physician/Clinic (Optional)
            </Label>
            <Input
                type="text"
                name="PI_PHYCL"
                id="PI_PHYCL"
                className="w-full mt-1"
                onChange={handleChange}
                ref={register}
            />
        </Box>
    )
}

export default PhysicianClinic
