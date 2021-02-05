import { withStore } from '@/lib/store'
import { Layout, Container } from '@/components/general'
import {
    FormWrapper,
    FormSection,
    SectionHeading,
    PageHeading,
} from '@/components/atoms'
import {
    PatientInformation,
    FacilitySelector,
    RecordsSelector,
    RequestPurpose,
    ContactInformation,
    DeliveryInformation,
} from '@/components/sections'
import { Flex, Button } from '@/components/core'

const PIHThirdPartyRequest = ({ store }) => {
    const thirdParty = true
    return (
        <Layout>
            <Container>
                <PageHeading>New Medical Records Request</PageHeading>

                <FormWrapper
                    acceptCharset="UTF-8"
                    encType="multipart/form-data"
                >
                    <FormSection>
                        <SectionHeading>Facility / Facilities</SectionHeading>
                        <Box>
                            <Box as="legend" className="mb-2">
                                Please select the facility or facilities from
                                which you are requesting records:
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
                        <Alert
                            primaryAlertText="Once you hit 'Continue' below, you cannot change which
                    facilities you are requesting from."
                            secondaryAlertText="Please double-check to make sure you select the correct
                    facility or facilities."
                        />
                        <Alert
                            primaryAlertText="You have selected more than one facility."
                            secondaryAlertText="You will receive SEPARATE tracking numbers for each facility. Each facility processes requests individually."
                        />
                    </FormSection>

                    <FormSection>
                        <SectionHeading>Patient Information</SectionHeading>
                        <Box>
                            <Flex className="flex-col sm:flex-row mb-4">
                                <Box className="w-full sm:mr-4">
                                    <Label htmlFor="PI_PFN">
                                        Patient First Name
                                    </Label>
                                    <Input
                                        type="text"
                                        name="PI_PFN"
                                        id="PI_PFN"
                                        className="w-full mt-1"
                                    />
                                </Box>

                                <Box className="w-full mt-4 sm:mt-0">
                                    <Label htmlFor="PI_PLN">
                                        Patient Last Name
                                    </Label>
                                    <Input
                                        type="text"
                                        name="PI_PLN"
                                        id="PI_PLN"
                                        className="w-full mt-1"
                                    />
                                </Box>
                            </Flex>
                            <Box className="mb-4">
                                <Label htmlFor="PI_PON">
                                    Other Patient Names (Optional)
                                </Label>
                                <Input
                                    type="text"
                                    name="PI_PON"
                                    id="PI_PON"
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
                                <Label htmlFor="PI_PHYCL">
                                    Physician/Clinic (Optional)
                                </Label>
                                <Input
                                    type="text"
                                    name="PI_PHYCL"
                                    id="PI_PHYCL"
                                    className="w-full mt-1"
                                />
                            </Box>
                            <Box className="mb-4">
                                <Box as="fieldset">
                                    <Box as="legend" className="mb-2">
                                        Please select the visits/admissions you
                                        would like released:
                                    </Box>
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
                                </Box>
                            </Box>
                        </Box>
                    </FormSection>

                    <FormSection>
                        <Box>
                            <Box as="fieldset">
                                <Box as="legend" className="mb-2">
                                    Please select the type of information you
                                    would like released:
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
                                        The Radiology Department will follow up
                                        if any charges or additional information
                                        is required.
                                    </Checkbox>
                                    <Checkbox
                                        label="Pathology Slides"
                                        labelClassName="w-full"
                                        name="RI_CB"
                                        value="PS"
                                    >
                                        The Pathology Department will follow up
                                        if any charges or additional information
                                        is required.
                                    </Checkbox>
                                </CheckboxWrapper>

                                <Alert primaryAlertText="Medical Records and Itemized Billing will be delivered electronically through this website." />

                                <Box className="mt-4">
                                    <p className="text-sm font-bold mb-2">
                                        The following information will not be
                                        released unless specifically authorized
                                        by checking the relevant box(es) below:
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
                    </FormSection>

                    <FormSection>
                        <SectionHeading>Purpose of Request</SectionHeading>
                        <Box>
                            <Label htmlFor="PR_PUR_DD">Purpose:</Label>
                            <Select
                                name="PR_PUR_DD"
                                id="PR_PUR_DD"
                                className="w-full mt-1"
                            >
                                <option defaultValue disabled></option>
                                <option value="EWK">
                                    Employer (Return to Work)
                                </option>
                                <option value="INC">Insurance Claim</option>
                                <option value="LGL">Legal</option>
                                <option value="MEN">Military Enlistment</option>
                                <option value="OIN">
                                    Obtain Insurance (Underwriting)
                                </option>
                                <option value="PER">Personal</option>
                                <option value="PEM">
                                    Pre-Employment Physical
                                </option>
                                <option value="POA">
                                    Proof of Admission/Discharge Dates
                                </option>
                                <option value="REL">Relocating/Moving</option>
                                <option value="SOP">Second Opinion</option>
                                <option value="OTH">Other</option>
                            </Select>
                        </Box>
                    </FormSection>

                    <FormSection>
                        <SectionHeading>Your Information</SectionHeading>
                        <Box>
                            <Box className="mb-4">
                                <Label htmlFor="YI_NM">Name</Label>
                                <Input
                                    type="text"
                                    name="YI_NM"
                                    id="YI_NM"
                                    autocomplete="name"
                                    className="w-full mt-1"
                                />
                            </Box>
                            <Box className="mb-4">
                                <Label htmlFor="YI_ATN">Attention</Label>
                                <Input
                                    type="text"
                                    name="YI_ATN"
                                    id="YI_ATN"
                                    className="w-full mt-1"
                                />
                            </Box>
                            <Box className="mb-4">
                                <Label htmlFor="YI_ADDR1">Address</Label>
                                <Input
                                    type="text"
                                    name="YI_ADDR1"
                                    id="YI_ADDR1"
                                    autocomplete="address-line1"
                                    className="w-full mt-1"
                                />
                            </Box>
                            <Box className="mb-4">
                                <Label htmlFor="YI_ADDR2">Address Line 2</Label>
                                <Input
                                    type="text"
                                    name="YI_ADDR2"
                                    id="YI_ADDR2"
                                    autocomplete="address-line2"
                                    className="w-full mt-1"
                                />
                            </Box>
                            <Box className="mb-4">
                                <Label htmlFor="YI_CITY">City</Label>
                                <Input
                                    type="text"
                                    name="YI_CITY"
                                    id="YI_CITY"
                                    className="w-full mt-1"
                                />
                            </Box>
                            <Flex className="flex-col sm:flex-row mb-4">
                                <Label htmlFor="YI_ST_DD">State</Label>
                                <Select
                                    className="mb-4 sm:mb-0"
                                    name="YI_ST_DD"
                                    id="YI_ST_DD"
                                >
                                    <option>Select a State</option>
                                    {/* TODO: Add states */}
                                </Select>
                                <Box>
                                    <Label htmlFor="YI_ZIP">Zip</Label>
                                    <Input
                                        type="number"
                                        name="YI_ZIP"
                                        id="YI_ZIP"
                                        autocomplete="postal-code"
                                        className="w-full mt-1"
                                    />
                                </Box>
                            </Flex>
                            <Box className="mb-4">
                                <Label htmlFor="YI_FAX">Fax</Label>
                                <Input
                                    type="text"
                                    name="YI_FAX"
                                    id="YI_FAX"
                                    className="w-full mt-1"
                                />
                            </Box>

                            <Box className="mb-4">
                                <Label htmlFor="YI_NOTICE_DD">
                                    Preferred Notification Method
                                </Label>
                                <Select
                                    name="YI_NOTICE_DD"
                                    id="YI_NOTICE_DD"
                                    className="w-full mt-1"
                                >
                                    <option value="text">
                                        Text Message (Standard messaging rates
                                        may apply.)
                                    </option>
                                    <option value="email">Email</option>
                                </Select>
                            </Box>
                            <Flex className="flex-col sm:flex-row sm:mb-4">
                                <Box className="mr-4 mb-4 sm:mb-0">
                                    <Label htmlFor="YI_PN">Phone Number</Label>
                                    <Input
                                        type="tel"
                                        name="YI_PN"
                                        id="YI_PN"
                                        autocomplete="tel"
                                        className="w-full mt-1"
                                    />
                                </Box>
                                <Box>
                                    <Label htmlFor="YI_PHT_DD">Type</Label>
                                    <Select
                                        name="YI_PHT_DD"
                                        className="w-full mt-1"
                                    >
                                        <option defaultValue disabled>
                                            Select phone type
                                        </option>
                                        <option key="mobile" value="mobile">
                                            Mobile
                                        </option>
                                        <option key="home" value="home">
                                            Home
                                        </option>
                                        <option key="work" value="work">
                                            Work
                                        </option>
                                    </Select>
                                </Box>
                            </Flex>

                            <Box className="mb-4">
                                <Label htmlFor="YI_PHC">
                                    Retype Phone Number
                                </Label>
                                <Input
                                    type="tel"
                                    name="YI_PHC"
                                    id="YI_PHC"
                                    autocomplete="tel"
                                    className="w-full mt-1"
                                />
                            </Box>
                            <Box className="mb-4">
                                <Label htmlFor="YI_EM">Email Address</Label>
                                <Input
                                    type="email"
                                    name="YI_EM"
                                    id="YI_EM"
                                    autocomplete="email"
                                    className="w-full mt-1"
                                />
                            </Box>
                            <Box className="mb-4">
                                <Label htmlFor="YI_EMC">
                                    Retype Email Address
                                </Label>
                                <Input
                                    type="email"
                                    name="YI_EMC"
                                    id="YI_EMC"
                                    autocomplete="email"
                                    className="w-full mt-1"
                                />
                            </Box>
                        </Box>
                    </FormSection>

                    <FormSection>
                        <SectionHeading>Delivery Information</SectionHeading>
                        <Box>
                            <p className="mb-4">
                                Normal processing time is 5 business days from
                                time of receipt. Please contact us if you have
                                any questions.
                            </p>
                            <p className="mb-2">
                                <span className="font-bold">
                                    PIH Health Hospital - Downey:
                                </span>{' '}
                                (562) 904-5166 x26177
                            </p>
                            <p className="mb-2">
                                <span className="font-bold">
                                    PIH Health Hospital - Whittier:
                                </span>{' '}
                                (562) 698-0811 x13685
                            </p>
                            <p className="mb-2">
                                <span className="font-bold">
                                    PIH Health Physicians:
                                </span>{' '}
                                (562) 698-0811 x13858
                            </p>
                        </Box>
                    </FormSection>

                    <FormSection>
                        <Flex>
                            <Button
                                variant="outline"
                                className="flex-grow mx-4"
                            >
                                Cancel
                            </Button>
                            <Button variant="filled" className="flex-grow mx-4">
                                Continue
                            </Button>
                        </Flex>
                    </FormSection>
                </FormWrapper>
            </Container>
        </Layout>
    )
}

export default withStore(PIHThirdPartyRequest)
