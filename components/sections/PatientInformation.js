import { Box, Flex, Label, Input, Radio } from '@/components/core'
import { DatePicker, DateRangeSelector } from '@/components/atoms'

export const PatientInformation = ({ className }) => {
    return (
        <Box className={className}>
            <Flex className="flex-col sm:flex-row mb-4">
                <Box className="w-full sm:mr-4">
                    <Label htmlFor="patientFirstName">Patient First Name</Label>
                    <Input
                        type="text"
                        name="PI_PFN"
                        id="patientFirstName"
                        className="w-full mt-1"
                    />
                </Box>

                <Box className="w-full mt-4 sm:mt-0">
                    <Label htmlFor="patientLastName">Patient Last Name</Label>
                    <Input
                        type="text"
                        name="PI_PLN"
                        id="patientLastName"
                        className="w-full mt-1"
                    />
                </Box>
            </Flex>
            <Box className="mb-4">
                <Label htmlFor="patientOtherNames">
                    Other Patient Names (Optional)
                </Label>
                <Input
                    type="text"
                    name="PI_PON"
                    id="patientOtherNames"
                    className="w-full mt-1"
                />
            </Box>
            <Box className="mb-4">
                <Label>Patient Date of Birth</Label>
                <DatePicker
                    monthFieldName="birthMonth"
                    dayFieldName="birthDay"
                    yearFieldName="birthYear"
                    className="mt-1"
                />
            </Box>
            <Box className="mb-4">
                <Label>Physician/Clinic (Optional)</Label>
                <Input type="text" className="w-full mt-1" />
            </Box>
            <Box className="mb-4">
                <fieldset>
                    <legend className="mb-2">
                        Please select the visits/admissions you would like
                        released:
                    </legend>
                    <Box className="ml-4">
                        <Radio
                            label="Most recent"
                            labelClassName="w-full"
                            name="VI_OPT"
                            value="MR"
                        />
                        <Radio
                            label="All"
                            labelClassName="w-full"
                            name="VI_OPT"
                            value="ALL"
                        />
                        <Radio
                            label="In a date range"
                            labelClassName="w-full"
                            name="VI_OPT"
                            value="DR"
                        />
                        <DateRangeSelector className="mt-4" />
                    </Box>
                </fieldset>
            </Box>
        </Box>
    )
}

export default PatientInformation
