import { Box, Checkbox } from '@/components/core'
import { CheckboxWrapper, Alert } from '@/components/atoms'

export const FacilitySelector = ({ className }) => {
    return (
        <Box className={className}>
            <Box as="fieldset">
                <Box as="legend" className="mb-2">
                    Please select the facility or facilities from which you are
                    requesting records:
                </Box>
                <CheckboxWrapper>
                    <Checkbox
                        label="PIH Health Hospital - Downey"
                        value="P7202-1"
                        name="FI_CB"
                        labelClassName="w-full mb-2"
                    />
                    <Checkbox
                        label="PIH Health Hospital - Whittier"
                        value="P7201-1"
                        name="FI_CB"
                        labelClassName="w-full mb-2"
                    />
                    <Checkbox
                        label="PIH Health Hospital - PIH Health Physicians"
                        value="P7203-1"
                        name="FI_CB"
                        labelClassName="w-full"
                    />
                </CheckboxWrapper>
            </Box>
            <Alert />
            <Alert />
        </Box>
    )
}

export default FacilitySelector
