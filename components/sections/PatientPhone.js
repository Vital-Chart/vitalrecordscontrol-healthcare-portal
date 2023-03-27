import { useFormContext } from 'react-hook-form/dist/index.ie11'
import { Box, Label, Input, Flex } from '@/components/core'
import { ErrorMessage } from '@/components/atoms'
import { regexPatterns } from '@/lib/helpers'

export const PatientPhone = () => {
    const { register, errors, watch, handleChange, getValues } = useFormContext()

    return (
        <Flex className="flex-col sm:flex-row">
            <Box className="mb-4 sm:mr-4">
            <Label htmlFor="DI_PHONE">Patient Phone Number</Label>
            <Input
                type="tel"
                name="DI_PHONE"
                id="DI_PHONE"
                autoComplete="tel"
                className="w-full mt-1"
                onChange={handleChange}
                ref={register({
                    required:
                        'Please enter patient phone number.',
                    pattern: {
                        value: regexPatterns.phone,
                        message:
                            'Please enter a valid phone number.',
                    },
                })}
            />
            {errors.DI_PHONE && (
                <ErrorMessage
                    className="mt-2"
                    message={errors.DI_PHONE.message}
                />
            )}
        </Box>
        <Box className="mb-4">
                                <Label htmlFor="DI_PHC">
                                    Retype Phone Number
                                </Label>
                                <Input
                                    type="tel"
                                    name="DI_PHC"
                                    id="DI_PHC"
                                    autoComplete="tel"
                                    className="w-full mt-1"
                                    onChange={handleChange}
                                    ref={register({
                                        required:
                                            'Please confirm patient phone number.',
                                        validate: {
                                            phoneMatch: value =>
                                                value === getValues('DI_PHONE') ||
                                                'The phone numbers you entered do not match!',
                                        },
                                    })}
                                />
                                {errors.DI_PHC && (
                                    <ErrorMessage
                                        className="mt-2"
                                        message={errors.DI_PHC.message}
                                    />
                                )}
        </Box>
    </Flex>

)
}

export default PatientPhone
