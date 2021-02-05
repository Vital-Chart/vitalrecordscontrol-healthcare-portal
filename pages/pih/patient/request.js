import { useState } from 'react'
import { withStore } from '@/lib/store'
import { Layout, Container } from '@/components/general'
import { Box, Checkbox, Select, Radio, Label, Input } from '@/components/core'
import {
    FormWrapper,
    FormSection,
    SectionHeading,
    PageHeading,
    CheckboxWrapper,
    Alert,
    DatePicker,
    DateRangeSelector,
} from '@/components/atoms'
import { Flex, Button } from '@/components/core'

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
                                                <Box className="pl-8 space-y-2 flex flex-col md:flex-row">
                                                    <CheckboxWrapper className="w-full">
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
                                                    </CheckboxWrapper>
                                                    <CheckboxWrapper className="w-full">
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
                                                    </CheckboxWrapper>
                                                    <CheckboxWrapper className="w-full">
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
                            <p className="mb-2">
                                Please enter your reason for requesting records.
                            </p>

                            <Label htmlFor="PR_PUR">Purpose:</Label>
                            <Box
                                as="textarea"
                                name="PR_PUR"
                                id="PR_PUR"
                                className="block w-full mt-1 mb-2 sm:text-sm border-gray-dark rounded-md"
                                placeholder="Examples: Patient Request, Continuity of Care, Billing/Payment, etc."
                            />
                            <Label htmlFor="PR_LIM">
                                Limitations (Optional):
                            </Label>
                            <Box
                                as="textarea"
                                name="PR_LIM"
                                id="PR_LIM"
                                className="block w-full mt-1 sm:text-sm border-gray-dark rounded-md"
                            />
                        </Box>
                    </FormSection>

                    <FormSection>
                        <SectionHeading>Your Information</SectionHeading>
                        <Box>
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

                    <FormSection>
                        <Box>
                            <p className="mb-2">
                                Your request has been saved and assigned
                                tracking number(s):{' '}
                                <span className="font-bold">81-196019</span>.
                            </p>
                            <p className="mb-2">
                                Please contact the following facility/facilities
                                if you have any questions during this process:
                            </p>
                            <p className="mb-2">
                                <span className="font-bold">81-196019</span>:
                                Palomar Health Medical Records - (760) 480-7911
                            </p>
                        </Box>
                        <Box>
                            <p className="mb-2">
                                All requests for medical records require
                                printing out, signing, and uploading an image of
                                this authorization form. Note that your driver's
                                license or other government issued
                                identification is required in the authorization
                                form where indicated. If you are requesting
                                medical records as the representative of,
                                patient, copies of documentation establishing
                                your authority to release medical records on the
                                patient's behalf are required and must be
                                provided through the secure upload below. Click
                                here for examples. If you have any questions
                                regarding the documentation needed for your
                                request, please contact us at the number above.
                            </p>
                            <p className="mb-2">To complete your request:</p>
                            <ol>
                                <li>
                                    Print out and sign this authorization form
                                    along with a copy of a government-issued
                                    picture ID,
                                </li>
                                <li>
                                    Scan or photograph all pages of the form
                                    along with your government ID,
                                </li>
                                <li>
                                    If requesting on behalf of a patient, scan
                                    or photograph all pages of the additional
                                    required documentation,
                                </li>
                                <li>
                                    Upload all photos/scans in the area below,
                                    and
                                </li>
                                <li>Click Continue below.</li>
                            </ol>

                            <p className="mb-2 font-bold">
                                Please note the following:
                            </p>

                            <ul>
                                <li>
                                    If you are unable to submit the required
                                    images/documentation at this time, you may
                                    return to this screen by entering your
                                    tracking number on the main menu and
                                    following the prompts to log in with a
                                    temporary password that will be sent to
                                    you." You must upload the required
                                    documentation within 72 hours or your
                                    request will be canceled.
                                </li>
                                <li>
                                    The files you upload must have PDF,
                                    JPG/JPEG, TIF/TIFF, or PNG as their
                                    extension.
                                </li>
                                <li>
                                    Uploaded files must be less than 10 MB in
                                    size. If your files are too large, consult
                                    your device's documentation for instructions
                                    on lowering the resolution and/or color
                                    depth and compressing the file.
                                </li>
                                <li>
                                    This site will automatically log you out if
                                    you are inactive or switch away from your
                                    browser to another app for 10 minutes.
                                </li>
                            </ul>
                        </Box>
                        {/* TODO: Add Document Uploader */}
                    </FormSection>
                </FormWrapper>
            </Container>
        </Layout>
    )
}

export default withStore(PIHPatientRequest)
