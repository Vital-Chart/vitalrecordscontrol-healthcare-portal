import { useFormContext } from 'react-hook-form/dist/index.ie11'
import { Box, Flex, Input, Radio } from '@/components/core'
import { ErrorMessage } from '@/components/atoms'
import { VisitsDateRange } from '@/components/sections'

export const VisitOptions = ({ forceDateRange }) => {
    const { register, errors, watch, handleChange } = useFormContext()
    const watchVisitOptions = watch('VI_OPT', [])

    return (
        <Box as="fieldset">
            <Box as="legend" className="mb-2">
                Please select the visits/admissions you would like released:
            </Box>
            {forceDateRange ? (
                <>
                    <Input
                        type="hidden"
                        name="VI_OPT"
                        value="MR"
                        ref={register}
                    />
                    <VisitsDateRange />
                </>
            ) : (
                <Flex className="flex-col items-start ml-4">
                    <Radio
                        label="Most recent"
                        name="VI_OPT"
                        value="MR"
                        onChange={handleChange}
                        ref={register({
                            required:
                                'Please select which records you would like released.',
                        })}
                    />
                    <Radio
                        label="All"
                        name="VI_OPT"
                        value="ALL"
                        onChange={handleChange}
                        ref={register({
                            required:
                                'Please select which records you would like released.',
                        })}
                    />
                    <Radio
                        label="In a date range"
                        name="VI_OPT"
                        value="DR"
                        onChange={handleChange}
                        ref={register({
                            required:
                                'Please select which records you would like released.',
                        })}
                    />
                    {errors.VI_OPT && (
                        <ErrorMessage
                            className="mt-2"
                            message={errors.VI_OPT.message}
                        />
                    )}

                    {watchVisitOptions && watchVisitOptions.includes('DR') && (
                        <VisitsDateRange />
                    )}
                </Flex>
            )}
        </Box>
    )
}

export default VisitOptions
