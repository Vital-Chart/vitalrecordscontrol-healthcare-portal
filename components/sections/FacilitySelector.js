import { useFormContext } from 'react-hook-form/dist/index.ie11'
import useNavigation from '@/lib/useNavigation'
import hospitals from '@/lib/hospitals'
import { Box, Checkbox, Input } from '@/components/core'
import {
    FormSection,
    SectionHeading,
    CheckboxWrapper,
    Info,
    ErrorMessage,
} from '@/components/atoms'

export const FacilitySelector = () => {
    const { register, errors, watch, handleChange } = useFormContext()
    const watchFacilityCheckboxes = watch('FI_CB', [])

    const { hospital } = useNavigation()
    const { facilities } = hospitals[hospital]

    if (facilities.length === 1) {
        return (
            <Input
                type="hidden"
                name="FI_CB"
                value={facilities[0].id}
                ref={register}
            />
        )
    } else if (facilities.length > 1) {
        return (
            <FormSection className="border-b border-gray-light">
                <SectionHeading>Facility / Facilities</SectionHeading>

                <Box as="fieldset">
                    <Box as="legend" className="mb-2">
                        Please select the facility or facilities from which you
                        are requesting records:
                    </Box>
                    <CheckboxWrapper>
                        {facilities.map(facility => (
                            <Checkbox
                                key={facility.id}
                                labelClassName="mb-2"
                                label={facility.name}
                                value={facility.id}
                                name="FI_CB"
                                onChange={handleChange}
                                ref={register({
                                    required:
                                        'Please select at least one facility.',
                                })}
                            />
                        ))}
                        {errors.FI_CB && (
                            <ErrorMessage
                                className="mt-2"
                                message={errors.FI_CB.message}
                            />
                        )}
                    </CheckboxWrapper>
                </Box>

                {watchFacilityCheckboxes.length > 1 && (
                    <Info
                        primaryText="You have selected more than one facility."
                        secondaryText="You will receive SEPARATE tracking numbers for each facility. Each facility processes requests individually."
                        className="my-4"
                    />
                )}
            </FormSection>
        )
    }
}

export default FacilitySelector
