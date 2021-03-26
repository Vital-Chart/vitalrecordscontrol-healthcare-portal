import { useFormContext } from 'react-hook-form/dist/index.ie11'
import { Box, Flex, Label, Input } from '@/components/core'
import { ErrorMessage } from '@/components/atoms'

export const PatientName = () => {
    const { register, errors, watch, handleChange } = useFormContext()

    return (
        <Flex className="flex-col sm:flex-row mb-4">
            <Box className="w-full sm:mr-4">
                <Label htmlFor="PI_PFN">Patient First Name</Label>
                <Input
                    type="text"
                    name="PI_PFN"
                    id="PI_PFN"
                    className="w-full mt-1"
                    onChange={handleChange}
                    ref={register({
                        required: "Please enter the patient's first name.",
                    })}
                />
                {errors.PI_PFN && (
                    <ErrorMessage
                        className="mt-2"
                        message={errors.PI_PFN.message}
                    />
                )}
            </Box>

            <Box className="w-full mt-4 sm:mt-0">
                <Label htmlFor="PI_PLN">Patient Last Name</Label>
                <Input
                    type="text"
                    name="PI_PLN"
                    id="PI_PLN"
                    className="w-full mt-1"
                    onChange={handleChange}
                    ref={register({
                        required: "Please enter the patient's last name.",
                    })}
                />
                {errors.PI_PLN && (
                    <ErrorMessage
                        className="mt-2"
                        message={errors.PI_PLN.message}
                    />
                )}
            </Box>
        </Flex>
    )
}

export default PatientName
