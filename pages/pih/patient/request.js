import { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { withStore } from '@/lib/store'
import { Layout, Container } from '@/components/general'
import {
    Box,
    Text,
    Checkbox,
    Select,
    Radio,
    Label,
    Input,
    Flex,
    Button,
    Link,
} from '@/components/core'
import {
    FormWrapper,
    FormSection,
    SectionHeading,
    PageHeading,
    CheckboxWrapper,
    Alert,
    ErrorMessage,
    FileInput,
    ButtonWrapper,
} from '@/components/atoms'
import IconSlash from '@/icons/icon-slash.svg'

const PIHPatientRequest = ({ store }) => {
    const {
        register,
        handleSubmit,
        watch,
        getValues,
        setValue,
        errors,
    } = useForm()
    const watchFacilityCheckboxes = watch('FI_CB', [])
    const watchRequestedInformation = watch('RI_CB', [])
    const watchVisitOptions = watch('VI_OPT', [])

    const [currentStep, setCurrentStep] = useState(1)

    const handleChange = e => {
        // console.log(e)
        const formValues = getValues()
        // console.log(formValues[e.target.name])

        store.dispatch({
            type: 'UPDATE_FORM',
            name: e.target.name,
            value: formValues[e.target.name],
        })
    }

    const onSubmit = data => {
        console.table(data)
        const formattedData = formatData(data)
        console.table(formattedData)
    }

    const formatData = data => {
        const formattedData = {}
        Object.keys(data).map(key => {
            const fieldValue = getValues(key)

            // Format date of birth to mm/dd/yyyy
            if (key === 'PI_DOB') {
                formattedData[key] = formatDate(fieldValue)
                console.log('DOB' + formattedData[key])
            }

            // Create comma separated strings from array values
            if (Array.isArray(fieldValue)) {
                formattedData[key] = fieldValue.join()
            } else {
                formattedData[key] = fieldValue
            }
        })
        return formattedData
    }

    const formatDate = date => {
        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
    }

    useEffect(() => {
        // console.log({ currentStep })
    })

    return (
        <Layout>
            <Box className="py-4 mb-4 bg-gray-lightest">
                <Container>
                    <Box as="nav" className="flex" aria-label="Breadcrumb">
                        <Box as="ol" className="flex items-center space-x-4">
                            <Box as="li">
                                <Box>
                                    <Link
                                        href="#"
                                        aria-current="page"
                                        className="text-sm text-center sm:text-left text-gray hover:text-gray-dark"
                                        onClick={e => {
                                            e.preventDefault()
                                            if (currentStep !== 1) {
                                                setCurrentStep(1)
                                            }
                                        }}
                                    >
                                        Request Information
                                    </Link>
                                </Box>
                            </Box>
                            <Box as="li">
                                <Flex className="items-center">
                                    <IconSlash className="flex-shrink-0 h-5 w-5 text-gray-light" />
                                    <Link
                                        href="#"
                                        className="ml-4 text-sm text-center sm:text-left text-gray hover:text-gray-dark"
                                        onClick={e => {
                                            e.preventDefault()
                                            if (currentStep !== 2) {
                                                setCurrentStep(2)
                                            }
                                        }}
                                    >
                                        Upload Authorization
                                    </Link>
                                </Flex>
                            </Box>
                            <Box as="li">
                                <Flex className="items-center">
                                    <IconSlash className="flex-shrink-0 h-5 w-5 text-gray-light" />
                                    <Link
                                        href="#"
                                        className="ml-4 text-sm text-center sm:text-left text-gray hover:text-gray-dark"
                                        onClick={e => {
                                            e.preventDefault()
                                            if (currentStep !== 3) {
                                                setCurrentStep(3)
                                            }
                                        }}
                                    >
                                        Review & Submit
                                    </Link>
                                </Flex>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Container>
                {currentStep === 1 && (
                    <Box>
                        <PageHeading>New Medical Records Request</PageHeading>
                        <FormWrapper
                            acceptCharset="UTF-8"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Input
                                type="hidden"
                                name="CLNT"
                                value="PIH"
                                ref={register}
                            />
                            <Input
                                type="hidden"
                                name="FTYPE"
                                value="PAT"
                                ref={register}
                            />
                            <Input
                                type="hidden"
                                name="SECSIG"
                                value="TBD"
                                ref={register}
                            />
                            <Input
                                type="hidden"
                                name="TRKNUM"
                                value={-1}
                                ref={register}
                            />

                            <FormSection>
                                <SectionHeading>
                                    Facility / Facilities
                                </SectionHeading>
                                <Box>
                                    <Box as="legend" className="mb-2">
                                        Please select the facility or facilities
                                        from which you are requesting records:
                                    </Box>
                                    <CheckboxWrapper>
                                        <Checkbox
                                            label="PIH Health Hospital - Downey"
                                            value="P7202-1"
                                            name="FI_CB"
                                            labelClassName="w-full mb-2"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please select at least one facility.',
                                            })}
                                        />
                                        <Checkbox
                                            label="PIH Health Hospital - Whittier"
                                            value="P7201-1"
                                            name="FI_CB"
                                            labelClassName="w-full mb-2"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please select at least one facility.',
                                            })}
                                        />
                                        <Checkbox
                                            label="PIH Health Hospital - PIH Health Physicians"
                                            value="P7203-1"
                                            name="FI_CB"
                                            labelClassName="w-full"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please select at least one facility.',
                                            })}
                                        />
                                        {errors.FI_CB && (
                                            <ErrorMessage
                                                message={errors.YI_PHC.message}
                                            />
                                        )}
                                    </CheckboxWrapper>
                                </Box>

                                {watchFacilityCheckboxes.length > 1 && (
                                    <Alert
                                        primaryAlertText="You have selected more than one facility."
                                        secondaryAlertText="You will receive SEPARATE tracking numbers for each facility. Each facility processes requests individually."
                                    />
                                )}

                                {watchFacilityCheckboxes.length > 0 && (
                                    <Alert
                                        primaryAlertText="Once you hit 'Continue' below, you cannot change which
                    facilities you are requesting from."
                                        secondaryAlertText="Please double-check to make sure you select the correct
                    facility or facilities."
                                    />
                                )}
                            </FormSection>

                            <FormSection>
                                <SectionHeading>
                                    Patient Information
                                </SectionHeading>
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
                                                ref={register({
                                                    required:
                                                        "Please enter the patient's name.",
                                                })}
                                            />
                                            {errors.PI_PFN && (
                                                <ErrorMessage
                                                    message={
                                                        errors.PI_PFN.message
                                                    }
                                                />
                                            )}
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
                                                ref={register({
                                                    required:
                                                        "Please enter the patient's name.",
                                                })}
                                            />
                                            {errors.PI_PLN && (
                                                <ErrorMessage
                                                    message={
                                                        errors.PI_PLN.message
                                                    }
                                                />
                                            )}
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
                                            ref={register}
                                        />
                                    </Box>
                                    <Box className="mb-4">
                                        <Label htmlFor="PI_DOB">
                                            Patient Date of Birth
                                        </Label>
                                        <Input
                                            type="date"
                                            name="PI_DOB"
                                            id="PI_DOB"
                                            autoComplete="bday"
                                            className="block mt-1"
                                            ref={register({
                                                required:
                                                    "Please enter the patient's date of birth.",
                                            })}
                                        />
                                        {errors.PI_DOB && (
                                            <ErrorMessage
                                                message={errors.PI_DOB.message}
                                            />
                                        )}
                                        {/* <Flex className="mt-1">
                                    <Select name="birthMonth" className="mr-2">
                                        <option
                                            key="month"
                                            defaultValue
                                            disabled
                                        >
                                            Month
                                        </option>
                                        {months.map(month => (
                                            <option
                                                key={`mth-${month.number}`}
                                                value={month.number}
                                            >
                                                {month.name}
                                            </option>
                                        ))}
                                    </Select>
                                    <Select name="birthDay" className="mr-2">
                                        <option defaultValue disabled>
                                            Day
                                        </option>
                                        {range(1, 31).map(day => (
                                            <option
                                                key={`day-${day}`}
                                                value={day}
                                            >
                                                {day}
                                            </option>
                                        ))}
                                    </Select>
                                    <Input
                                        name="birthYear"
                                        type="number"
                                        placeholder="Year"
                                        className=""
                                    />
                                </Flex> */}
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
                                            ref={register}
                                        />
                                    </Box>
                                    <Box>
                                        <Box as="fieldset">
                                            <Box as="legend" className="mb-2">
                                                Please select the
                                                visits/admissions you would like
                                                released:
                                            </Box>
                                            <Box className="ml-4">
                                                <Radio
                                                    label="Most recent"
                                                    labelClassName="w-full"
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
                                                    labelClassName="w-full"
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
                                                    labelClassName="w-full"
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
                                                        message={
                                                            errors.VI_OPT
                                                                .message
                                                        }
                                                    />
                                                )}

                                                {watchVisitOptions &&
                                                    watchVisitOptions.includes(
                                                        'DR'
                                                    ) && (
                                                        <Flex>
                                                            <Box>
                                                                <Label className="block mb-1">
                                                                    Service
                                                                    Start:
                                                                </Label>
                                                                <Input
                                                                    type="date"
                                                                    name="PI_DOB"
                                                                    id="PI_DOB"
                                                                    autoComplete="bday"
                                                                    className="mr-4"
                                                                    ref={register(
                                                                        {
                                                                            required: true,
                                                                        }
                                                                    )}
                                                                />
                                                            </Box>
                                                            <Box>
                                                                <Label className="block mb-1">
                                                                    Service End:
                                                                </Label>
                                                                <Input
                                                                    type="date"
                                                                    name="PI_DOB"
                                                                    id="PI_DOB"
                                                                    autoComplete="bday"
                                                                    ref={register(
                                                                        {
                                                                            required: true,
                                                                        }
                                                                    )}
                                                                />
                                                            </Box>
                                                        </Flex>
                                                    )}
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </FormSection>

                            <FormSection>
                                <Box>
                                    <Box as="fieldset">
                                        <Box as="legend" className="mb-2">
                                            Please select the type of
                                            information you would like released:
                                        </Box>
                                        <CheckboxWrapper>
                                            <Checkbox
                                                label="Medical Records"
                                                labelClassName="w-full"
                                                name="RI_CB"
                                                value="MR"
                                                ref={register({
                                                    required: true,
                                                })}
                                            />

                                            {watchRequestedInformation.includes(
                                                'MR'
                                            ) && (
                                                <Box className="ml-4">
                                                    <Radio
                                                        label="Pertinent Information (Discharge Summary, History and Physical, Consultation, ER Reports, Labs, Radiology Reports, EKGs, Pathology Reports)"
                                                        labelClassName="w-full"
                                                        name="RI_MR_OPT"
                                                        value="PI"
                                                        ref={register({
                                                            required: true,
                                                        })}
                                                    />
                                                    <Radio
                                                        label="All health information pertaining to my medical history, mental or physical condition and treatment received, including records received from other healthcare providers. A reasonable clerical and reproduction processing fee is applicable."
                                                        labelClassName="w-full"
                                                        name="RI_MR_OPT"
                                                        value="AHI"
                                                        ref={register({
                                                            required: true,
                                                        })}
                                                    />
                                                    <Radio
                                                        label="Only the following records or types of health information included in the following dates of service:"
                                                        labelClassName="w-full"
                                                        name="RI_MR_OPT"
                                                        value="FR"
                                                        ref={register({
                                                            required: true,
                                                        })}
                                                    />
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
                                            )}

                                            <Checkbox
                                                label="Itemized Billing"
                                                labelClassName="w-full"
                                                name="RI_CB"
                                                value="IB"
                                                ref={register({
                                                    required: true,
                                                })}
                                            />

                                            <Checkbox
                                                label="Radiology Images"
                                                labelClassName="w-full"
                                                name="RI_CB"
                                                value="RI"
                                                ref={register({
                                                    required: true,
                                                })}
                                            >
                                                The Radiology Department will
                                                follow up if any charges or
                                                additional information is
                                                required.
                                            </Checkbox>
                                            <Checkbox
                                                label="Pathology Slides"
                                                labelClassName="w-full"
                                                name="RI_CB"
                                                value="PS"
                                                ref={register({
                                                    required: true,
                                                })}
                                            >
                                                The Pathology Department will
                                                follow up if any charges or
                                                additional information is
                                                required.
                                            </Checkbox>
                                        </CheckboxWrapper>

                                        {/* TODO: Change following alerts to 'info' boxes */}

                                        {watchRequestedInformation.includes(
                                            'MR'
                                        ) && (
                                            <Alert primaryAlertText="Medical Records and Itemized Billing will be delivered electronically through this website." />
                                        )}
                                        {watchRequestedInformation.includes(
                                            'IB'
                                        ) && (
                                            <Alert primaryAlertText="Medical Records and Itemized Billing will be delivered electronically through this website." />
                                        )}

                                        {watchRequestedInformation.includes(
                                            'RI'
                                        ) && (
                                            <Alert primaryAlertText="Radiology CDs and Pathology slides will be sent via US Mail or can be picked up at the facility. You will choose below how you would like them delivered." />
                                        )}

                                        {watchRequestedInformation.includes(
                                            'PS'
                                        ) && (
                                            <Alert primaryAlertText="Radiology CDs and Pathology slides will be sent via US Mail or can be picked up at the facility. You will choose below how you would like them delivered." />
                                        )}

                                        <Box className="mt-4">
                                            <p className="text-sm font-bold mb-2">
                                                The following information will
                                                not be released unless
                                                specifically authorized by
                                                checking the relevant box(es)
                                                below:
                                            </p>
                                            <CheckboxWrapper>
                                                <Checkbox
                                                    name="RI_MR_AI_CB"
                                                    label="Information pertaining to mental health diagnosis or treatment"
                                                    value="IPM"
                                                    ref={register}
                                                />
                                                <Checkbox
                                                    name="RI_MR_AI_CB"
                                                    label="Information pertaining to drug and alcohol abuse, diagnosis, or treatment"
                                                    value="IPD"
                                                    ref={register}
                                                />
                                                <Checkbox
                                                    name="RI_MR_AI_CB"
                                                    label="HIV/AIDS test results"
                                                    value="HIV"
                                                    ref={register}
                                                />
                                                <Checkbox
                                                    name="RI_MR_AI_CB"
                                                    label="Genetic testing information"
                                                    value="GTI"
                                                    ref={register}
                                                />
                                                <Checkbox
                                                    name="RI_MR_AI_CB"
                                                    label="Worker's Comp information"
                                                    value="WCI"
                                                    ref={register}
                                                />
                                            </CheckboxWrapper>
                                        </Box>
                                    </Box>
                                </Box>
                            </FormSection>

                            <FormSection>
                                <SectionHeading>
                                    Purpose of Request
                                </SectionHeading>
                                <Box>
                                    <Box>
                                        <p className="mb-2">
                                            Please enter your reason for
                                            requesting records.
                                        </p>

                                        <Label htmlFor="PR_PUR">Purpose:</Label>
                                        <Box
                                            as="textarea"
                                            name="PR_PUR"
                                            id="PR_PUR"
                                            className="block w-full mt-1 mb-2 sm:text-sm border-gray-dark rounded"
                                            placeholder="Examples: Patient Request, Continuity of Care, Billing/Payment, etc."
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please enter the purpose of this request.',
                                            })}
                                        />
                                        {errors.PR_PUR && (
                                            <ErrorMessage
                                                message={errors.PR_PUR.message}
                                            />
                                        )}
                                    </Box>
                                    <Box>
                                        <Label htmlFor="PR_LIM">
                                            Limitations (Optional):
                                        </Label>
                                        <Box
                                            as="textarea"
                                            name="PR_LIM"
                                            id="PR_LIM"
                                            className="block w-full mt-1 sm:text-sm border-gray-dark rounded"
                                            ref={register}
                                        />
                                    </Box>
                                </Box>
                            </FormSection>

                            <FormSection>
                                <SectionHeading>
                                    Your Information
                                </SectionHeading>
                                <Box>
                                    <Box className="mb-4">
                                        <Label htmlFor="YI_NOTICE_DD">
                                            Preferred Notification Method
                                        </Label>
                                        <Select
                                            name="YI_NOTICE_DD"
                                            id="YI_NOTICE_DD"
                                            className="w-full mt-1"
                                            onChange={handleChange}
                                            ref={register({ required: true })}
                                        >
                                            <option value="text">
                                                Text Message (Standard messaging
                                                rates may apply.)
                                            </option>
                                            <option value="email">Email</option>
                                        </Select>
                                    </Box>
                                    <Flex className="flex-col sm:flex-row sm:mb-4">
                                        <Box className="mr-4 mb-4 sm:mb-0">
                                            <Label htmlFor="YI_PN">
                                                Phone Number
                                            </Label>
                                            <Input
                                                type="tel"
                                                name="YI_PN"
                                                id="YI_PN"
                                                autoComplete="tel"
                                                className="w-full mt-1"
                                                ref={register({
                                                    required:
                                                        'Please enter your phone number.',
                                                })}
                                            />
                                            {errors.YI_PHC && (
                                                <ErrorMessage
                                                    message={
                                                        errors.YI_PN.message
                                                    }
                                                />
                                            )}
                                        </Box>
                                        <Box>
                                            <Label htmlFor="YI_PHT_DD">
                                                Type
                                            </Label>
                                            <Select
                                                name="YI_PHT_DD"
                                                className="w-full mt-1"
                                                ref={register({
                                                    required: true,
                                                })}
                                            >
                                                <option defaultValue disabled>
                                                    Select phone type
                                                </option>
                                                <option
                                                    key="mobile"
                                                    value="mobile"
                                                >
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
                                            autoComplete="tel"
                                            className="w-full mt-1"
                                            ref={register({
                                                required:
                                                    'Please confirm your phone number.',
                                                validate: {
                                                    phoneMatch: value =>
                                                        value ===
                                                            getValues().YI_PN ||
                                                        'The phone numbers you entered do not match!',
                                                },
                                            })}
                                        />
                                        {errors.YI_PHC && (
                                            <ErrorMessage
                                                message={errors.YI_PHC.message}
                                            />
                                        )}
                                    </Box>
                                    <Box className="mb-4">
                                        <Label htmlFor="YI_EM">
                                            Email Address
                                        </Label>
                                        <Input
                                            type="email"
                                            name="YI_EM"
                                            id="YI_EM"
                                            autoComplete="email"
                                            className="w-full mt-1"
                                            ref={register({
                                                required:
                                                    'Please enter your email address.',
                                            })}
                                        />
                                        {errors.YI_EM && (
                                            <ErrorMessage
                                                message={errors.YI_EM.message}
                                            />
                                        )}
                                    </Box>
                                    <Box className="mb-4">
                                        <Label htmlFor="YI_EMC">
                                            Retype Email Address
                                        </Label>
                                        <Input
                                            type="email"
                                            name="YI_EMC"
                                            id="YI_EMC"
                                            autoComplete="email"
                                            className="w-full mt-1"
                                            ref={register({
                                                required:
                                                    'Please confirm your email address.',
                                                validate: {
                                                    emailMatch: value =>
                                                        value ===
                                                            getValues().YI_EM ||
                                                        'The email addresses you entered do not match.',
                                                },
                                            })}
                                        />
                                        {errors.YI_EMC && (
                                            <ErrorMessage
                                                message={errors.YI_EMC.message}
                                            />
                                        )}
                                    </Box>
                                </Box>
                            </FormSection>

                            <FormSection>
                                <SectionHeading>
                                    Delivery Information
                                </SectionHeading>
                                <Box>
                                    <p className="mb-4">
                                        Normal processing time is 5 business
                                        days from time of receipt. Please
                                        contact us if you have any questions.
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

                            <ButtonWrapper>
                                <Button
                                    variant="outline"
                                    className="flex-grow mx-4"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="filled"
                                    className="flex-grow mx-4"
                                >
                                    Continue
                                </Button>
                            </ButtonWrapper>

                            <Input type="submit" />
                        </FormWrapper>
                    </Box>
                )}

                {currentStep === 2 && (
                    <Box>
                        <Box className="py-8 mb-8 border-b border-gray-light">
                            <Text as="p" className="pb-4">
                                Your request has been saved and assigned
                                tracking number(s):{' '}
                                <span className="font-bold">81-196019</span>.
                            </Text>
                            <Text as="p" className="pb-4">
                                Please contact the following facility/facilities
                                if you have any questions during this process:
                            </Text>
                            <Text as="p" className="pb-4">
                                <span className="font-bold">81-196019</span>:
                                Palomar Health Medical Records - (760) 480-7911
                            </Text>
                        </Box>
                        <Box>
                            <Text as="p" className="pb-4">
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
                            </Text>
                            <Text as="p" className="pb-4">
                                To complete your request:
                            </Text>
                            <Box as="ul" className="pl-8 pb-4 list-decimal">
                                <Box as="li" className="pb-2">
                                    Print out and sign this authorization form
                                    along with a copy of a government-issued
                                    picture ID,
                                </Box>
                                <Box as="li" className="pb-2">
                                    Scan or photograph all pages of the form
                                    along with your government ID,
                                </Box>
                                <Box as="li" className="pb-2">
                                    If requesting on behalf of a patient, scan
                                    or photograph all pages of the additional
                                    required documentation,
                                </Box>
                                <Box as="li" className="pb-2">
                                    Upload all photos/scans in the area below,
                                    and
                                </Box>
                                <Box as="li" className="pb-2">
                                    Click Continue below.
                                </Box>
                            </Box>

                            <Text as="p" className="pb-4 font-bold">
                                Please note the following:
                            </Text>

                            <Box as="ul" className="pl-8 pb-4 list-disc">
                                <Box as="li" className="pb-2">
                                    If you are unable to submit the required
                                    images/documentation at this time, you may
                                    return to this screen by entering your
                                    tracking number on the main menu and
                                    following the prompts to log in with a
                                    temporary password that will be sent to
                                    you." You must upload the required
                                    documentation within 72 hours or your
                                    request will be canceled.
                                </Box>
                                <Box as="li" className="pb-2">
                                    The files you upload must have PDF,
                                    JPG/JPEG, TIF/TIFF, or PNG as their
                                    extension.
                                </Box>
                                <Box as="li" className="pb-2">
                                    Uploaded files must be less than 10 MB in
                                    size. If your files are too large, consult
                                    your device's documentation for instructions
                                    on lowering the resolution and/or color
                                    depth and compressing the file.
                                </Box>
                                <Box as="li" className="pb-2">
                                    This site will automatically log you out if
                                    you are inactive or switch away from your
                                    browser to another app for 10 minutes.
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <FormProvider>
                                <FormWrapper>
                                    <FileInput />
                                </FormWrapper>
                            </FormProvider>
                        </Box>
                        {/* TODO: Add Document Uploader */}
                    </Box>
                )}
                {currentStep === 3 && (
                    <Box>
                        <Text as="p" className="pb-4">
                            Step 3
                        </Text>
                    </Box>
                )}
            </Container>
        </Layout>
    )
}

export default withStore(PIHPatientRequest)
