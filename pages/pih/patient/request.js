import { withStore } from '@/lib/store'
import { months, range } from '@/lib/helpers'
import {
    FormWrapper,
    FormSection,
    SectionHeading,
    CheckboxWrapper,
    PageHeading,
    Alert,
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

const PIHPatientRequest = ({ store }) => (
    <Layout>
        <Container>
            <PageHeading>New Medical Records Request</PageHeading>

            <FormWrapper>
                <FormSection>
                    <SectionHeading>Facility / Facilities</SectionHeading>
                    <fieldset>
                        <legend className="mb-2">
                            Please select the facility or facilities from which
                            you are requesting records:
                        </legend>
                        <CheckboxWrapper>
                            <Checkbox
                                label="PIH Health Hospital - Downey"
                                value="P7202-1"
                                name="FI_CB"
                                labelClassName="w-full"
                            />
                            <Checkbox
                                label="PIH Health Hospital - Whittier"
                                value="P7201-1"
                                name="FI_CB"
                                labelClassName="w-full mt-2"
                            />
                            <Checkbox
                                label="PIH Health Hospital - PIH Health Physicians"
                                value="P7203-1"
                                name="FI_CB"
                                labelClassName="w-full mt-2"
                            />
                        </CheckboxWrapper>
                    </fieldset>

                    {/* <Alert /> */}
                </FormSection>

                <FormSection>
                    <SectionHeading>Patient Information</SectionHeading>
                    <Flex className="flex-col sm:flex-row mb-4">
                        <Box className="w-full sm:mr-4">
                            <Label for="patientFirstName">
                                Patient First Name
                            </Label>
                            <Input
                                type="text"
                                name="PI_PFN"
                                id="patientFirstName"
                                className="w-full mt-1"
                            />
                        </Box>

                        <Box className="w-full">
                            <Label for="patientLastName">
                                Patient Last Name
                            </Label>
                            <Input
                                type="text"
                                name="PI_PLN"
                                id="patientLastName"
                                className="w-full mt-1"
                            />
                        </Box>
                    </Flex>
                    <Box className="mb-4">
                        <Label for="patientOtherNames">
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
                        <Flex className="mt-1">
                            <Select name="birthMonth" className="w-full mr-4">
                                <option defaultValue selected disabled>
                                    Month
                                </option>
                                {months.map(month => (
                                    <option value={month.number}>
                                        {month.name}
                                    </option>
                                ))}
                            </Select>
                            <Select name="birthDay" className="w-full mr-4">
                                <option defaultValue selected disabled>
                                    Day
                                </option>
                                {range(1, 31).map(day => (
                                    <option value={day}>{day}</option>
                                ))}
                            </Select>
                            <Input
                                name="birthYear"
                                type="number"
                                placeholder="Year"
                                className="w-full"
                            />
                        </Flex>
                    </Box>
                    <Box className="mb-4">
                        <Label>Physician/Clinic (Optional)</Label>
                        <Input type="text" className="w-full mt-1" />
                    </Box>
                    <Box className="mb-4">
                        <fieldset>
                            <legend className="mb-2">
                                Please select the visits/admissions you would
                                like released:
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
                                {/* TODO: Add date range selector */}
                                {/* TODO: Add create date range component (?) */}
                            </Box>
                        </fieldset>
                    </Box>
                </FormSection>
                <FormSection>
                    <fieldset>
                        <legend className="mb-2">
                            Please select the type of information you would like
                            released:
                        </legend>
                        <CheckboxWrapper>
                            <Checkbox
                                label="Medical Records"
                                labelClassName="w-full"
                                name="RI_CB"
                                value="MR"
                            ></Checkbox>
                            {/* TODO: Add Medical Records secondary info and extra authorization info */}
                            <Checkbox
                                label="Itemized Billing"
                                labelClassName="w-full"
                                name="RI_CB"
                            />

                            <Checkbox
                                label="Radiology Images"
                                labelClassName="w-full"
                                name="RI_CB"
                            >
                                The Radiology Department will follow up if any
                                charges or additional information is required.
                            </Checkbox>
                            <Checkbox
                                label="Pathology Slides"
                                labelClassName="w-full"
                                name="RI_CB"
                            >
                                The Pathology Department will follow up if any
                                charges or additional information is required.
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
                    />
                    <Label>Limitations (Optional):</Label>
                    <Box
                        as="textarea"
                        name="PR_LIM"
                        className="block w-full mt-1 sm:text-sm border-gray-300 rounded-md"
                    />
                </FormSection>
                <FormSection>
                    <SectionHeading>Your Information</SectionHeading>
                    <Box className="mb-4">
                        <Label for="preferredNotificationMethod">
                            Preferred Notification Method
                        </Label>
                        <Select
                            name="YI_NOTICE_DD"
                            id="preferredNotificationMethod"
                            className="w-full mt-1"
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
                            <Label for="phoneNumber">Phone Number</Label>
                            <Input
                                type="tel"
                                name="YI_PN"
                                id="phoneNumber"
                                className="w-full mt-1"
                            />
                        </Box>
                        <Box>
                            <Label>Type</Label>
                            <Select name="YI_PHT_DD" className="w-full mt-1">
                                <option defaultValue selected disabled>
                                    Select phone type
                                </option>
                                <option value="mobile">Mobile</option>
                                <option value="home">Home</option>
                                <option value="work">Work</option>
                            </Select>
                        </Box>
                    </Flex>

                    <Box className="mb-4">
                        <Label for="phoneNumberConfirm">
                            Retype Phone Number
                        </Label>
                        <Input
                            type="tel"
                            name="YI_PHC"
                            id="phoneNumberConfirm"
                            className="w-full mt-1"
                        />
                    </Box>
                    <Box className="mb-4">
                        <Label for="emailAddress">Email Address</Label>
                        <Input
                            type="email"
                            name="YI_EM"
                            id="emailAddress"
                            className="w-full mt-1"
                        />
                    </Box>
                    <Box className="mb-4">
                        <Label for="emailAddressConfirm">
                            Retype Email Address
                        </Label>
                        <Input
                            type="email"
                            name="YI_EMC"
                            id="emailAddressConfirm"
                            className="w-full mt-1"
                        />
                    </Box>
                </FormSection>
                <FormSection>
                    <SectionHeading>Delivery Information</SectionHeading>
                    <p>
                        Normal processing time is 5 business days from time of
                        receipt. Please contact us if you have any questions.
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
                        <Button variant="outline" className="flex-grow mx-4">
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

export default withStore(PIHPatientRequest)
