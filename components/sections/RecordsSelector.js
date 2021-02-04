import { Box, Radio, Checkbox } from '@/components/core'
import { CheckboxWrapper, Alert } from '@/components/atoms'

export const RecordsSelector = ({ className }) => {
    return (
        <Box className={className}>
            <Box as="fieldset">
                <Box as="legend" className="mb-2">
                    Please select the type of information you would like
                    released:
                </Box>
                <CheckboxWrapper>
                    <Checkbox
                        label="Medical Records"
                        labelClassName="w-full"
                        name="RI_CB"
                        value="MR"
                    />
                    <Box>
                        <Box className="ml-4">
                            <Radio
                                label="Pertinent Information (Discharge Summary, History and Physical, Consultation, ER Reports, Labs, Radiology Reports, EKGs, Pathology Reports)"
                                labelClassName="w-full"
                                name="RI_MR_OPT"
                                value="PI"
                            />
                            <Radio
                                label="All health information pertaining to my medical history, mental or physical condition and treatment received, including records received from other healthcare providers. A reasonable clerical and reproduction processing fee is applicable."
                                labelClassName="w-full"
                                name="RI_MR_OPT"
                                value="AHI"
                            />
                            <Radio
                                label="Only the following records or types of health information included in the following dates of service:"
                                labelClassName="w-full"
                                name="RI_MR_OPT"
                                value="FR"
                            />
                            <Box>
                                <CheckboxWrapper>
                                    <Checkbox
                                        label="Emergency/Urgent Care Physician Report"
                                        labelClassName="w-full"
                                        name="RI_MR_FR_CB"
                                        value="EUR"
                                    />
                                    <Checkbox
                                        label="Consultation Report"
                                        labelClassName="w-full"
                                        name="RI_MR_FR_CB"
                                        value="CR"
                                    />
                                    <Checkbox
                                        label="Laboratory Reports"
                                        labelClassName="w-full"
                                        name="RI_MR_FR_CB"
                                        value="LR"
                                    />
                                    <Checkbox
                                        label="Newborn Record"
                                        labelClassName="w-full"
                                        name="RI_MR_FR_CB"
                                        value="NR"
                                    />
                                    <Checkbox
                                        label="History and Physical Report"
                                        labelClassName="w-full"
                                        name="RI_MR_FR_CB"
                                        value="HPR"
                                    />
                                    <Checkbox
                                        label="Operative Report"
                                        labelClassName="w-full"
                                        name="RI_MR_FR_CB"
                                        value="OR"
                                    />
                                    <Checkbox
                                        label="Pathology Report"
                                        labelClassName="w-full"
                                        name="RI_MR_FR_CB"
                                        value="PR"
                                    />
                                    <Checkbox
                                        label="Immunization Record"
                                        labelClassName="w-full"
                                        name="RI_MR_FR_CB"
                                        value="IR"
                                    />
                                    <Checkbox
                                        label="Discharge Summary Report"
                                        labelClassName="w-full"
                                        name="RI_MR_FR_CB"
                                        value="DSR"
                                    />
                                    <Checkbox
                                        label="Anesthesia Records"
                                        labelClassName="w-full"
                                        name="RI_MR_FR_CB"
                                        value="AR"
                                    />
                                    <Checkbox
                                        label="Radiology Report"
                                        labelClassName="w-full"
                                        name="RI_MR_FR_CB"
                                        value="RR"
                                    />
                                    <Checkbox
                                        label="Therapy Records"
                                        labelClassName="w-full"
                                        name="RI_MR_FR_CB"
                                        value="TR"
                                    />
                                </CheckboxWrapper>
                            </Box>
                        </Box>
                    </Box>
                    <Checkbox
                        label="Itemized Billing"
                        labelClassName="w-full"
                        name="RI_CB"
                        value="IB"
                    />

                    <Checkbox
                        label="Radiology Images"
                        labelClassName="w-full"
                        name="RI_CB"
                        value="RI"
                    >
                        The Radiology Department will follow up if any charges
                        or additional information is required.
                    </Checkbox>
                    <Checkbox
                        label="Pathology Slides"
                        labelClassName="w-full"
                        name="RI_CB"
                        value="PS"
                    >
                        The Pathology Department will follow up if any charges
                        or additional information is required.
                    </Checkbox>
                </CheckboxWrapper>
                <Alert primaryAlertText="Medical Records and Itemized Billing will be delivered electronically through this website." />
                <Box className="mt-4">
                    <p className="text-sm font-bold mb-2">
                        The following information will not be released unless
                        specifically authorized by checking the relevant box(es)
                        below:
                    </p>
                    <CheckboxWrapper>
                        <Checkbox label="Information pertaining to drug and alcohol abuse, diagnosis, or treatment" />
                        <Checkbox label="Information pertaining to mental health diagnosis or treatment" />
                        <Checkbox label="HIV/AIDS test results" />
                        <Checkbox label="Genetic testing information" />
                        <Checkbox label="Worker's Comp information" />
                    </CheckboxWrapper>
                </Box>
            </Box>
        </Box>
    )
}

export default RecordsSelector
