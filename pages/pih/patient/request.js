import { useState } from 'react'
import { withStore } from '@/lib/store'
import {
    FormWrapper,
    FormSection,
    SectionHeading,
    CheckboxWrapper,
    PageHeading,
    FacilitySelector,
    DatePicker,
    DateRangeSelector,
} from '@/components/atoms'
import { Layout, Container } from '@/components/general'
import {
    Box,
    Flex,
    Input,
    Label,
    Select,
    Checkbox,
    Radio,
    Button,
} from '@/components/core'

const PIHPatientRequest = ({ store }) => {
    const [formData, setFormData] = useState(null)

    function handleFormChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
        console.table({ formData })
    }

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
                        <FacilitySelector />
                    </FormSection>

                    <FormSection>
                        <SectionHeading>Patient Information</SectionHeading>
                        <Flex className="flex-col sm:flex-row mb-4">
                            <Box className="w-full sm:mr-4">
                                <Label htmlFor="patientFirstName">
                                    Patient First Name
                                </Label>
                                <Input
                                    type="text"
                                    name="PI_PFN"
                                    id="patientFirstName"
                                    className="w-full mt-1"
                                    onChange={handleFormChange}
                                />
                            </Box>

                            <Box className="w-full mt-4 sm:mt-0">
                                <Label htmlFor="patientLastName">
                                    Patient Last Name
                                </Label>
                                <Input
                                    type="text"
                                    name="PI_PLN"
                                    id="patientLastName"
                                    className="w-full mt-1"
                                    onChange={handleFormChange}
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
                                onChange={handleFormChange}
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
                                    Please select the visits/admissions you
                                    would like released:
                                </legend>
                                <Box className="ml-4">
                                    <Radio
                                        label="Most recent"
                                        labelClassName="w-full"
                                        name="VI_OPT"
                                        value="MR"
                                        onChange={handleFormChange}
                                    />
                                    <Radio
                                        label="All"
                                        labelClassName="w-full"
                                        name="VI_OPT"
                                        value="ALL"
                                        onChange={handleFormChange}
                                    />
                                    <Radio
                                        label="In a date range"
                                        labelClassName="w-full"
                                        name="VI_OPT"
                                        value="DR"
                                        onChange={handleFormChange}
                                    />
                                    <DateRangeSelector className="mt-4" />
                                </Box>
                            </fieldset>
                        </Box>
                    </FormSection>
                    <FormSection>
                        <fieldset>
                            <legend className="mb-2">
                                Please select the type of information you would
                                like released:
                            </legend>
                            <CheckboxWrapper>
                                <Checkbox
                                    label="Medical Records"
                                    labelClassName="w-full"
                                    name="RI_CB"
                                    value="MR"
                                    onChange={handleFormChange}
                                ></Checkbox>
                                {/* TODO: Add Medical Records secondary info and extra authorization info */}
                                <Checkbox
                                    label="Itemized Billing"
                                    labelClassName="w-full"
                                    name="RI_CB"
                                    onChange={handleFormChange}
                                />

                                <Checkbox
                                    label="Radiology Images"
                                    labelClassName="w-full"
                                    name="RI_CB"
                                >
                                    The Radiology Department will follow up if
                                    any charges or additional information is
                                    required.
                                </Checkbox>
                                <Checkbox
                                    label="Pathology Slides"
                                    labelClassName="w-full"
                                    name="RI_CB"
                                    onChange={handleFormChange}
                                >
                                    The Pathology Department will follow up if
                                    any charges or additional information is
                                    required.
                                </Checkbox>
                            </CheckboxWrapper>
                            {/* TODO: Add alert re: medical record and itemized billing delivery */}
                        </fieldset>
                    </FormSection>
                    <FormSection>
                        <SectionHeading>Purpose of Request</SectionHeading>
                        <p>Please enter your reason for requesting records.</p>
                        <Label>Purpose:</Label>
                        <Box
                            as="textarea"
                            name="PR_PUR"
                            className="block w-full mt-1 sm:text-sm border-gray-300 rounded-md"
                            placeholder="Examples: Patient Request, Continuity of Care, Billing/Payment, etc."
                            onChange={handleFormChange}
                        />
                        <Label>Limitations (Optional):</Label>
                        <Box
                            as="textarea"
                            name="PR_LIM"
                            className="block w-full mt-1 sm:text-sm border-gray-300 rounded-md"
                            onChange={handleFormChange}
                        />
                    </FormSection>
                    <FormSection>
                        <SectionHeading>Your Information</SectionHeading>
                        <Box className="mb-4">
                            <Label htmlFor="preferredNotificationMethod">
                                Preferred Notification Method
                            </Label>
                            <Select
                                name="YI_NOTICE_DD"
                                id="preferredNotificationMethod"
                                className="w-full mt-1"
                                onChange={handleFormChange}
                            >
                                <option value="text">
                                    Text Message (Standard messaging rates may
                                    apply.)
                                </option>
                                <option value="email">Email</option>
                            </Select>
                        </Box>
                        <Flex className="flex-col sm:flex-row mb-4">
                            <Box className="mr-4">
                                <Label htmlFor="phoneNumber">
                                    Phone Number
                                </Label>
                                <Input
                                    type="tel"
                                    name="YI_PN"
                                    id="phoneNumber"
                                    className="w-full mt-1"
                                    onChange={handleFormChange}
                                />
                            </Box>
                            <Box>
                                <Label>Type</Label>
                                <Select
                                    name="YI_PHT_DD"
                                    className="w-full mt-1"
                                    onChange={handleFormChange}
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
                            <Label htmlFor="phoneNumberConfirm">
                                Retype Phone Number
                            </Label>
                            <Input
                                type="tel"
                                name="YI_PHC"
                                id="phoneNumberConfirm"
                                className="w-full mt-1"
                                onChange={handleFormChange}
                            />
                        </Box>
                        <Box className="mb-4">
                            <Label htmlFor="emailAddress">Email Address</Label>
                            <Input
                                type="email"
                                name="YI_EM"
                                id="emailAddress"
                                className="w-full mt-1"
                                onChange={handleFormChange}
                            />
                        </Box>
                        <Box className="mb-4">
                            <Label htmlFor="emailAddressConfirm">
                                Retype Email Address
                            </Label>
                            <Input
                                type="email"
                                name="YI_EMC"
                                id="emailAddressConfirm"
                                className="w-full mt-1"
                                onChange={handleFormChange}
                            />
                        </Box>
                    </FormSection>
                    <FormSection>
                        <SectionHeading>Delivery Information</SectionHeading>
                        <p>
                            Normal processing time is 5 business days from time
                            of receipt. Please contact us if you have any
                            questions.
                        </p>
                        <p>
                            <span className="font-bold">
                                PIH Health Hospital - Whittier:
                            </span>{' '}
                            (562) 698-0811 x13685
                        </p>
                        <p>
                            <span className="font-bold">
                                PIH Health Physicians:
                            </span>{' '}
                            (562) 698-0811 x13858
                        </p>
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
                    <Input type="submit" />
                </FormWrapper>
            </Container>
        </Layout>
    )
}

export default withStore(PIHPatientRequest)
