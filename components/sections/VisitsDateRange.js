import { useFormContext } from 'react-hook-form/dist/index.ie11'
import { Box, Flex, Label, Input } from '@/components/core'
import { ErrorMessage } from '@/components/atoms'
import { regexPatterns } from '@/lib/helpers'

export const VisitsDateRange = () => {
    const { register, errors, handleChange, getValues } = useFormContext()

    return (
        <>
            <Flex>
                <Box className="mr-4">
                    <Label htmlFor="VI_DR_SD" className="block mb-1">
                        Service Start:
                    </Label>
                    <Input
                        type="text"
                        name="VI_DR_SD"
                        id="VI_DR_SD"
                        className="w-full"
                        placeholder="MM/DD/YYYY"
                        onChange={handleChange}
                        ref={register({
                            required: 'Please enter a start date.',
                            pattern: {
                                value: regexPatterns.date,
                                message:
                                    'Please enter a valid date (MM/DD/YYYY).',
                            },
                        })}
                    />
                    {errors.VI_DR_SD && (
                        <ErrorMessage
                            className="mt-2"
                            message={errors.VI_DR_SD.message}
                        />
                    )}
                </Box>

                <Box>
                    <Label htmlFor="VI_DR_ED" className="block mb-1">
                        Service End:
                    </Label>
                    <Input
                        type="text"
                        name="VI_DR_ED"
                        id="VI_DR_ED"
                        className="w-full"
                        placeholder="MM/DD/YYYY"
                        onChange={handleChange}
                        ref={register({
                            required: 'Please enter an end date.',
                            pattern: {
                                value: regexPatterns.date,
                                message:
                                    'Please enter a valid date (MM/DD/YYYY).',
                            },
                            validate: {
                                dateRangeCheck: value =>
                                    new Date(value) >=
                                        new Date(getValues('VI_DR_SD')) ||
                                    'The Service End date you entered is before the Service Start date.',
                            },
                        })}
                    />
                    {errors.VI_DR_ED && (
                        <ErrorMessage
                            className="mt-2"
                            message={errors.VI_DR_ED.message}
                        />
                    )}
                </Box>
            </Flex>
        </>
    )
}

export default VisitsDateRange
